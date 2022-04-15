import React, { useState } from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { newTicketsState } from "recoil/atoms/newTickets";

function StepThree({ setStep }) {
  const [tickets, addTicket] = useRecoilState(newTicketsState);
  const storeTicket = (ticket) => {
    if (ticket.name.trim() === "" || parseInt(ticket.quantity_available) < 1) {
      return;
    }
    if (ticket.ticket_type === 1 && parseInt(ticket.price) <= 0) {
      return;
    }
    if (parseInt(ticket.price) <= 0) {
      ticket.price = 0;
      ticket.ticket_type = 0;
    }
    addTicket((prev) => [...prev, ticket]);
  };
  const [shouldAddTicket, setShouldAddTicket] = useState(tickets.length === 0 ? true : false);
  const intValue = (value) => {
    return isNaN(parseInt(value)) ? 0 : parseInt(value);
  };
  const [newTicket, setInputValue] = useState({
    name: "General Admission",
    description: "",
    ticket_type: 1,
    quantity_available: 300,
    price: 200,
  });

  const beforeSetShouldAddTicket = (status) => {
    if (tickets.length === 0 && status === false) {
      setShouldAddTicket(false);
      return;
    }
    setShouldAddTicket(status);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newTicket);
  };
  return (
    <div className="lg:px-[30px]">
      {shouldAddTicket ? (
        <div>
          <h3 className="font-[500] text-white lg:text-[34.41px] lg:leading-[51.62px]">Let’s Setup Your Tickets</h3>
          <h3 className="text-white mt-[8px]">What kind of ticket?</h3>
          <div className="mt-[5px] flex flex-wrap gap-[12.68px]">
            <button
              onClick={() => {
                handleChange({
                  target: { name: "ticket_type", value: 1 },
                });
              }}
              className={`${
                newTicket.ticket_type === 1 ? "bg-brand-red" : "create-event-gradient"
              } text-[20px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3`}
            >
              Paid
            </button>
            <button
              onClick={() => {
                handleChange({
                  target: { name: "ticket_type", value: 0 },
                });
              }}
              className={`${
                newTicket.ticket_type === 0 ? "bg-brand-red" : "create-event-gradient"
              } text-[20px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3`}
            >
              Free
            </button>
            <button
              onClick={() => {
                handleChange({
                  target: { name: "ticket_type", value: 2 },
                });
              }}
              className={`${
                newTicket.ticket_type === 2 ? "bg-brand-red" : "create-event-gradient"
              } text-[20px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3`}
            >
              Donation
            </button>
          </div>

          <div className="grid grid-cols-1 text-white gap-[17px] mt-[32px]">
            <div>
              <label className="block">Ticket Name</label>
              <input
                onChange={handleChange}
                value={newTicket.name}
                name="name"
                className="create-event-gradient w-full px-3 mt-2 h-[45px]"
                type="text"
              />
            </div>

            <div>
              <label className="block">Available Number</label>
              <input
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "quantity_available",
                      value: intValue(e.target.value),
                    },
                  })
                }
                value={newTicket.quantity_available}
                name="quantity_available"
                className="create-event-gradient w-full px-3 mt-2 h-[45px]"
                type="number"
              />
            </div>
            {newTicket.ticket_type > 0 ? (
              <div>
                <label className="block">Price</label>
                <input
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "price",
                        value: intValue(e.target.value),
                      },
                    })
                  }
                  value={newTicket.price}
                  name="price"
                  className="create-event-gradient w-full px-3 mt-2 h-[45px]"
                  type="number"
                />
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  storeTicket(newTicket);
                  beforeSetShouldAddTicket(false);
                }}
                type="button"
                className="bg-brand-red connect-wallet h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
              >
                <span className="flex items-center">
                  <FontAwesomeIcon icon={solid("plus")} className="mr-[22px]" />
                  Add Ticket
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-[500] mb-[13px] text-white lg:text-[34.41px] lg:leading-[51.62px]">Manage Tickets</h3>
          <div className="mb-[36.55px]">
            <button
              onClick={() => {
                setShouldAddTicket(true);
              }}
              type="button"
              className="bg-brand-red connect-wallet h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
            >
              <span className="flex items-center">
                Add Ticket
                <FontAwesomeIcon icon={solid("chevron-right")} className="ml-[22px]" />
              </span>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-[27px]">
            {tickets.map((ticket, index) => (
              <div key={index} className="create-event-section px-[28px] py-[21px]">
                <h3 className="font-[500] text-white text-[25px] leading-[37.5px]">{ticket.name}</h3>
                <h3 className="font-[500] mt-1 text-[18px] leading-[37.5px] text-white">${ticket.price}</h3>
                <h3 className="font-[500] mt-1 text-white text-[18px] leading-[37.5px]">
                  {ticket.ticket_type === 0 ? "Free" : ticket.ticket_type === 1 ? "Paid" : "Donation"}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default StepThree;
