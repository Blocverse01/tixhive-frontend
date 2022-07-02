import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

export default function useDataFromContractFunction() {
    const { native } = useMoralisWeb3Api();
    const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
        native.runContractFunction);
    const load = (options) => {
        fetch({ params: options });
    }
    return {
        load, data, error, isLoading,
    }
}