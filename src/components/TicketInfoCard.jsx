import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTicketInfo } from "hooks/data/tickets";
import NFTOwner from "./NFTOwner";

export default function TicketInfoCard({ event, purchase }) {
  const { ticketInfo, isLoading: loadingTicketInfo } = useTicketInfo(
    event,
    purchase
  );
  return (
    <div>
      {loadingTicketInfo ? (
        <div>
          <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
            <Skeleton count={2} height={120} width={"100%"} />
          </SkeletonTheme>
        </div>
      ) : (
        <div>
          {ticketInfo && (
            <div className={"text-white grid grid-cols-1 gap-5"}>
              <div className={"bg-event-gradient"}>
                <div
                  className={
                    "border-b px-5 flex justify-between items-center pt-3 border-slate-300 pb-3"
                  }
                >
                  <h3 className={"font-semibold"}>Event</h3>
                  <Link
                    to={`/events/${event.contractAddress}`}
                    className={"py-1 bg-black-gradient px-2"}
                  >
                    <FontAwesomeIcon
                      icon={solid("eye")}
                      className={"md:hidden"}
                    />
                    <span className={"hidden md:block"}>Check Event</span>
                  </Link>
                </div>
                <div className="flex items-center p-5">
                  <div className="hidden md:block">
                    <h3 className="event-month">
                      {moment(event.starts_on).format("MMM")}
                    </h3>
                    <h3 className="event-day">
                      {moment(event.starts_on).format("DD")}
                    </h3>
                  </div>
                  <div className="md:pl-[60px]">
                    <h3 className="event-title">{event.name}</h3>
                    <h3 className="event-start-date">
                      {moment(event.starts_on).format("DD MMM hh:mm A")}
                    </h3>
                  </div>
                </div>
              </div>
              <div className={"bg-event-gradient"}>
                <div
                  className={
                    "border-b px-5 flex justify-between items-center pt-3 border-slate-300 pb-3"
                  }
                >
                  <h3 className={"font-semibold"}>Ticket</h3>
                </div>
                <div>
                  <div
                    className={"grid-cols-3 text-center grid border-slate-300"}
                  >
                    <div className={"p-3 border-b"}>Token ID</div>
                    <div className={"p-3 border-b"}>Name</div>
                    <div className={"p-3 border-b"}>Cost</div>
                    <div className={"p-3"}>{ticketInfo.tokenId}</div>
                    <div className={"p-3 truncate"}>{ticketInfo.name}</div>
                    <div className={"p-3"}>{ticketInfo.cost}</div>
                    <div className={"p-3 col-span-3 border-t"}>
                      <NFTOwner
                        token_id={ticketInfo.tokenId}
                        contract={event.contractAddress}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!ticketInfo && (
            <div className="empty-events">
              <FontAwesomeIcon
                icon={solid("exclamation-triangle")}
                className="mr-4"
              />{" "}
              No ticket info found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
