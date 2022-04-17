import rectangle7 from "svgs/Rectangle-7.png";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { twitterIcon, faceBookIcon, whatsappIcon, telegramIcon, instagramIcon } from "svgs/social-icons";
import map from "svgs/unsplash_Uk3t05ndSng.png";
import EventsList from "components/EventsList";
import { eventsState } from "recoil/atoms/events"
import { useRecoilValue } from "recoil"

export default function EventDisplay() {
  const events = useRecoilValue(eventsState);
  const event = {
    cover_image_url: "https://ipfs.moralis.io:2053/ipfs/QmXeDQ9Q4sjhjtFs2ErDc2oBzyCdpEa53kUFvH1zFWhsfJ",
    name: "Abakaliki BlocSummit",
    host_name: "Blocverse",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lobortis sed sed mauris est. Malesuada vitae faucibus facilisi pulvinar lacus scelerisque. Sit pharetra adipiscing sollicitudin in mi. At sit odio non consequat. Eu diam pellentesque ipsum adipiscing diam vitae, egestas. Arcu aliquam, convallis tellus blandit. Nullam at et mattis mauris, nisl cursus dolor. Porta vel gravida porttitor id vestibulum, quisque maecenas tristique vel. Lacus, sodales non nisi tellus habitant turpis et pulvinar.",
    starts_on: "2022-08-25 09:40:00",
    ends_on: "2022-08-27 12:40:00",
    leastTicketCost: 20,
    venue: "No. 2383 Mile 50, Along Enugu-Abakaliki Express Road",
  };
  const eventStartDate = moment(event.starts_on);
  const aboutEvent = (
    <div>
      <h3 className="font-medium text-[12.4px] leading-[18.6px] md:text-[18px] md:leading-[25px] lg:text-[24.75px] lg:leading-[37.13px]">
        About the Event
      </h3>
      <p className="text-[9.02px] mt-[7.54px] leading-[13.52px] md:text-[14px] md:leading-[23px] lg:text-[18px] lg:leading-[27px]">
        {event.description}
      </p>
    </div>
  );

  return (
    <section className="py-[38px] lg:px-20 lg:py-[65px]">
      <div className="relative z-0">
        <img
          src={rectangle7}
          alt="rectangle"
          className="lg:top-0 z-[-1] bottom-0 lg:bottom-auto absolute right-0 left-0"
        />
        <div className="z-50 px-[28px] pb-[28px] pt-[12px] md:pb-[54px] md:px-[54px] md:pt-[20px] lg:p-[45px] lg:gap-[45px] grid lg:grid-cols-2">
          <div className="relative">
            <img src={event.cover_image_url} className="lg:h-full lg:object-cover w-full" alt={event.name} />
            <div className="absolute inset-0 p-[12px] md:p-[20px] flex items-end event-image-gradient">
              <div className="text-white lg:hidden">
                <h3 className="text-[15.86px] font-medium leading-[23.79px] md:text-[33px] md:leading-[41px]">
                  {event.name}
                </h3>
                <h4 className="text-[7.93px] md:text-[20px] md:leading-[23px] leading-[11.9px]">
                  by {event.host_name}
                </h4>
              </div>
            </div>
          </div>
          <div>
            <div className="hidden lg:block text-white mb-[27px]">
              <h3 className="lg:text-[33px] xl:text-[44px] font-medium lg:leading-[50px] xl:leading-[74.26px]">{event.name}</h3>
              <h4 className="lg:text-[20px] xl:text-[24.75px] leading-[37.13px]">by {event.host_name}</h4>
            </div>
            <div className="w-[217.75px] md:w-[65%] lg:static h-[47.37px] absolute right-0 left-0 -bottom-[34px] md:-bottom-[61px] px-[16px] md:px-[25px] md:py-[15px] lg:px-[47px] lg:py-[23px] py-[8.5px] flex items-center justify-between bg-brand-eventDate text-white mx-auto lg:w-full font-medium md:h-[90px] lg:h-[131px] lg:-mt-[27px] lg:mx-0">
              <div>
                <h3 className="text-[8.17px] md:text-[18px] lg:text-[22.59px] md:leading-[33.88px] leading-[12.25px]">
                  {eventStartDate.format("MMM")}
                </h3>
                <h3 className="text-[14.37px] md:text-[28px] lg:text-[39.75px] md:leading-[59.63px] leading-[21.56px]">
                  {eventStartDate.format("DD")}
                </h3>
              </div>
              <div>
                <h3 className="text-[10.69px] md:text-[20px] lg:text-[29.57px] md:leading-[44.35px] leading-[16.04px]">
                  {eventStartDate.format("dddd")}
                </h3>
                <h3 className="text-[8.76px] leading-[13.14px] md:text-[16px] lg:text-[24.23px] md:leading-[36.34px]">
                  {eventStartDate.format("HH:mm a")}
                </h3>
              </div>
              <FontAwesomeIcon className="text-lg md:text-3xl lg:text-4xl" icon={regular("heart")} />
            </div>
            <div className="hidden lg:block text-white mt-[75px]">{aboutEvent}</div>
          </div>
        </div>
      </div>
      <div className="mt-[75px] md:mt-[140px] lg:hidden px-[28px] pb-[28px] md:px-[54px] text-white">{aboutEvent}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 px-[28px] md:px-[54px] lg:px-[45px] mt-[24.54px] gap-[45px]">
        <div className="order-2 lg:order-1">
          <h3 className="text-[9.26px] leading-[13.89px] md:text-[13px] md:leading-[13.89px] lg:text-[18px] lg:leading-[27px]">
            Share Event
          </h3>
          <div className="flex mt-[7.12px] gap-[9.27px] md:gap-[21px] md:mt-[8px]">
            <img src={faceBookIcon} className="social-icon" alt="facebookicon" />
            <img src={whatsappIcon} className="social-icon" alt="whatsappicon" />
            <img src={telegramIcon} className="social-icon" alt="telegramIcon" />
            <img src={instagramIcon} className="social-icon" alt="instagramIcon" />
            <img src={twitterIcon} className="social-icon" alt="twitterIcon" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <h3 className="text-[9.02px] lg:text-[18px] leading-[13.52px] md:text-[14px] md:leading-[23px] lg:leading-[27px]">
                Price
              </h3>
              <h3 className="text-[20.03px] leading-[30.05px] md:text-[28px] md:leading-[37px] font-medium lg:text-[40px] lg:leading-[60px]">
                ${event.leastTicketCost}
              </h3>
            </div>
            <div className="">
              <button className="btn">Get a Ticket</button>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-[28.2px] px-[28px] md:px-[54px] lg:px-[45px] lg:mt-[121px]">
        <h3 className="text-[8px] text-center text-white leading-[12px] md:text-[14px] md:leading-[18px] lg:text-[30px] lg:leading-[45px]">
          {event.venue}
        </h3>
        <img src={map} className="w-full mt-5" alt="map" />
      </section>
      <section className="mt-[28.2px] px-[28px] md:px-[54px] lg:px-[45px] lg:mt-[121px]">
        <h3 className="text-[8px] text-center text-white leading-[12px] md:text-[14px] md:leading-[18px] lg:text-[30px] lg:leading-[45px]">
          Events You May Like
        </h3>
        <div className="mt-5">
          <EventsList events={events} />
        </div>
      </section>
    </section>
  );
}
