import React from "react"
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export default function useReadNFTData(contractAddress, token_id) {
    const { isInitialized } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const [data, setData] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);
    const options = {
        address: contractAddress,
        token_id: `${token_id}`,
        chain: process.env.REACT_APP_NET_ID,
    };
    const fetchData = async () => {
        try {
            let metadata = await Web3Api.token.getTokenIdMetadata(options);
            setData(metadata);
        } catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        if (isInitialized) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInitialized]);
    React.useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data]);
    return { data, isLoading };
}