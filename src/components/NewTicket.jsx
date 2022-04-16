import { useRecoilState } from "recoil";
import { newTicketsState } from "recoil/atoms/newTickets";
import { removeItemAtIndex, replaceItemAtIndex } from "utils/arrays";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { safeInt } from "utils/safe-int";

export default function NewTicket({ ticket }) {
  const [tickets, setTickets] = useRecoilState(newTicketsState);
  const index = tickets.findIndex((item) => item === ticket);
  const [editing, setEditing] = useState(false);
  const deleteTicket = (index) => {
    const newTickets = removeItemAtIndex(tickets, index);
    setTickets(newTickets);
  };
  const editTicket = ({ target: { name, value } }) => {
    const freshTicket = {...ticket};
    if (name === "ticket_type" && value === 0) {
      freshTicket.price = 0;
    }
    const newTickets = replaceItemAtIndex(tickets, index, {
      ...freshTicket,
      [name]: value,
    });
    setTickets(newTickets);
  };
  return (
    <div className="create-event-section px-[28px] py-[21px]">
      {!editing ? (
        <div>
          <div className="flex justify-between">
            <h3 className="font-[500] text-white text-[18px] md:text-[25px] leading-[37.5px]">{ticket.name}</h3>
            <div className="flex">
              <button className="text-white pr-3 text-lg" onClick={() => setEditing(true)}>
                <FontAwesomeIcon icon={solid("pen")} />
              </button>
              <button className="text-white text-lg" onClick={() => deleteTicket(index)}>
                <FontAwesomeIcon icon={solid("trash")} />
              </button>
            </div>
          </div>
          <h3 className="font-[500] mt-1 text-[13px] md:text-[18px] leading-[37.5px] text-white">${ticket.price}</h3>
          <h3 className="font-[500] mt-1 text-white text-[13px] md:text-[18px] leading-[37.5px]">
            {ticket.ticket_type === 0 ? "Free" : ticket.ticket_type === 1 ? "Paid" : "Donation"}
          </h3>
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <h3 className="font-[500] text-white lg:text-[24px] lg:leading-[51.62px]">Editing {ticket.name}</h3>
            <button className="text-white text-2xl" onClick={() => setEditing(false)}>
              <FontAwesomeIcon icon={solid("times")} />
            </button>
          </div>
          <h3 className="text-white mt-[8px]">What kind of ticket?</h3>
          <div className="mt-[5px] flex flex-wrap gap-[12.68px]">
            <button
              onClick={() => {
                editTicket({
                  target: { name: "ticket_type", value: 1 },
                });
              }}
              className={`${
                ticket.ticket_type === 1 ? "bg-brand-red" : "create-event-gradient"
              } text-[20px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3`}
            >
              Paid
            </button>
            <button
              onClick={() => {
                editTicket({
                  target: { name: "ticket_type", value: 0 },
                });
              }}
              className={`${
                ticket.ticket_type === 0 ? "bg-brand-red" : "create-event-gradient"
              } text-[20px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3`}
            >
              Free
            </button>
            <button
              onClick={() => {
                editTicket({
                  target: { name: "ticket_type", value: 2 },
                });
              }}
              className={`${
                ticket.ticket_type === 2 ? "bg-brand-red" : "create-event-gradient"
              } text-[20px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3`}
            >
              Donation
            </button>
          </div>

          <div className="grid grid-cols-1 text-white gap-[17px] mt-[32px]">
            <div>
              <label className="block">Ticket Name</label>
              <input
                onChange={editTicket}
                value={ticket.name}
                name="name"
                className="create-event-gradient w-full px-3 mt-2 h-[45px]"
                type="text"
              />
            </div>

            <div>
              <label className="block">Available Number</label>
              <input
                onChange={(e) =>
                  editTicket({
                    target: {
                      name: "quantity_available",
                      value: safeInt(e.target.value),
                    },
                  })
                }
                value={ticket.quantity_available}
                name="quantity_available"
                className="create-event-gradient w-full px-3 mt-2 h-[45px]"
                type="number"
              />
            </div>
            {ticket.ticket_type > 0 ? (
              <div>
                <label className="block">Price</label>
                <input
                  onChange={(e) =>
                    editTicket({
                      target: {
                        name: "price",
                        value: safeInt(e.target.value),
                      },
                    })
                  }
                  value={ticket.price}
                  name="price"
                  className="create-event-gradient w-full px-3 mt-2 h-[45px]"
                  type="number"
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}
