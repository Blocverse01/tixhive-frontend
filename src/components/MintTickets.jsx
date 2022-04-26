import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import { useMoralis, useMoralisFile } from "react-moralis";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import TicketDesign from "components/TicketDesign";
import EVENT from "contract-abis/Event.json";
import { enableContract, ethers } from "utils/web3-utils";
import { eventFactory } from "data/contracts";

export default function MintTickets({ event, setBodyScroll }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, isAuthenticated, web3 } = useMoralis();
  const { saveFile } = useMoralisFile();
  const eventStartDate = moment(event.starts_on);
  const [purchases, setPurchases] = useState(
    event.tickets.map((ticket, index) => ({
      quantity: 1,
      cost: ticket.price,
      ticketId: index,
    }))
  );

  const generateTicketImage = async (purchaseId, ticket) => {
    const QRCodeElement = (
      <QRCode
        value={`${window.location.origin}/${event.contractAddress}/tickets/${purchaseId}`}
      />
    );
    const svgData = new XMLSerializer().serializeToString(QRCodeElement);
    const localDateGenerated =
      eventStartDate.local().format("hA") +
      " " +
      String(eventStartDate.local()._d).split(" ")[5];
    const Ticket = (
      <TicketDesign
        eventHost={event.host}
        eventName={event.name}
        qrCode={`data:image/svg+xml;base64,${btoa(svgData)}`}
        eventCategory={event.category.toUpperCase()}
        price={ticket.price}
        eventTime={localDateGenerated}
        ticketName={ticket.name}
        eventDate={eventStartDate.format("DD-MM-YYYY")}
      />
    );
    const ticketSvgData = new XMLSerializer().serializeToString(Ticket);
    const base64 = `data:image/svg+xml;base64,${btoa(ticketSvgData)}`;
    const ticketImage = await saveFile(
      `${purchaseId}.png`,
      { base64 },
      {
        type: "base64",
        saveIPFS: true,
        throwOnError: true,
      }
    );
    return ticketImage;
  };

  const totalAmount = purchases
    .map((purchase) =>
      isNaN(parseInt(purchase.quantity))
        ? 0
        : parseInt(purchase.quantity) * purchase.cost
    )
    .reduce((a, b) => a + b, 0);
  useEffect(() => {
    if (modalOpen) {
      setBodyScroll(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const purchaseTickets = async () => {
    if (!isAuthenticated) {
      return;
    }
    const eventContract = await enableContract(
      event.contractAddress,
      EVENT,
      web3
    );
    const tokenCount = (
      await eventContract.balanceOf(user.get("ethAddress"))
    ).toNumber();
    const preparedPurchases = [];
    purchases
      .filter((purchase) => purchase.quantity > 0)
      .forEach(async (purchase) => {
        for (var i = 1; i <= purchase.quantity; i++) {
          let ticket = event.tickets.find(
            (ticket, index) => index === purchase.ticketId
          );
          let purchaseId = `${event.contractAddress}${Math.round(
            Math.random() * 1000
          )}${user.getSessionToken()}${tokenCount}${user.get("ethAddress")}`;
          const metadata = {
            name: `${event.name} - ${ticket.name}`,
            image: (await generateTicketImage(purchaseId, ticket))._ipfs,
            traits: [
              { trait_type: "Checked In", value: "true" },
              { trait_type: "Purchased", value: "true" },
            ],
            ticketId: purchase.ticketId,
          };
          const base64 = btoa(JSON.stringify(metadata));
          preparedPurchases.push({
            purchaseId: purchaseId,
            ticketId: purchase.ticketId,
            tokenURI: (
              await saveFile(
                `${purchaseId}.json`,
                { base64 },
                {
                  type: "base64",
                  saveIPFS: true,
                  throwOnError: true,
                }
              )
            )._ipfs,
            buyer: user.get("ethAddress"),
            cost: purchase.cost,
          });
        }
      });
    const EventFactory = await enableContract(
      eventFactory.contractAddress,
      eventFactory.abi,
      web3
    );
    const tx = await EventFactory.mintTickets(
      event.contractAddress,
      preparedPurchases,
      { value: ethers.utils.parseEther(totalAmount.toString()) }
    );
    const receipt = await tx.wait();
    console.log(receipt);
  };
  return (
    <section>
      <div
        className={`mint-modal ${
          modalOpen
            ? "min-h-screen overflow-auto h-full"
            : "max-h-0 h-0 overflow-hidden hidden"
        }`}
      >
        <div className="mint-modal-content">
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
              <div className="lg:mt-[55px] flex justify-end">
                <button onClick={() => purchaseTickets()} className="btn px-3">
                  Pay {totalAmount} MATIC{" "}
                  <FontAwesomeIcon
                    className="ml-3"
                    icon={solid("chevron-right")}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => setModalOpen(true)} className="btn">
          Get a Ticket
        </button>
      </div>
    </section>
  );
}
