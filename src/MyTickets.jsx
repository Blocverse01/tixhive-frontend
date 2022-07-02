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
        <h3 className="page-title">Tickets In Your Wallet</h3>
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
                    Your purchased and owned tickets would display here.
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
