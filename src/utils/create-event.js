import { uploadFile } from "./upload-to-ipfs";
import { ethers } from "./web3-utils";

export const storeEventData = async (newEvent, tickets, EventFactory, web3Provider) => {
  try {
    console.log(EventFactory, web3Provider);
    const [ipfsLink] = await uploadFile(newEvent.cover_image);
    const event = {
      ...newEvent,
      cover_image_url: ipfsLink,
      starts_on: newEvent.start_date + " " + newEvent.start_time,
      ends_on: newEvent.end_date + " " + newEvent.end_time,
    };
    let freshTickets = [...tickets];
    console.log(freshTickets);
    freshTickets = freshTickets.forEach((ticket) => (ticket.price = ethers.utils.parseEther(ticket.price.toString())));
    console.log(freshTickets);
    await EventFactory.connect(web3Provider.getSigner()).addEvent(event, freshTickets);
    return true;
  } catch (err) {
    console.error(err);
  }
};
