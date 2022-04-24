import EventFactory from "contract-abis/EventFactory.json";

const eventFactoryAddress = process.env.REACT_APP_EVENT_FACTORY_CONTRACT_ADDRESS;

export const eventFactory = {
  abi: EventFactory.abi,
  contractAddress: eventFactoryAddress,
};
