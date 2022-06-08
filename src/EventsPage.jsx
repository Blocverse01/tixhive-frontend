import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEventList, useEventCategories } from "hooks/data/events";
import tickets from "images/event-tickets.png";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import EventList from "components/EventsList";
import { useRecoilState } from "recoil";
import { eventListFilterState } from "recoil/atoms/events";

function EventsPage() {
  const events = useEventList();
  const eventCategories = useEventCategories();
  const [eventFilter, setFilter] = useRecoilState(eventListFilterState);

  const updateFilter = ({ target: { name, value } }) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              value={eventFilter.name}
              onChange={updateFilter}
              type="search"
              name="name"
              placeholder="Blockchain Event"
            />
          </div>
          <div field="true">
            <label>In</label>
            <input
              onChange={updateFilter}
              value={eventFilter.location}
              type="search"
              name="location"
              placeholder="Lagos, Nigeria"
            />
          </div>
          <div field="last">
            <label>When</label>
            <select
              value={eventFilter.date}
              name="date"
              onChange={updateFilter}
            >
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
            <select
              name="category"
              onChange={updateFilter}
              value={eventFilter.category}
              className="EventsPage__upcoming__events__header__filter"
            >
              <option value={"Any Category"}>Any Category</option>
              {eventCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <EventList events={events} />
      </section>
    </section>
  );
}

export default EventsPage;
