import { replaceItemAtIndex } from "utils/arrays";
import { ethers } from "./web3-utils";
import Moralis from "moralis";

export const eventVisibility = ["private", "public"];
export const venue_type = ["physical", "virtual"];

export const saveToMoralis = async (newEvent, contractAddress, cover_image, leastTicketCost, tickets) => {
  const event = new Moralis.Object("Event");
  const eventACL = new Moralis.ACL(Moralis.User.current());
  eventACL.setPublicReadAccess(true);
  event.set("name", newEvent.name);
  event.set("cover_image_url", cover_image._ipfs);
  event.set("host_name", newEvent.host);
  event.set("ticker", getTicker(newEvent.name));
  event.set("starts_on", newEvent.start_date + " " + newEvent.start_time);
  event.set("ends_on", newEvent.end_date + " " + newEvent.end_time);
  event.set("category", newEvent.category);
  event.set("visibility", newEvent.visibility);
  event.set("venue_type", newEvent.venue_type);
  event.set("venue", newEvent.venue);
  event.set("contractAddress", contractAddress);
  event.set("leastTicketCost", leastTicketCost);
  event.set("description", newEvent.description);
  event.set("saleIsActive", true);
  event.set("tickets", tickets);
  event.set("currency", newEvent.currency);
  event.setACL(eventACL);
  return await event.save();
};

export const getTicker = (name) => {
  if (name.trim() === "") {
    throw new Error("Invalid Event Name");
  }
  let nameArray = name.split(" ");
  nameArray.map((item) => item.charAt(0));
  return nameArray.join("");
};

export const parseTicketsPriceToEther = (tickets) => {
  let freshTickets = [];
  tickets.forEach((ticket, index) => {
    freshTickets.push(
      replaceItemAtIndex(tickets, index, {
        ...ticket,
        price: ethers.utils.parseEther(ticket.price.toString()),
      })[index]
    );
  });
  return freshTickets;
};
