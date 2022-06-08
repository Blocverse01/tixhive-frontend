import EventListCard from "./EventListCard";

export default function EventList({ events }) {
  return (
    <section className="xl:grid-cols-4 grid grid-cols-2 sm:grid-cols-3 sm:gap-[31px] gap-[9.15px]">
      {events.map((event, index) => (
        <EventListCard event={event} />
      ))}
    </section>
  );
}
