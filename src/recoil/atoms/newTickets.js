import { atom, selector } from "recoil";

export const newTicketsState = atom({
  key: "newTicketsState",
  default: [
    {
      name: "General Admission",
      description: "",
      ticket_type: 1,
      quantity_available: 300,
      price: 0.001,
    },
    {
      name: "VIP",
      description: "",
      ticket_type: 1,
      quantity_available: 30,
      price: 0.002,
    },
    {
      name: "Poor Paupers",
      description: "",
      ticket_type: 1,
      quantity_available: 3000,
      price: 0.003,
    },
  ],
});

export const leastTicketPriceState = selector({
  key: "leastTicketPriceState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const tickets = get(newTicketsState);
    let prices = tickets.map((ticket) => ticket.price);
    let sorted = prices.sort(function (a, b) {
      return a - b;
    });
    return sorted[0] || 0;
  },
});
