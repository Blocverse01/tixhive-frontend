import { atom } from "recoil";
import eventCover from "images/unsplash_nwLTVwb7DbU.png";
import eventCover2 from "images/pexels-teddy-yang-2263436.jpg";
import eventCover3 from "images/pexels-caio-59884.jpg";
import eventCover4 from "images/pexels-jonas-von-werne-2897462.jpg";

export const eventsState = atom({
  key: "events",
  default: [
    {
      host_name: "BlocVerse",
      venue: "Agon Place, Mile 50, Abakaliki",
      name: "Abakaliki BlocSummit",
      starts_on: "2022-06-23 09:00:00",
      cover_image: eventCover,
      leastTicketPrice: "20",
    },
    {
      host_name: "Cavemen",
      venue: "Agon Place, Mile 50, Abakaliki",
      name: "Get Cavvy 2.0",
      starts_on: "2022-05-23 13:00:00",
      cover_image: eventCover2,
      leastTicketPrice: "25",
    },
    {
      host_name: "Anon Host",
      venue: "Agon Place, Mile 20, Abakaliki",
      name: "Hidden Identities",
      starts_on: "2022-07-22 12:00:00",
      cover_image: eventCover3,
      leastTicketPrice: "50",
    },
    {
      host_name: "Bored Ape Yatch Club - BAYC",
      venue: "Virtual",
      name: "BAYC Hangout",
      starts_on: "2022-10-27 06:00:00",
      cover_image: eventCover4,
      leastTicketPrice: "300",
    },
  ],
});
