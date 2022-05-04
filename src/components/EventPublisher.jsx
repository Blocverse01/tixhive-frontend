import { eventFactory } from "data/contracts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useRecoilState, useRecoilValue } from "recoil";
import { newEventState } from "recoil/atoms/newEvent";
import { eventsState } from "recoil/atoms/events";
import { useMoralisFile, useMoralis } from "react-moralis";
import { newTicketsState } from "recoil/atoms/newTickets";
import Swal from "sweetalert2";
import { enableContract } from "utils/web3-utils";
import {
  getTicker,
  parseTicketsPriceToEther,
  saveToMoralis,
} from "utils/create-event";
import { leastTicketPriceState } from "recoil/atoms/newTickets";
import { useState } from "react";
import ProgressTracker from "./ProgressTracker";

export default function EventPublisher() {
  const { user, web3, Moralis } = useMoralis();
  const { saveFile } = useMoralisFile();
  const [publishingState, setPublishingState] = useState(-1);
  const tickets = useRecoilValue(newTicketsState);
  const newEvent = useRecoilValue(newEventState);
  const leastTicketCost = useRecoilValue(leastTicketPriceState);
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useRecoilState(eventsState);
  const processes = [
    "Uploading Cover Photo",
    "Creating NFT Contract",
    `Saving ${newEvent.name}`,
  ];

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
      const EventFactory = await enableContract(
        eventFactory.contractAddress,
        eventFactory.abi,
        web3
      );
      const file = newEvent.cover_image;
      if (!file && !(file instanceof File)) {
        Swal.fire({
          title: "Invalid Image!",
          text: "Please select a valid Event Cover Image to continue!",
          icon: "error",
        });
        return;
      }
      setPublishingState(0);
      const cover_image = await saveFile(
        file.name.replace(/[^a-zA-Z0-9]/g, "_"),
        file,
        {
          saveIPFS: true,
          throwOnError: true,
        }
      );
      setPublishingState(1);
      const transaction = await EventFactory.connect(web3.getSigner()).addEvent(
        newEvent.name,
        getTicker(newEvent.name),
        parseTicketsPriceToEther(tickets)
      );
      const receipt = await transaction.wait();
      const eventContractAddress = receipt.events[0].args.contractAddress;
      setPublishingState(2);
      const eventOnMoralis = await saveToMoralis(
        newEvent,
        eventContractAddress,
        cover_image,
        leastTicketCost,
        tickets
      );
      eventOnMoralis.set("owner", user.get("ethAddress"));
      await eventOnMoralis.save();
      setPublishingState(3);
      setTimeout(() => {
        setPublishingState(-1);
        Swal.fire({
          title: "Success!",
          text: `${newEvent.name} has been published successfully`,
          icon: "success",
        });
      }, 1000);
      const query = new Moralis.Query("Event");
      query.descending("createdAt").equalTo("owner", user?.get("ethAddress"));
      query
        .find()
        .then((events) => {
          setEvents(
            events.map((eventObject) => {
              return {
                ...eventObject.attributes,
              };
            })
          );
        })
        .catch((err) => console.log(err));
      return true;
    } catch (err) {
      setPublishingState(-1);
      console.error(err);
    }
  };

  return (
    <div>
      {publishingState >= 0 ? (
        <ProgressTracker
          title={`Publishing ${newEvent.name}`}
          state={publishingState}
          processes={processes}
        />
      ) : (
        ""
      )}
      <button
        disabled={publishingState >= 0}
        onClick={async () => {
          await publishEvent();
        }}
        className="bg-brand-red disabled:bg-brand-black h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
      >
        Publish Now{" "}
        <FontAwesomeIcon className="ml-2" icon={solid("chevron-right")} />
      </button>
    </div>
  );
}
