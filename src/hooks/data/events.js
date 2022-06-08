import { useRecoilValue } from "recoil";
import { eventCategoriesState, filteredEventListState } from "recoil/atoms/events";

export function useEventCategories() {
    const eventCategories = useRecoilValue(eventCategoriesState);
    return eventCategories;
}

export function useEventList() {
    const events = useRecoilValue(filteredEventListState);
    return events;
}
