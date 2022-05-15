import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import { useMoralis, useMoralisFile } from "react-moralis";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import TicketDesign from "components/TicketDesign";
import { enableContract, ethers } from "utils/web3-utils";
import { eventFactory } from "data/contracts";
import { safeFloat } from "utils/numbers";
import { nanoid } from "nanoid";
import { jsxToPng } from "jsx-to-png";
import Swal from "sweetalert2";
import ProgressTracker from "./ProgressTracker";

export default function MintTickets({ event, setBodyScroll }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, isAuthenticated, web3 } = useMoralis();
  const [mintingState, setMintingState] = useState(-1);
  const processes = ["Generating Tickets and Metadata", "Minting Tickets"];
  const { saveFile } = useMoralisFile();
  const eventStartDate = moment(event.starts_on);
  const localDateGenerated =
    eventStartDate.local().format("hA") +
    " " +
    String(eventStartDate.local()._d).split(" ")[5];
  const [purchases, setPurchases] = useState(
    event.tickets.map((ticket, index) => ({
      quantity: 1,
      cost: ticket.price,
      ticketId: index,
    }))
  );

  const preparePuchases = async () => {
    const purchasePromises = [];
    const preparedPurchases = [];
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
                  buyer: user.get("ethAddress"),
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
      description: event.description,
      image: image,
      traits: [
        { trait_type: "Checked In", value: "true" },
        { trait_type: "Purchased", value: "true" },
      ],
      ticketId: purchase.ticketId,
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
      const qrCodeSVG = await jsxToPng(<QRCode value={validateUrl}></QRCode>, {
        height: 225,
        width: 225,
      });
      const ticketSvgData = await jsxToPng(
        <TicketDesign
          eventHost={event.host_name}
          eventName={event.name}
          qrCode={`${qrCodeSVG}`}
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

  const totalAmount = purchases
    .map((purchase) => safeFloat(purchase.quantity) * safeFloat(purchase.cost))
    .reduce((a, b) => a + b, 0);
  useEffect(() => {
    if (modalOpen) {
      setBodyScroll(false);
      return;
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

      const EventFactory = await enableContract(
        eventFactory.contractAddress,
        eventFactory.abi,
        web3
      );
      setMintingState(0);
      const preparedPurchases = await preparePuchases();
      setMintingState(1);
      const matic = ethers.utils.parseEther(totalAmount.toString());
      console.log(event.contractAddress);
      const tx = await EventFactory.connect(web3.getSigner()).mintTickets(
        event.contractAddress,
        preparedPurchases,
        { value: matic }
      );
      const receipt = await tx.wait();
      if (receipt && receipt.blockNumber) {
        Swal.fire({
          title: "Yay 🎉",
          text: `Tickets minted successfully`,
          icon: "success",
        });
        setMintingState(-1);
      }
    } catch (err) {
      setMintingState(-1);
      Swal.fire({
        title: "Error!",
        text: `${err.data?.message || err.message}`,
        icon: "error",
      });
    }
  };
  return (
    <section>
      <div
        className={`mint-modal ${
          modalOpen
            ? "overflow-auto h-full"
            : "max-h-0 h-0 overflow-hidden hidden"
        }`}
      >
        <div className="mint-modal-content relative">
          {mintingState >= 0 ? (
            <ProgressTracker
              state={mintingState}
              processes={processes}
              title={`Proccesing tickets`}
            />
          ) : (
            ""
          )}

          <div className="mint-modal-header">
            <h3 className="mint-modal-title">Get Your Tickets</h3>
            <button onClick={() => setModalOpen(false)}>
              <FontAwesomeIcon
                className="text-3xl text-brand-red md:text-5xl"
                icon={solid("times")}
              />
            </button>
          </div>
          <div className="mint-modal-body">
            <div>
              <h3 className="mint-modal-title">Payment</h3>
              <h3 className="mint-modal-subtitle">
                Tickets will be minted to your wallet after payment.
              </h3>
              <div className="event-card">
                <img
                  src={event.cover_image_url}
                  className="event-card-image"
                  alt={event.name}
                />
                <div className="event-card-content">
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
                <button onClick={() => purchaseTickets()} className="px-3 btn text-sm md:text-base">
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
      <button onClick={() => setModalOpen(true)} className="btn">
        Get a Ticket
      </button>
    </section>
  );
}
