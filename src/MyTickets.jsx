import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import LoginMessage from "components/LoginMessage";
import moment from "moment";
import EVENT from "contract-abis/Event.json";
import { enableContract } from "utils/web3-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function MyTickets() {
  const { user, isAuthenticated, Moralis, web3, isWeb3Enabled } = useMoralis();
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled) {
      const query = new Moralis.Query("Event");
      query.descending("createdAt");
      query.find().then(async (events) => {
        const unresolvedPromises = events.map(async (event) => {
          const eventContract = await enableContract(
            event.get("contractAddress"),
            EVENT,
            web3
          );
          let tokens = await eventContract.ownerTokens(user.get("ethAddress"));
          if (tokens.length > 0) {
            // eslint-disable-next-line no-unused-vars
            const [totalSold, sales] = await eventContract.getInfo();
            tokens = tokens.map((token) => token.toNumber());
            const advancedEvent = {
              ...event.attributes,
              sales: sales.filter((sale) =>
                tokens.includes(sale.tokenId.toNumber())
              ),
            };
            return advancedEvent;
          }
          return null;
        });
        setUserEvents((await Promise.all(unresolvedPromises)).filter(Boolean));
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, web3, isWeb3Enabled]);

  return (
    <section className="page">
      <div className="page-wrapper">
        <h3 className="page-title">Your Events {"&"} Tickets</h3>
        {isAuthenticated ? (
          <section>
            <div className="table w-full text-left text-white table-auto events-table">
              <div className="table-header-group">
                <div className="table-row">
                  <div className="events-header-text">Event</div>
                  <div className="events-header-text">Tickets</div>
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
                      <h3>{event.sales.length}</h3>
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
          </section>
        ) : (
          <div>
            <LoginMessage authAction="view your events" />
          </div>
        )}
      </div>
    </section>
  );
}
