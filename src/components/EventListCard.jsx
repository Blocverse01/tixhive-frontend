import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import { Link } from "react-router-dom";

export default function EventListCard({ event }) {
  const startDate = moment(event.starts_on);
  return (
    <div>
      <div className="relative">
        <img
          src={event.cover_image_url}
          alt="cover"
          className="w-full h-[127.55px] sm:h-[195px] lg:h-[164.73px] object-cover"
        />
        <div className="EventListCard__ctas">
          <div>
            <div className="bg-brand-black py-1 h-[24.85px] px-3 rounded-[4.73px]">
              {event.leastTicketCost} MATIC
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-black mr-4 h-[23.37px] cursor-pointer flex items-center justify-center w-[23.37px] rounded-full">
              <FontAwesomeIcon icon={regular("heart")} className="text-white" />
            </div>
            <div className="bg-black h-[23.37px] cursor-pointer flex items-center justify-center w-[23.37px] rounded-full">
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.878906 8.09093L1.1938 9.351C1.24864 9.5704 1.37524 9.76518 1.55348 9.90437C1.73172 10.0436 1.95137 10.1192 2.17751 10.1192H9.72171C9.94786 10.1192 10.1675 10.0436 10.3457 9.90437C10.524 9.76518 10.6506 9.5704 10.7054 9.351L11.0203 8.09093M5.94961 0.991943V7.07679V0.991943ZM5.94961 0.991943L3.92133 3.02023L5.94961 0.991943ZM5.94961 0.991943L7.9779 3.02023L5.94961 0.991943Z"
                  stroke="white"
                  strokeWidth="1.01414"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-event-gradient text-white py-[24px] px-[14px] sm:px-[20px]">
        <Link className="underline" to={`/events/${event.contractAddress}`}>
          <h3 className="text-[13px] line-clamp-1 sm:text-[18px] leading-[28.92px] font-[500]">
            {event.name}
          </h3>
        </Link>
        <p className="text-[11px] leading-[23.66px] line-clamp-2 font-[500]">
          {`${startDate.format("ddd, MMM DD YYYY, h:mm A")}  ${
            String(startDate.local()._d).split(" ")[5]
          } ${event.venue}`}
        </p>
        <h3 className="text-[11px] leading-[23.66px] font-medium line-clamp-1">
          Host: {event.host_name}
        </h3>
      </div>
    </div>
  );
}
