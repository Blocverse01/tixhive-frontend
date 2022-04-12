import { atom } from "recoil";

export const newEvent = atom({
  key: "newEvent",
  default: {
    name: "Get Cavvy 2.0",
    host: "Cavemen",
    category: "Live perfomance",
    venue_type: 0,
    venue: "O2 Arena, London, UK",
    start_time: "09:00:00",
    start_date: "2022-03-13",
    end_time: "12:00:00",
    end_date: "2022-05-16",
    description: "An event to get cavy in",
    cover_image: null,
    visibility: 1,
  },
});
