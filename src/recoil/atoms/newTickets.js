import { atom } from "recoil";

export const newTicketsState = atom({
  key: "newTicketsState",
  default: [
    {
      name: "General Admission",
      description: "",
      ticket_type: 1,
      quantity_available: 300,
      price: 200,
    },
    {
      name: "VIP",
      description: "",
      ticket_type: 1,
      quantity_available: 30,
      price: 2000,
    },
    {
      name: "Poor Paupers",
      description: "",
      ticket_type: 1,
      quantity_available: 3000,
      price: 20,
    },
  ],
});
