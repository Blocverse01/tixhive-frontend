import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTicketInfo } from "hooks/data/tickets";
import NFTOwner from "./NFTOwner";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import DisplayTicketImage from "./ticket/DisplayTicket";

export default function TicketAuthenticationCard({ event, purchase }) {
  const { ticketInfo, isLoading: loadingTicketInfo } = useTicketInfo(event, purchase);
  const { user, isAuthenticated } = useMoralis();

  return (
    <div>
      {loadingTicketInfo ? (
        <div>
          <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
            <Skeleton count={1} height={120} width={"100%"} />
          </SkeletonTheme>
        </div>
      ) : (
        <div>
          {ticketInfo && (
            <div>
              <section>
                <div className="overflow-x-auto">
                  <div className="table w-full text-left text-white table-fixed events-table">
                    <div className="table-header-group">
                      <div className="table-row">
                        <div className="w-48 events-header-text">Event Details</div>
                        <div className="w-32 events-header-text">Ticket Fee</div>
                        <div className="events-header-text w-44">Ticket Type</div>
                        <div className="w-24 events-header-text">Token ID</div>
                      </div>
                    </div>
                    <div className="relative table-row rounded-md event">
                      <div className="table-cell p-[16.5px] md:p-[24px] lg:p-[32px] text-left">
                        <div className="flex items-center">
                          <div className="hidden md:block">
                            <h3 className="event-month">{moment(event.starts_on).format("MMM")}</h3>
                            <h3 className="event-day">{moment(event.starts_on).format("DD")}</h3>
                          </div>
                          <div className="md:pl-[60px]">
                            <h3 className="event-title">{event.name}</h3>
                            <h3 className="event-start-date">{moment(event.starts_on).format("DD MMM hh:mm A")}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="table-cell px-2">
                        <div className="flex items-center">{ticketInfo.cost}</div>
                      </div>
                      <div className="table-cell px-4">
                        <div className="flex items-center">{ticketInfo.name}</div>
                      </div>
                      <div className="table-cell">
                        <div className="flex items-center justify-center">#{ticketInfo.tokenId}</div>
                      </div>
                      {isAuthenticated && user.get("ethAddress") === event.contractAddress && (
                        <div className="table-cell p-[16.5px] md:p-[24px] lg:p-[32px]">
                          <div className="flex items-center justify-end h-full">
                            <button className="btn">Check In</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-5 md:flex-row md:mt-7">
                  <div className="mb-5 md:mr-7 md:mb-0">
                    <NFTOwner token_id={ticketInfo.tokenId} contract={event.contractAddress} />
                  </div>
                  <div className="mb-5 md:mr-7 md:mb-0">
                    <a
                      className="open-sea-btn"
                      target="__blank"
                      rel="noreferrer"
                      href={`https://opensea.io/assets/matic/${event.contractAddress}/${ticketInfo.tokenId}`}
                    >
                      View Ticket on OpenSea
                    </a>
                  </div>
                  <div>
                    <Link className="open-sea-btn" to={`/events/${event.contractAddress}`}>
                      View Event for ticket
                    </Link>
                  </div>
                </div>
                <div className="mt-5 md:mt-7 max-w-7xl mx-auto">
                  <DisplayTicketImage contractAddress={event.contractAddress} token_id={ticketInfo.tokenId} />
                </div>
              </section>
            </div>
          )}
          {!ticketInfo && (
            <div className="empty-events">
              <FontAwesomeIcon icon={solid("exclamation-triangle")} className="mr-4" /> No ticket info found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
