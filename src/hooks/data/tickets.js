import React from "react";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useRecoilValue } from "recoil";
import { eventListState } from "recoil/atoms/events";
import { useEventOverview } from "./events";
import { convertBalanceToEther } from "utils/web3-utils";

export function useMyEvents() {
    const events = useRecoilValue(eventListState);
    const { userNFTs, isLoading: loadingUserNFTs } = useGetUserNFTs();
    const [userEvents, setUserEvents] = React.useState(null);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!loadingUserNFTs) {
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
                const sortedEventsArray = Object.values(sortedEvents);
                setUserEvents(sortedEventsArray);
                return;
            }
            setUserEvents([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events, userNFTs]);
    React.useEffect(() => {
        if (userEvents && userEvents.length > 0) {
            setLoading(false)
            return;
        }
        if (userEvents && userEvents.length === 0) {
            setLoading(false)
            return;
        }
        if (!userEvents && loadingUserNFTs) {
            setLoading(true)
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const [isLoading, setLoading] = React.useState(true);
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
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInitialized]);
    return { userNFTs, isLoading };
}

export function useTicketInfo(event, purchaseId) {
    const [ticketInfo, setTicketInfo] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);
    const { eventSales } = useEventOverview(event);
    React.useEffect(() => {
        if (eventSales.length > 0 && purchaseId) {
            const ticket = eventSales.find((sale) => sale[0] === purchaseId);
            if (ticket) {
                setTicketInfo({
                    ...event.tickets[ticket[3]],
                    cost: `${convertBalanceToEther(ticket[4])} ${event.currency}`,
                    tokenId: ticket[2]
                });
            } else {
                setLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventSales]);
    React.useEffect(() => {
        if (ticketInfo) {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketInfo]);
    return { ticketInfo, isLoading };
}