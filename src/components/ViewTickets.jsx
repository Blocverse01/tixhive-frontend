import ViewTicket from "./ViewTicket";

export default function ViewTickets({ event, closeBtn }) {
  return (
    <section>
      <section>
        <div className="mint-modal-content">
          <div className="mint-modal-header">
            <h3 className="mint-modal-title">Your tickets for {event.name}</h3>
            {closeBtn}
          </div>
          <div className="grid grid-cols-1 py-[32px] md:grid-cols-2 gap-[14px] md:gap-[30px]">
            {event.sales.map((sale, index) => (
              <ViewTicket key={index} sale={sale} event={event} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
