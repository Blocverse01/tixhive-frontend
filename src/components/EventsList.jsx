import { Link } from "react-router-dom";
import EventListCard from "./EventListCard";

export default function EventList({ events }) {
  return (
    <section className="xl:grid-cols-4 grid grid-cols-2 sm:grid-cols-3 sm:gap-[31px] gap-[9.15px]">
      {events.map((event, index) => (
        <Link key={index} to={`/events/${event.contractAddress}`}>
          <EventListCard event={event} />
        </Link>
      ))}
    </section>
  );
}
