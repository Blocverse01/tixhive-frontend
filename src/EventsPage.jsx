import { useEventList } from "hooks/data/events";
import tickets from "images/event-tickets.png";
import EventList from "components/EventsList";
import EventSearchBar from "components/EventSearchBar";
import EventListCategoryFilter from "components/EventListCategoryFilter";

function EventsPage() {
  const events = useEventList();

  return (
    <section>
      <div className="EventsPage__hero__container">
        <div className="EventsPage__hero__content">
          <h3 className="EventsPage__hero__header">
            Your Tickets.
            <br /> On the Blockchain. Forever.
          </h3>
          <img src={tickets} alt="tickets" className="EventsPage__hero__img" />
          <div className="hidden lg:block">
            <EventSearchBar />
          </div>
        </div>
        <div className="lg:hidden">
          <EventSearchBar />
        </div>
      </div>
      <section className="EventsPage__upcoming__events">
        <div className="EventsPage__upcoming__events__header">
          <h3 className="EventsPage__upcoming__events__header__title">
            Upcoming Events
          </h3>
          <div>
            <EventListCategoryFilter />
          </div>
        </div>
        <EventList events={events} />
      </section>
    </section>
  );
}

export default EventsPage;
