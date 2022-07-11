import useDataFromContractFunction from "hooks/useDataFromContractFunction";
import { useRecoilValue } from "recoil";
import { eventCategoriesState, eventListState, filteredEventListState } from "recoil/atoms/events";
import EVENT from "contract-abis/Event.json";
import React from "react";
import { convertBalanceToEther } from "utils/web3-utils";

export function useEventCategories() {
    const eventCategories = useRecoilValue(eventCategoriesState);
    return eventCategories;
}

export function useRawEvents() {
    const events = useRecoilValue(eventListState);
    return events;
}

export function useEventOverview(event) {
    const [analytics, setAnalytics] = React.useState(null)
    const [eventSales, setEventSales] = React.useState([]);
    const options = {
        chain: process.env.REACT_APP_NET_ID,
        address: event.contractAddress,
        function_name: "getInfo",
        abi: EVENT
    };
    const { data, load, isLoading, error } = useDataFromContractFunction();
    React.useEffect(() => {
        load(options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event])
    React.useEffect(() => {
        if (data) {
            const [totalSold, sales] = [data["0"], data["1"]];
            setEventSales(sales);
            const totalTickets = event.tickets.map((ticket) => ticket.quantity_available).reduce((a, b) => a + b, 0);
            setAnalytics({
                ...event,
                totalTickets: totalTickets,
                sales: sales.length,
                amountSold: totalSold.toString(),
            });
            console.log("analytics set");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return { analytics, isLoading, error, eventSales };
}

export function useUnwrapTickets(event, nfts) {
    const { eventSales } = useEventOverview(event);
    const [unwrappedTickets, setUnwrappedTickets] = React.useState([]);
    React.useEffect(() => {
        if (eventSales.length > 0) {
            const yourPurchases = eventSales.filter((sale) => nfts.map((nft) => nft.token_id).includes(sale[2]));
            setUnwrappedTickets(yourPurchases.map((sale) => ({
                tokenId: sale[2],
                name: event.tickets[sale[3]].name,
                cost: `${convertBalanceToEther(sale[3])} ${event.currency}`,
                image: (JSON.parse((nfts.find((nft) => nft.token_id === sale[2])).metadata))?.image,
            })));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventSales]);
    return unwrappedTickets;
}

export function useEventList() {
    const events = useRecoilValue(filteredEventListState);
    return events;
}
