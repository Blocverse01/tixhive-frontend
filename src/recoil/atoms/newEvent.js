import { atom } from "recoil";
import moment from "moment";

export const newEventState = atom({
  key: "newEventState",
  default: {
    name: "",
    host: "",
    category: "",
    venue_type: null,
    venue: "",
    start_time: moment().format('HH:MM'),
    start_date: moment().format('YYYY-MM-DD'),
    end_time: moment().add(4, 'hours').format('HH:MM'),
    end_date: moment().add(2, 'days').format('YYYY-MM-DD'),
    description: "",
    cover_image: null,
    visibility: 1,
    currency: process.env.REACT_APP_EVENT_CURRENCY || "MATIC"
  },
});
