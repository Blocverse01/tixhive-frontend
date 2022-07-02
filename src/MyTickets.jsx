import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import LoginMessage from "components/LoginMessage";
import EVENT from "contract-abis/Event.json";
import { enableContract } from "utils/web3-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import EventDropdown from "./components/EventDropdown";
import { useMyEvents } from "hooks/data/tickets";

export default function MyTickets() {
  const { userEvents, isLoading } = useMyEvents();
  const { isAuthenticated } = useMoralis();

  return (
    <section className="page">
      <div className="page-wrapper">
        <h3 className="page-title">Tickets Bought</h3>
        {isAuthenticated ? (
          <section className={"grid-cols-1 text-white gap-5 grid"}>
            {userEvents.map((event, index) => (
              <EventDropdown key={index} event={event} />
            ))}
            {isLoading ? (
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
            {userEvents.length === 0 && !isLoading ? (
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
