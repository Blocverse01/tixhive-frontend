import { useMoralis } from "react-moralis";
import LoginMessage from "components/LoginMessage";
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
        <h3 className="page-title">
          <FontAwesomeIcon icon={solid("wallet")} className="mr-3" /> Tickets In
          Your Wallet
        </h3>
        {isAuthenticated ? (
          <div>
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
              <div>
                {userEvents.length > 0 ? (
                  <section className={"grid-cols-1 text-white gap-5 grid"}>
                    {userEvents.map((event, index) => (
                      <EventDropdown key={index} event={event} />
                    ))}
                  </section>
                ) : (
                  <div className="empty-events">
                    We found zero tickets in your wallet.
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <LoginMessage authAction="view your events" />
        )}
      </div>
    </section>
  );
}
