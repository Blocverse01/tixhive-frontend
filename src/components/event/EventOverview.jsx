import moment from "moment";
import { convertBalanceToEther } from "utils/web3-utils";
import { Link } from "react-router-dom";
import OptionModal from "components/OptionModal";
import ClickToCopy from "components/ClickToCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEventOverview } from "hooks/data/events";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const eventOptions = ["Dashboard", "View Event", "Edit Event", "Copy URL"];

export default function EventOverview({ rawEvent }) {
  const { analytics: event, isLoading, error } = useEventOverview(rawEvent);
  if (error) {
    console.log(error);
  }
  return (
    <>
      {!event || isLoading ? (
        <div className="relative table-row">
          <div className="table-cell pr-4">
            <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
              <Skeleton height={90} width={"100%"} />
            </SkeletonTheme>
          </div>
          <div className="table-cell pr-4">
            <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
              <Skeleton height={90} width={"100%"} />
            </SkeletonTheme>
          </div>
          <div className="table-cell pr-4">
            <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
              <Skeleton height={90} width={"100%"} />
            </SkeletonTheme>
          </div>
          <div className="table-cell pr-4">
            <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
              <Skeleton height={90} width={"100%"} />
            </SkeletonTheme>
          </div>
          <div className="table-cell">
            <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
              <Skeleton height={90} width={"100%"} />
            </SkeletonTheme>
          </div>
        </div>
      ) : (
        <div className="relative table-row event">
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
          <div className="table-cell">
            <div className="flex items-center h-full">
              <div className="w-full">
                <h3 className="mb-[16px]">
                  {event.sales}/{event.totalTickets}
                </h3>
                <div className="max-w-[72px] h-2 mt-1 bg-white">
                  <div
                    className="h-2 bg-brand-red"
                    style={{
                      width: `${(event.sales / event.totalTickets) * 100}%`,
                      maxWidth: "100%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-cell">
            {convertBalanceToEther(event.amountSold)} MATIC
          </div>
          <div className="table-cell">
            {event.saleIsActive ? (
              <div className="flex items-center">
                <div className="h-[14px] w-[14px] rounded-full bg-brand-red"></div>
                <h3 className="ml-3">On-Sale</h3>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="h-[14px] w-[14px] rounded-full bg-slate-300"></div>
                <h3 className="ml-3">Sale-Closed</h3>
              </div>
            )}
          </div>
          <div className="table-cell p-[16.5px] md:p-[24px] lg:p-[32px] text-right">
            <OptionModal
              toggle={
                <FontAwesomeIcon
                  className="text-2xl md:text-3xl"
                  icon={solid("ellipsis-v")}
                />
              }
              options={eventOptions.map((option, index) => {
                switch (option) {
                  case "View Event":
                    return (
                      <Link
                        key={index}
                        className="py-[24px] px-[20px] md:px-[54px] text-center"
                        to={`/events/${event.contractAddress}`}
                      >
                        {option}
                      </Link>
                    );
                  case "Copy URL":
                    return (
                      <div
                        key={index}
                        className="py-[24px] px-[20px] md:px-[54px] text-center"
                      >
                        <ClickToCopy
                          buttonText={option}
                          text={`${window.location.origin}/events/${event.contractAddress}`}
                        />
                      </div>
                    );
                  default:
                    return (
                      <Link
                        key={index}
                        className="py-[24px] px-[20px] md:px-[54px] text-center"
                        to={`/event/${event.contractAddress}/${option
                          .replace(/[^a-zA-Z0-9]/g, "-")
                          .toLowerCase()}`}
                      >
                        {option}
                      </Link>
                    );
                }
              })}
            />
          </div>
        </div>
      )}
    </>
  );
}
