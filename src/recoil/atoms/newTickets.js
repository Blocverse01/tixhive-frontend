import { atom, selector } from "recoil";

export const newTicketsState = atom({
  key: "newTicketsState",
  default: [
    {
      name: "Sample Ticket",
      description: "",
      ticket_type: 1,
      quantity_available: 300,
      price: 100,
    }
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
