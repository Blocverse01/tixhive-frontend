import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { eventListState } from "../recoil/atoms/events";
import { useEffect, useState } from "react";
import EVENT from "contract-abis/Event.json";
import { enableContract, ethers } from "utils/web3-utils";
import { useMoralis } from "react-moralis";
import LoginMessage from "./LoginMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import { Link } from "react-router-dom";
import truncateEthAddress from "truncate-eth-address";

export default function TicketInfoPage() {
  const { contract, purchase } = useParams();
  const { user, isAuthenticated, web3, isWeb3Enabled } = useMoralis();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);
  const events = useRecoilValue(eventListState);
  const [ticketInfo, setTicketInfo] = useState({});
  const [event, setEvent] = useState(false);
  const ticketTypes = ["Free", "Paid", "Donation"];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled) {
      const eventFromMoralis = events.find(
        (item) => item.contractAddress === contract
      );
      if (!eventFromMoralis) {
        setLoading(false);
        return;
      }
      setEvent(eventFromMoralis);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, web3, user, isWeb3Enabled]);

  useEffect(() => {
    if (loaded) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useEffect(() => {
    async function loadStuff() {
      if (event) {
        const eventContract = await enableContract(contract, EVENT, web3);
        // eslint-disable-next-line no-unused-vars
        const [totalSold, sales, tickets] = await eventContract.getInfo();
        const sale = sales.find((item) => item.purchaseId === purchase);
        if (!sale) {
          setLoading(false);
          return;
        }
        const ticket = tickets[sale.ticketId.toNumber()];

        const owner = await eventContract.ownerOf(sale.tokenId.toNumber());

        setTicketInfo({
          tokenId: sale.tokenId.toNumber(),
          name: ticket.name,
          type: ticketTypes[ticket.ticket_type],
          cost: `${ethers.utils.formatEther(sale.cost.toString())} ${
            event.currency
          }`,
          owner: owner,
        });
        setLoaded(true);
      }
    }

    loadStuff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <section className="page">
      <div className="page-wrapper">
        <h3 className="page-title">Ticket Info Page</h3>
        {isAuthenticated ? (
          <div>
            <div>
              {ticketInfo.tokenId !== undefined ? (
                <div className={"text-white grid grid-cols-1 gap-5"}>
                  <div className={"bg-event-gradient"}>
                    <div
                      className={
                        "border-b px-5 flex justify-between items-center pt-3 border-slate-300 pb-3"
                      }
                    >
                      <h3 className={"font-semibold"}>Event</h3>
                      <Link
                        to={`/events/${contract}`}
                        className={"py-1 bg-black-gradient px-2"}
                      >
                        <FontAwesomeIcon
                          icon={solid("eye")}
                          className={"md:hidden"}
                        />
                        <span className={"hidden md:block"}>Check Event</span>
                      </Link>
                    </div>
                    <div className="flex items-center p-5">
                      <div className="hidden md:block">
                        <h3 className="event-month">
                          {moment(event.starts_on).format("MMM")}
                        </h3>
                        <h3 className="event-day">
                          {moment(event.starts_on).format("DD")}
                        </h3>
                      </div>
                      <div className="md:pl-[60px]">
                        <h3 className="event-title">{event.name}</h3>
                        <h3 className="event-start-date">
                          {moment(event.starts_on).format("DD MMM hh:mm A")}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className={"bg-event-gradient"}>
                    <div
                      className={
                        "border-b px-5 flex justify-between items-center pt-3 border-slate-300 pb-3"
                      }
                    >
                      <h3 className={"font-semibold"}>Ticket</h3>
                    </div>
                    <div>
                      <div
                        className={
                          "grid-cols-3 text-center grid border-slate-300"
                        }
                      >
                        <div className={"p-3 border-r border-b"}>Token ID</div>
                        <div className={"p-3 border-r border-b"}>Name</div>
                        <div className={"p-3 border-b"}>Cost</div>
                        <div className={"p-3 border-r"}>
                          {ticketInfo.tokenId}
                        </div>
                        <div className={"p-3 border-r truncate"}>
                          {ticketInfo.name}
                        </div>
                        <div className={"p-3"}>{ticketInfo.cost}</div>
                        <div className={"p-3 col-span-3 border-t"}>
                          Owner: {"  "}
                          <span className={"underline text-brand-red"}>
                            <FontAwesomeIcon
                              icon={solid("up-right-from-square")}
                            />{" "}
                            <a
                              target={"_blank"}
                              rel={"noreferrer"}
                              href={`https://polygonscan.com/address/${ticketInfo.owner}`}
                            >
                              {truncateEthAddress(ticketInfo.owner)}
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="empty-events">
                    <FontAwesomeIcon
                      icon={solid("spinner")}
                      className="mr-4"
                      spin
                    />{" "}
                    Loading Ticket Info.
                  </div>
                </div>
              )}
            </div>
            {(ticketInfo.tokenId === undefined && event) ||
            (ticketInfo.tokenId === undefined && loaded) ? (
              <div className="empty-events text-sm md:text-base">
                {`Error loading ticket info for "${purchase}", be sure that's a valid purchase ID.`}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            <LoginMessage authAction="view ticket info" />
          </div>
        )}
      </div>
    </section>
  );
}
