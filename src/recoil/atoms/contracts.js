import { atom } from "recoil";
import EventFactory from "contract-abis/EventFactory.json";

const eventFactoryAddress = process.env.REACT_APP_EVENT_FACTORY_ADDRESS;

export const eventFactoryState = atom({
  key: "eventFactoryState",
  default: {
    abi: EventFactory.abi,
    deployedAddress: eventFactoryAddress,
  },
});
