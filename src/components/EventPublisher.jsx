import { eventFactoryState } from "recoil/atoms/contracts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useRecoilValue } from "recoil";
import { newEventState } from "recoil/atoms/newEvent";
import { useMoralisFile } from "react-moralis";
import { newTicketsState } from "recoil/atoms/newTickets";
import { useMoralis } from "react-moralis";
import Swal from "sweetalert2";
import { ethers } from "utils/web3-utils";
import { replaceItemAtIndex } from "utils/arrays";
import Event from "contract-abis/Event.json";
import { enableContract } from "utils/web3-utils";

const getTicker = (name) => {
  if (name.trim() === "") {
    throw new Error("Invalid Event Name");
  }
  let nameArray = name.split(" ");
  nameArray.map((item) => item.charAt(0));
  return nameArray.join("");
};

export default function EventPublisher() {
  const { user, web3 } = useMoralis();
  const { isUploading, saveFile } = useMoralisFile();
  const EventFactory = useRecoilValue(eventFactoryState);
  const tickets = useRecoilValue(newTicketsState);
  const newEvent = useRecoilValue(newEventState);
  const publishEvent = async () => {
    const events = await EventFactory.connect(web3.getSigner()).allEvents();
    console.log(await (await enableContract(events[0], Event.abi, web3))._eventData());
    if (!user) {
      Swal.fire({
        title: "Error!",
        text: "Please connect your wallet to continue",
        icon: "error",
      });
      return;
    }
    try {
      const file = newEvent.cover_image;
      if (!file && !(file instanceof File)) {
        Swal.fire({
          title: "Invalid Image!",
          text: "Please select a valid Event Cover Image to continue!",
          icon: "error",
        });
        return;
      }
      const ipfsLink = (await saveFile(file.name, file, { saveIPFS: true, throwOnError: true }))._ipfs;
      const event = {
        name: newEvent.name,
        ticker: getTicker(newEvent.name),
        host_name: newEvent.host,
        starts_on: newEvent.start_date + " " + newEvent.start_time,
        ends_on: newEvent.end_date + " " + newEvent.end_time,
        category: newEvent.category,
        description: newEvent.description,
        visibility: newEvent.visibility,
        venue_type: newEvent.venue_type,
        venue: newEvent.venue,
        cover_image_url: ipfsLink,
      };
      let freshTickets = [];
      tickets.forEach((ticket, index) => {
        freshTickets.push(
          replaceItemAtIndex(tickets, index, {
            ...ticket,
            price: ethers.utils.parseEther(ticket.price.toString()),
          })[index]
        );
      });
      console.log(await EventFactory.connect(web3.getSigner()).addEvent(event, freshTickets));
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      disabled={isUploading}
      onClick={async () => {
        await publishEvent();
      }}
      className="bg-brand-red connect-wallet h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
    >
      Publish Now <FontAwesomeIcon icon={solid("chevron-right")} />
    </button>
  );
}
