import { atom } from "recoil";
import EventFactory from "contract-abis/EventFactory.json";
import { contractWithProvider } from "utils/web3-utils";

const eventFactoryAddress = process.env.REACT_APP_EVENT_FACTORY_ADDRESS;
export const contracts = atom({
  key: "contracts",
  default: {
    eventFactory: {
      abi: EventFactory.abi,
      deployedAddress: eventFactoryAddress,
    },
    provider: null,
  },
});

export const updateContract = async (contracts, setContracts, key) => {
  const [Contract, provider] = await contractWithProvider(
    contracts[key].deployedAddress,
    contracts[key].abi
  );
  setContracts((prev) => ({
    ...prev,
    [key]: Contract,
    provider: contracts.provider ? contracts.provider : provider,
  }));
};
