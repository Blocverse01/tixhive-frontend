import { atom, selector } from "recoil";

export const newTicketsState = atom({
  key: "newTicketsState",
  default: [],
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
