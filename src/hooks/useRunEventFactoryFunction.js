import { useMoralis } from "react-moralis";
import { eventFactory } from "data/contracts";

export const useRunEventFactoryFunction = () => {
    const { Moralis } = useMoralis();
    const run = async (options) => {
        const sendOptions = {
            contractAddress: eventFactory.contractAddress,
            abi: eventFactory.abi,
            ...options
        };
        return await Moralis.executeFunction(sendOptions);
    }
    return {
        run,
    }
}