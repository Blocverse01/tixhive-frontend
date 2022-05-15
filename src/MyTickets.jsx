import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import LoginMessage from "components/LoginMessage";
import EVENT from "contract-abis/Event.json";
import { enableContract } from "utils/web3-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import EventDropdown from "./components/EventDropdown";

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
            const [totalSold, sales, tickets] = await eventContract.getInfo();
            tokens = tokens.map((token) => token.toNumber());
            const advancedEvent = {
              ...event.attributes,
              sales: sales.filter((sale) =>
                tokens.includes(sale.tokenId.toNumber()),
              ),
              tickets: tickets
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
        <h3 className="page-title">Tickets Bought</h3>
        {isAuthenticated ? (
          <section className={"grid-cols-1 text-white gap-5 grid"}>
            {userEvents.map((event, index) => <EventDropdown key={index} event={event} />)}
            {loading ? (
              <div className="empty-events text-sm md:text-base">
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
