import React from "react";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useRecoilValue } from "recoil";
import { eventListState } from "recoil/atoms/events";

export function useMyEvents() {
    const events = useRecoilValue(eventListState);
    const userNFTs = useGetUserNFTs();
    const [userEvents, setUserEvents] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (events && userNFTs) {
            let sortedEvents = {};
            userNFTs.forEach((nft) => {
                const event = events.find((event) => event.contractAddress.toLowerCase() === nft.token_address.toLowerCase());
                if (event) {
                    if (!sortedEvents[event.contractAddress]) {
                        sortedEvents[event.contractAddress] = event;
                    }
                    (typeof sortedEvents[event.contractAddress]?.nfts === 'object') ? sortedEvents[event.contractAddress].nfts.push(nft) : sortedEvents[event.contractAddress] = { ...sortedEvents[event.contractAddress], nfts: [nft] };
                }
            });
            setUserEvents(Object.values(sortedEvents));
        }
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events, userNFTs])
    return { userEvents, isLoading };
}

export function useGetUserNFTs() {
    const { isInitialized } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const [userNFTs, setUserNFTs] = React.useState([]);
    const options = {
        chain: process.env.REACT_APP_NET_ID,
    };
    const fetchUserNFTs = async () => {
        try {
            let query = await Web3Api.account.getNFTs(options);
            setUserNFTs(query?.result);
        } catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        if (isInitialized) {
            fetchUserNFTs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInitialized]);
    return userNFTs;
}