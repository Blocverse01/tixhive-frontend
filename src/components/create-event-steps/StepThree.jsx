import React, { useState } from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { newTicketsState } from "recoil/atoms/newTickets";
import NewTicket from "components/NewTicket";
import { safeInt } from "utils/safe-int";

function StepThree({ setStep }) {
  const [tickets, setTickets] = useRecoilState(newTicketsState);
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
    setTickets((prev) => [...prev, ticket]);
    setShouldAddTicket(false);
  };
  const [shouldAddTicket, setShouldAddTicket] = useState(tickets.length === 0 ? true : false);
  const [newTicket, setInputValue] = useState({
    name: "General Admission",
    description: "",
    ticket_type: 1,
    quantity_available: 300,
    price: 200,
  });

  const beforeSetShouldAddTicket = (status) => {
    if (tickets.length === 0 && status === false) {
      setShouldAddTicket(true);
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
      {shouldAddTicket || tickets.length === 0 ? (
        <div>
          <div className="flex justify-between">
            <h3 className="font-[500] text-white lg:text-[34.41px] lg:leading-[51.62px]">Let’s Setup Your Tickets</h3>
            <button className="text-white text-2xl" onClick={() => beforeSetShouldAddTicket(false)}>
              <FontAwesomeIcon icon={solid("times")} />
            </button>
          </div>
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
                      value: safeInt(e.target.value),
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
                        value: safeInt(e.target.value),
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
                }}
                type="button"
                className="bg-brand-red connect-wallet h-[45px] md:h-[55px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
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
              <NewTicket ticket={ticket} key={index} />
            ))}
          </div>
          <div className="flex justify-between mt-[40px]">
            <button
              onClick={() => {
                setStep(2);
              }}
              type="button"
              className="bg-brand-red connect-wallet h-[45px] lg:h-[56px] px-3 lg:px-0 lg:w-[170px] text-white text-[12px] md:text-[18px] leading-[35px] flex justify-center items-center"
            >
              <span className="flex items-center">
                <FontAwesomeIcon icon={solid("chevron-left")} className="mr-[13px] md:mr-[22px]" />
                Previous
              </span>
            </button>
            <button
              onClick={() => {
                setStep(4);
              }}
              type="button"
              className="bg-brand-red connect-wallet h-[45px] lg:h-[56px] px-3 lg:px-0 lg:w-[170px] text-white text-[12px] md:text-[18px] leading-[35px] flex justify-center items-center"
            >
              <span className="flex items-center">
                Continue
                <FontAwesomeIcon icon={solid("chevron-right")} className="ml-[13px] md:ml-[22px]" />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default StepThree;
