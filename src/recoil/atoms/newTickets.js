import { atom } from "recoil";

export const newTicketsState = atom({
  key: "newTicketsState",
  default: [
    {
      name: "General Admission",
      type: 1,
      price: 200,
      available_number: 300,
    },
    {
      name: "VIP",
      type: 1,
      price: 2000,
      available_number: 30,
    },
    {
      name: "Poor Paupers",
      type: 1,
      price: 20,
      available_number: 3000,
    },
  ],
});
