import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetEvents from "hooks/useGetEvents";
import tickets from "images/event-tickets.png";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import EventList from "components/EventsList";

function EventsPage() {
  const { events } = useGetEvents();
  return (
    <section>
      <div className="EventsPage__hero__container">
        <div className="EventsPage__hero__content">
          <h3 className="EventsPage__hero__header">
            Your Tickets.
            <br /> On the Blockchain. Forever.
          </h3>
          <img src={tickets} alt="tickets" className="EventsPage__hero__img" />
        </div>
        <section className="EventsPage__search__bar">
          <div field="true">
            <label>Looking for</label>
            <input
              type="search"
              name="search_category"
              placeholder="Blockchain Event"
            />
          </div>
          <div field="true">
            <label>In</label>
            <input
              type="search"
              name="search_location"
              placeholder="Lagos, Nigeria"
            />
          </div>
          <div field="last">
            <label>When</label>
            <select name="search_date">
              <option>Any Date</option>
            </select>
          </div>
          <div>
            <button className="EventsPage__search__bar__button">
              <FontAwesomeIcon icon={solid("search")} />
            </button>
          </div>
        </section>
      </div>
      <section className="EventsPage__upcoming__events">
        <div className="EventsPage__upcoming__events__header">
          <h3 className="EventsPage__upcoming__events__header__title">
            Upcoming Events
          </h3>
          <div>
            <select className="EventsPage__upcoming__events__header__filter">
              <option>Any Category</option>
            </select>
          </div>
        </div>
        <EventList events={events} />
      </section>
    </section>
  );
}

export default EventsPage;
