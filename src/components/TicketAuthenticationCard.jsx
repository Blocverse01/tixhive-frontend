import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTicketInfo } from "hooks/data/tickets";
import NFTOwner from "./NFTOwner";
import { useMoralis } from "react-moralis";

export default function TicketAuthenticationCard({ event, purchase }) {
  const { ticketInfo, isLoading: loadingTicketInfo } = useTicketInfo(
    event,
    purchase
  );
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
                <div className="table w-full text-left text-white table-auto events-table">
                  <div className="table-header-group">
                    <div className="table-row">
                      <div className="events-header-text">Event Details</div>
                      <div className="events-header-text">Ticket Fee</div>
                      <div className="events-header-text">Ticket Type</div>
                      <div className="events-header-text">Token ID</div>
                    </div>
                  </div>
                  <div className="table-row relative event">
                    <div className="table-cell p-[16.5px] md:p-[24px] lg:p-[32px] text-left">
                      <div className="flex items-center">
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
                    <div className="table-cell pr-4">
                      <div className="flex items-center">{ticketInfo.cost}</div>
                    </div>
                    <div className="table-cell pr-4">
                      <div className="flex items-center">{ticketInfo.name}</div>
                    </div>
                    <div className="table-cell pr-4">
                      <div className="flex justify-center items-center">
                        #{ticketInfo.tokenId}
                      </div>
                    </div>
                    {isAuthenticated &&
                      user.get("ethAddress") === event.contractAddress && (
                        <div className="table-cell p-[16.5px] md:p-[24px] lg:p-[32px]">
                          <div className="flex items-center h-full justify-end">
                            <button className="btn">Check In</button>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <div className="mr-7">
                    <NFTOwner
                      token_id={ticketInfo.tokenId}
                      contract={event.contractAddress}
                    />
                  </div>
                  <div>
                    <a
                      className="btn bg-transparent text-brand-red  border hover:bg-gray-800"
                      target="__blank"
                      rel="noreferrer"
                      href={`https://opensea.io/assets/matic/${event.contractAddress}/${ticketInfo.tokenId}`}
                    >
                      View on OpenSea
                    </a>
                  </div>
                </div>
              </section>
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
