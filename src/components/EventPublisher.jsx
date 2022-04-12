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

export default function EventPublisher() {
  const { user, web3 } = useMoralis();
  const { isUploading, saveFile } = useMoralisFile();
  const EventFactory = useRecoilValue(eventFactoryState);
  const tickets = useRecoilValue(newTicketsState);
  const newEvent = useRecoilValue(newEventState);
  const publishEvent = async () => {
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
        ...newEvent,
        cover_image_url: ipfsLink,
        starts_on: newEvent.start_date + " " + newEvent.start_time,
        ends_on: newEvent.end_date + " " + newEvent.end_time,
      };
      let freshTickets = [...tickets];
      console.log(freshTickets);
      freshTickets = freshTickets.forEach(
        (ticket) => (ticket.price = ethers.utils.parseEther(ticket.price.toString()))
      );
      console.log(freshTickets);
      await EventFactory.connect(web3.getSigner()).addEvent(event, freshTickets);
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
