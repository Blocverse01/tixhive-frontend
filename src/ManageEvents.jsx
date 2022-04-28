import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import LoginMessage from "components/LoginMessage";
import moment from "moment";
import EVENT from "contract-abis/Event.json";
import { enableContract, ethers } from "utils/web3-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import OptionModal from "components/OptionModal";
import ClickToCopy from "components/ClickToCopy";

export default function ManageEvents() {
  const { user, isAuthenticated, Moralis, web3, isWeb3Enabled } = useMoralis();
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const eventOptions = ["Dashboard", "View Event", "Edit Event", "Copy URL"];

  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled) {
      const query = new Moralis.Query("Event");
      query.descending("createdAt").equalTo("owner", user?.get("ethAddress"));
      query.find().then(async (events) => {
        const unresolvedPromises = events.map(async (event) => {
          const eventContract = await enableContract(
            event.get("contractAddress"),
            EVENT,
            web3
          );
          const [totalSold, sales] = await eventContract.getInfo();
          const totalTickets = event
            .get("tickets")
            .map((ticket) => ticket.quantity_available)
            .reduce((a, b) => a + b, 0);
          const advancedEvent = {
            ...event.attributes,
            totalTickets: totalTickets,
            sales: sales.length,
            amountSold: totalSold.toString(),
          };
          return advancedEvent;
        });
        setUserEvents(await Promise.all(unresolvedPromises));
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, web3, isWeb3Enabled]);

  return (
    <section className="page">
      <div className="page-wrapper">
        <h3 className="page-title">Manage Your Events</h3>
        {isAuthenticated ? (
          <section>
            <div className="table w-full text-left text-white table-auto events-table">
              <div className="table-header-group">
                <div className="table-row">
                  <div className="events-header-text">Event</div>
                  <div className="events-header-text">Tickets</div>
                  <div className="events-header-text">Gross Sales</div>
                  <div className="events-header-text">Status</div>
                </div>
              </div>
              <div className="events-wrapper">
                {userEvents.map((event, index) => (
                  <div key={index} className="relative table-row event">
                    <div className="table-cell p-[16.5px] md:p-[24px] lg:p-[32px] text-left">
                      <div className="flex items-center">
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
                    <div className="table-cell">
                      <div className="flex items-center h-full">
                        <div className="w-full">
                          <h3 className="mb-[16px]">
                            {event.sales}/{event.totalTickets}
                          </h3>
                          <div className="max-w-[72px] h-2 mt-1 bg-white">
                            <div
                              className="h-2 bg-brand-red"
                              style={{
                                width: `${
                                  (event.sales / event.totalTickets) * 100
                                }%`,
                                maxWidth: "100%",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-cell">
                      {ethers.utils.formatEther(event.amountSold)} MATIC
                    </div>
                    <div className="table-cell">
                      {event.saleIsActive ? (
                        <div className="flex items-center">
                          <div className="h-[14px] w-[14px] rounded-full bg-brand-red"></div>
                          <h3 className="ml-3">On-Sale</h3>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="h-[14px] w-[14px] rounded-full bg-slate-300"></div>
                          <h3 className="ml-3">Sale-Closed</h3>
                        </div>
                      )}
                    </div>
                    <div className="table-cell p-[16.5px] md:p-[24px] lg:p-[32px] text-right">
                      <OptionModal
                        toggle={
                          <FontAwesomeIcon
                            className="text-2xl md:text-3xl"
                            icon={solid("ellipsis-v")}
                          />
                        }
                        options={eventOptions.map((option, index) => {
                          switch (option) {
                            case "View Event":
                              return (
                                <Link
                                  key={index}
                                  className="py-[24px] px-[20px] md:px-[54px] text-center"
                                  to={`/events/${event.contractAddress}`}
                                >
                                  {option}
                                </Link>
                              );
                            case "Copy URL":
                              return (
                                <ClickToCopy
                                  key={index}
                                  buttonText={option}
                                  text={`${window.location.origin}/events/${event.contractAddress}`}
                                />
                              );
                            default:
                              return (
                                <Link
                                  key={index}
                                  className="py-[24px] px-[20px] md:px-[54px] text-center"
                                  to={`/event/${event.contractAddress}/${option
                                    .replace(/[^a-zA-Z0-9]/g, "-")
                                    .toLowerCase()}`}
                                >
                                  {option}
                                </Link>
                              );
                          }
                        })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="empty-events">
                <FontAwesomeIcon
                  icon={solid("spinner")}
                  className="mr-4"
                  spin
                />{" "}
                Your event list is loading.
              </div>
            ) : (
              ""
            )}
            {userEvents.length === 0 && !loading ? (
              <div className="empty-events">Your event list is empty.</div>
            ) : (
              ""
            )}
            <div className="mt-7 flex justify-start">
              <Link to="/create-event" className="text-lg btn md:text-xl">
                Create Event
              </Link>
            </div>
          </section>
        ) : (
          <div>
            <LoginMessage authAction="manage your events" />
          </div>
        )}
      </div>
    </section>
  );
}
