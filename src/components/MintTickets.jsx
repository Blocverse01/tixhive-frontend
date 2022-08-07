import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import { useMoralis, useMoralisFile } from "react-moralis";
import { useState, useEffect } from "react";
import TicketDesign from "components/TicketDesign";
import { ethers } from "utils/web3-utils";
import { safeFloat } from "utils/numbers";
import { nanoid } from "nanoid";
import { jsxToPng } from "jsx-to-png";
import Swal from "sweetalert2";
import ProgressTracker from "./ProgressTracker";
import { useRunEventFactoryFunction } from "hooks/useRunEventFactoryFunction";
import QRCode from "react-qr-code";
import PayWithFiat from "./PayWithFiat";
import mintFreeTickets from "utils/mint-free-tickets";
import axios from "axios";

export default function MintTickets({ event, setBodyScroll }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showPayWithFiat, setShowPayWithFiat] = useState(false);

  const { user, isAuthenticated } = useMoralis();
  const [mintingState, setMintingState] = useState(-1);
  const processes = [
    "Generating Tickets and Metadata",
    "Preparing to Mint",
    "Minting Tickets",
  ];
  const { saveFile } = useMoralisFile();
  const { run } = useRunEventFactoryFunction();
  const eventStartDate = moment(event.starts_on);
  const localDateGenerated =
    eventStartDate.local().format("hA") +
    " " +
    String(eventStartDate.local()._d).split(" ")[5];
  const [purchases, setPurchases] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [country, setCountry] = useState("");

  const getGeoInfo = () => {
    axios
      .get(`${process.env.REACT_APP_GEO_LOCATION_CHECK}`)
      .then((response) => {
        let data = response.data;
        console.log(data.country_name);
        setCountry(data.country_name)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const preparePurchases = async () => {
    const purchasePromises = [];
    const preparedPurchases = [];
    const userAddress = user.get("ethAddress");
    purchases
      .filter((purchase) => purchase.quantity > 0)
      .forEach((purchase) => {
        for (let i = 1; i <= purchase.quantity; i++) {
          purchasePromises.push(
            new Promise(async (res, rej) => {
              try {
                let purchaseId = nanoid();
                let ticket = event.tickets.find(
                  (ticket, index) => index === purchase.ticketId
                );
                const metadata = await generateTicket(
                  purchaseId,
                  ticket,
                  purchase
                );
                preparedPurchases.push({
                  purchaseId: purchaseId,
                  ticketId: purchase.ticketId,
                  tokenURI: metadata,
                  buyer: userAddress,
                  cost: ethers.utils.parseEther(ticket.price.toString()),
                });
                res(metadata);
              } catch (err) {
                rej(err);
              }
            })
          );
        }
      });
    await Promise.all(purchasePromises);
    return preparedPurchases;
  };

  const generateTicketMetadata = async (
    purchaseId,
    purchase,
    ticket,
    image
  ) => {
    const metadata = {
      name: `${event.name} - ${ticket.name}`,
      description: `${ticket.name} pass for ${event.name}`,
      image: image,
      traits: [
        { trait_type: "Purchased", value: "true" },
        { trait_type: "Ticket Type", value: ticket.name },
      ],
      purchase_id: purchaseId,
      external_url: `${window.location.origin}/events/${event.contractAddress}`,
      ticketId: purchase.ticketId,
      seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
      fee_recipient: event.owner,
    };
    const base64 = btoa(JSON.stringify(metadata));
    const storedMetadata = await saveFile(
      `${purchaseId.replace(/[^a-zA-Z0-9]/g, "_")}.json`,
      { base64 },
      { type: "base64", saveIPFS: true, throwOnError: true }
    );
    return storedMetadata._ipfs;
  };

  const generateTicket = async (purchaseId, ticket, purchase) => {
    try {
      const validateUrl = `${window.location.origin}/${event.contractAddress}/tickets/${purchaseId}`;
      const ticketSvgData = await jsxToPng(
        <TicketDesign
          eventHost={event.host_name}
          eventName={event.name}
          qrCode={<QRCode value={validateUrl} size={91} fgColor="#FE5252" />}
          eventCategory={event.category.toUpperCase()}
          eventTime={localDateGenerated}
          ticketInfo={{
            text: `${ticket.price} ${event.currency}`,
            title: "TICKET FEE",
          }}
          eventDate={eventStartDate.format("DD-MM-YYYY")}
        />,
        {
          height: 359,
          width: 835,
        }
      );
      const ticketImage = await saveFile(
        `${purchaseId.replace(/[^a-zA-Z0-9]/g, "_")}.png`,
        { base64: ticketSvgData },
        {
          saveIPFS: true,
          throwOnError: true,
        }
      );
      return await generateTicketMetadata(
        purchaseId,
        purchase,
        ticket,
        ticketImage._ipfs
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTotalAmount(
      purchases
        .map(
          (purchase) => safeFloat(purchase.quantity) * safeFloat(purchase.cost)
        )
        .reduce((a, b) => a + b, 0)
    );
  }, [purchases]);
  useEffect(() => {
    if (modalOpen) {
      setBodyScroll(false);
      setPurchases(
        event.tickets.map((ticket, index) => ({
          quantity: 1,
          cost: ticket.price,
          ticketId: index,
        }))
      );
    }
    setBodyScroll(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const purchaseTickets = async () => {
    try {
      if (!isAuthenticated) {
        Swal.fire({
          title: "Hello fren 🙂",
          text: "Please connect your wallet to continue",
          icon: "info",
        });
        return;
      }
      setMintingState(0);
      const preparedPurchases = await preparePurchases();
      setMintingState(1);
      const matic = ethers.utils.parseEther(totalAmount.toString());
      const shouldFreeMint = matic.isZero();
      let success;
      if (shouldFreeMint) {
        setMintingState(2);
        const response = await mintFreeTickets(
          preparedPurchases,
          event.contractAddress
        );
        if (response.status) {
          success = true;
        }
      } else {
        const tx = await run({
          functionName: "mintTickets",
          params: { purchases: preparedPurchases, e: event.contractAddress },
          msgValue: matic,
        });
        setMintingState(2);
        const receipt = await tx.wait();
        success = receipt && receipt.blockNumber;
      }

      if (success) {
        Swal.fire({
          title: "Yay 🎉",
          text: `Tickets minted successfully`,
          icon: "success",
        });
        setMintingState(-1);
      }
    } catch (err) {
      console.error(err);
      setMintingState(-1);
      Swal.fire({
        title: "Error!",
        text: `${err.data?.message || err.message}`,
        icon: "error",
      });
    }
  };
  return (
    <div>
      <section>
      {modalOpen && purchases.length > 0 && (
        <div
          className={`mint-modal  ${
            modalOpen
              ? "overflow-hidden h-fit"
              : "max-h-0 h-0 overflow-hidden hidden"
          }`}
        >
          <div className="relative modal-border mint-modal-content">
            {mintingState >= 0 ? (
              <ProgressTracker
                state={mintingState}
                processes={processes}
                title={`Processing tickets`}
              />
            ) : (
              ""
            )}
            <div className="mint-modal-header">
              <h3 className="mint-modal-title">Get Your Tickets</h3>

              <button
                onClick={() => setModalOpen(false)}
                className="bg-[#22262F] h-[42px] w-[42px] flex items-center justify-center rounded-full text-white duration-200 lg:hover:text-gray-300  text-xl"
                type="button"
              >
                <FontAwesomeIcon icon={solid("xmark")} />
              </button>
            </div>
            <div className="mint-modal-body">
              <div>
                <h3 className="mint-modal-subtitle">Event Summary</h3>
                <div className="mt-2">
                  <h3 className="event-card-title">{event.name}</h3>
                  <h3 className="event-card-subtitle">by {event.host_name}</h3>
                  <section className="mt-[8px] flex items-center">
                    <div className="mr-[10px] md:mr-[31.06px]">
                      <h3 className="event-card-month">
                        {eventStartDate?.format("MMM")}
                      </h3>
                      <h3 className="event-card-day">
                        {eventStartDate?.format("DD")}
                      </h3>
                    </div>
                    <div>
                      <h3 className="event-card-start-date">
                        {eventStartDate.format("dddd")}
                      </h3>
                      <h3 className="event-card-start-time">
                        {eventStartDate.format("HH:mm a")}
                      </h3>
                    </div>
                  </section>
                </div>

                <div className=" mt-4 lg:mt-10">
                  <h3 className="mint-modal-subtitle">Payment Methods</h3>

                  <div className="w-[246px] ">
                    <button
                      onClick={() => {
                        setShowPayWithFiat(true);
                        setModalOpen(false);
                        getGeoInfo();
                      }}
                      type="button"
                      className=" mint-modal-subtitle text-white outline-none pay-btn"
                    >
                      Pay with Fiat
                    </button>
                    <button
                      type="button"
                      className=" mint-modal-subtitle text-gray-300 pay-btn-clicked"
                    >
                      Pay with Crypto
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="form-card">
                  {event.tickets.map((ticket, index) => (
                    <div key={index} className="field">
                      <div>
                        <h3 className="field-header">{ticket.name}</h3>
                        <h3 className="field-header">{ticket.price} MATIC</h3>
                      </div>
                      <div>
                        <input
                          onChange={(e) => {
                            setPurchases(
                              purchases.map((q, i) =>
                                i === index
                                  ? { ...q, quantity: e.target.value }
                                  : q
                              )
                            );
                          }}
                          name={index}
                          className="field-input"
                          type="number"
                          min="0"
                          value={purchases[index].quantity}
                          max={ticket.quantity_available}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 text-white field">
                    <h3 className="">Total Amount</h3>
                    <h3 className="">{totalAmount} MATIC</h3>
                  </div>
                </div>
                <div className="lg:mt-[55px] mt-[15px] flex justify-end">
                  <button
                    onClick={() => purchaseTickets()}
                    className="px-3 text-sm btn md:text-base"
                  >
                    Pay {totalAmount} MATIC{" "}
                    <FontAwesomeIcon
                      className="ml-2"
                      icon={solid("chevron-right")}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setModalOpen(true)} className="btn darker-red">
        Get a Ticket
      </button>

      <PayWithFiat
       
        onClose={() => setShowPayWithFiat(false)} 
        show={showPayWithFiat} 
        country={country}
        totalAmount={totalAmount}
      />
      </section>
    </div>
  );
}
