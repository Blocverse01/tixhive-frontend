import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import TicketCard from "./TicketCard";
import { useUnwrapTickets } from "hooks/data/events";

export default function EventDropdown({ event }) {
  const [modalOpen, toggle] = useState(false);
  const tickets = useUnwrapTickets(event, event.nfts);
  return (
    <section>
      <div
        onClick={() => toggle(!modalOpen)}
        className={"bg-event-gradient cursor-pointer"}
      >
        <div
          className={
            "border-b px-5 flex justify-between tickets-center pt-3 border-slate-300 pb-3"
          }
        >
          <h3 className={"font-semibold"}>Event</h3>
          <Link
            to={`/events/${event.contractAddress}`}
            className={"py-1 md:py-2 bg-black-gradient px-2"}
          >
            <FontAwesomeIcon icon={solid("eye")} className={"md:hidden"} />
            <span className={"hidden md:block"}>Check Event</span>
          </Link>
        </div>
        <div className="flex tickets-start justify-between p-5">
          <div className={"flex tickets-center"}>
            <div className="hidden md:block">
              <h3 className="event-month">
                {moment(event.starts_on).format("MMM")}
              </h3>
              <h3 className="event-day">
                {moment(event.starts_on).format("DD")}
              </h3>
            </div>
            <div className="md:pl-[60px]">
              <h3 className="event-title">{event.name}</h3>
              <h3 className="event-start-date">
                {moment(event.starts_on).format("DD MMM hh:mm A")}
              </h3>
            </div>
          </div>
          <FontAwesomeIcon
            className={"text-2xl"}
            icon={modalOpen ? solid("chevron-up") : solid("chevron-down")}
          />
        </div>
      </div>
      <div
        className={`${
          modalOpen ? "h-full" : "h-0 overflow-hidden"
        }  mt-7 transition-all ease-out`}
      >
        {tickets.map((ticket, index) => (
          <TicketCard
            ticket={ticket}
            key={index}
            event={event}
            image={ticket.image}
          />
        ))}
      </div>
    </section>
  );
}
