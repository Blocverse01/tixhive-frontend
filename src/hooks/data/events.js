import useDataFromContractFunction from "hooks/useDataFromContractFunction";
import { useRecoilValue } from "recoil";
import { eventCategoriesState, eventListState, filteredEventListState } from "recoil/atoms/events";
import EVENT from "contract-abis/Event.json";
import React from "react";

export function useEventCategories() {
    const eventCategories = useRecoilValue(eventCategoriesState);
    return eventCategories;
}

export function useRawEvents() {
    const events = useRecoilValue(eventListState);
    return events;
}

<<<<<<< HEAD
export function useEventOverview(event) {
=======
export function useEventAnalytics(event) {
>>>>>>> c37613bf702df385de6862bba6e7708c812b193b
    const [analytics, setAnalytics] = React.useState(null)
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
    return { analytics, isLoading, error };
}

export function useEventList() {
    const events = useRecoilValue(filteredEventListState);
    return events;
}
