import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { eventListState } from "../recoil/atoms/events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";
import TicketAuthenticationCard from "./TicketAuthenticationCard";
import { useMoralis } from "react-moralis";

export default function TicketInfoPage() {
  const { contract, purchase } = useParams();
  const eventList = useRecoilValue(eventListState);
  const [event, setEvent] = useState(null);
  const { isInitialized } = useMoralis();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let eventOnMoralis;
    if (eventList.length > 0) {
      eventOnMoralis = eventList.find((e) => e.contractAddress.toLowerCase() === contract.toLowerCase());
      if (!eventOnMoralis) {
        setLoading(false);
      }
      setEvent(eventOnMoralis);
      return;
    }
    if (eventList.length === 0 && isInitialized) {
      setLoading(false);
    }
    if (!eventOnMoralis && isInitialized) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventList]);
  useEffect(() => {
    if (event) {
      setLoading(false);
    }
  }, [event]);
  return (
    <section className="page">
      <div className="page-wrapper">
        <h3 className="page-title">Ticket Authentication</h3>
        <div>
          {loading ? (
            <div className="empty-events">
              <FontAwesomeIcon icon={solid("spinner")} className="mr-4" spin /> Loading Ticket Info.
            </div>
          ) : (
            <div>
              {event && <TicketAuthenticationCard event={event} purchase={purchase} />}
              {!event && (
                <div className="empty-events">
                  <FontAwesomeIcon icon={solid("exclamation-triangle")} className="mr-4" /> No event info found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
