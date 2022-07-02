import React from "react";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useRecoilValue } from "recoil";
import { eventListState } from "recoil/atoms/events";
import { useEventOverview } from "./events";
import { convertBalanceToEther } from "utils/web3-utils";

export function useMyEvents() {
    const events = useRecoilValue(eventListState);
    const userNFTs = useGetUserNFTs();
    const [userEvents, setUserEvents] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (events && userNFTs) {
            setLoading(true);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events, userNFTs]);
    React.useEffect(() => {
        if (userEvents.length > 0) {
            setLoading(false)
        }
    }, [userEvents]);
    return { userEvents, isLoading };
}

export function useGetUserNFTs(address = null) {
    const { isInitialized } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    const [userNFTs, setUserNFTs] = React.useState([]);
    const options = {
        chain: process.env.REACT_APP_NET_ID,
        address: address
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

export function useTicketInfo(event, purchaseId) {
    const [ticketInfo, setTicketInfo] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);
    const { eventSales } = useEventOverview(event);
    React.useEffect(() => {
        if (eventSales && purchaseId) {
            const ticket = eventSales.find((sale) => sale[0] === purchaseId);
            if (ticket) {
                setTicketInfo({
                    ...event.tickets[ticket[3]],
                    cost: `${convertBalanceToEther(ticket[4])} ${event.currency}`,
                    tokenId: ticket[2]
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventSales]);
    React.useEffect(() => {
        if (ticketInfo) {
            setLoading(false)
        }
    }, [ticketInfo]);
    return { ticketInfo, isLoading };
}