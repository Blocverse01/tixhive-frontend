import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import LoginMessage from "components/LoginMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { useRawEvents } from "hooks/data/events";
import EventOverview from "components/event/EventOverview";

export default function ManageEvents() {
  const { user, isAuthenticated, web3, isWeb3Enabled } = useMoralis();
  const [userEvents, setUserEvents] = useState([]);
  const events = useRawEvents();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled && events.length > 0) {
      const rawUserEvents = events.filter(
        (event) => event.owner === user?.get("ethAddress")
      );
      setUserEvents(rawUserEvents);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, web3, isWeb3Enabled, events]);

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
                  <EventOverview rawEvent={event} key={index} />
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
            <div className="flex justify-start mt-7">
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
