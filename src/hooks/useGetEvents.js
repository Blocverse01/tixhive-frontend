import { useRecoilValue } from "recoil";
import { eventsState } from "recoil/atoms/events";

export default function useGetEvents() {
    const events = useRecoilValue(eventsState);
    return { events }
}