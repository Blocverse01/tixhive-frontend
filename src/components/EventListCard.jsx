import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";

export default function EventListCard({ event }) {
  const startDate = moment(event.starts_on);
  return (
    <div>
      <div className="relative">
        <img
          src={event.cover_image_url}
          alt="cover"
          className="w-full h-[127.55px] sm:h-[195px] object-cover"
        />
        <div className="absolute bg-black bg-opacity-30 py-1 px-2 top-[17px] right-[17px]">
          <FontAwesomeIcon
            icon={regular("heart")}
            className="text-2xl text-white cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-event-gradient text-white py-[24px] px-[14px] sm:px-[20px]">
        <div className="flex justify-end">
          <div className="bg-brand-black z-10 text-[19px] leading-[28.92px] py-1 h-[36.81px] px-3 text-white -mr-[3px] -mt-[44px]">
            {event.leastTicketCost} MATIC
          </div>
        </div>
        <h3 className="text-[13px] line-clamp-1 sm:text-[18px] leading-[28.92px] font-[500]">
          {event.name}
        </h3>
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
