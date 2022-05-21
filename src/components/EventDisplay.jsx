import rectangle7 from "svgs/Rectangle-7.png";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  twitterIcon,
  faceBookIcon,
  whatsappIcon,
  telegramIcon,
  instagramIcon,
} from "svgs/social-icons";
import map from "svgs/unsplash_Uk3t05ndSng.png";
import EventsList from "components/EventsList";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { eventsState } from "recoil/atoms/events";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MintTickets from "./MintTickets";
//import MetaTags from "react-meta-tags";
import { Helmet } from "react-helmet";

export default function EventDisplay() {
  // eslint-disable-next-line no-unused-vars
  const [bodyScroll, setBodyScroll] = useState(true);
  const { contract } = useParams();
  const events = useRecoilValue(eventsState);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    setEvent(events.find((event) => event.contractAddress === contract));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, contract]);

  const eventStartDate = event ? moment(event.starts_on) : null;
  const aboutEvent = (
    <div>
      <h3 className="font-medium text-[12.4px] leading-[18.6px] md:text-[18px] md:leading-[25px] lg:text-[24.75px] lg:leading-[37.13px]">
        About the Event
      </h3>
      <p className="text-[9.02px] mt-[7.54px] leading-[13.52px] md:text-[14px] md:leading-[23px] lg:text-[18px] lg:leading-[27px]">
        {event?.description || (
          <SkeletonTheme baseColor="black" highlightColor="#374151">
            <Skeleton count={6} />
          </SkeletonTheme>
        )}
      </p>
    </div>
  );

  return (
    <section className={`py-[38px] lg:px-20 lg:py-[65px]`}>
      <Helmet id={"event-display"}>
        <title>BlocTix Event - {event ? event.name : "Loading"}</title>
        <meta
          name="description"
          content={event ? event.description : "Loading"}
        />
        <meta
          property="og:url"
          content={`https://www.bloctix.com/events/${contract}`}
        />
        <meta
          property="og:title"
          content={`BlocTix Event - ${event ? event.name : "Loading"}`}
        />
        <meta property="og:image" content={event?.cover_image_url} />
        <meta
          property="og:description"
          content={event ? event.description : "Loading"}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://www.bloctix.com/events/${contract}`}
        />
        />
        <meta
          property="twitter:title"
          content={`BlocTix Event - ${event ? event.name : "Loading"}`}
        />
        <meta
          property="twitter:description"
          content={event ? event.description : "Loading"}
        />
        <meta property="twitter:image" content={event?.cover_image_url} />
      </Helmet>
      <div className="relative z-0">
        <img
          src={rectangle7}
          alt="rectangle"
          className="lg:top-0 z-[-1] bottom-0 lg:bottom-auto absolute right-0 left-0"
        />
        <div className="z-50 px-[28px] pb-[28px] pt-[12px] md:pb-[54px] md:px-[54px] md:pt-[20px] lg:p-[45px] lg:gap-[45px] grid lg:grid-cols-2">
          <div className="relative">
            {event ? (
              <img
                src={event.cover_image_url}
                className="w-full lg:h-full lg:object-cover"
                alt={event.name}
              />
            ) : (
              <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
                <Skeleton height="100%" />
              </SkeletonTheme>
            )}
            <div className="absolute inset-0 p-[12px] md:p-[20px] flex items-end event-image-gradient">
              <div className="text-white lg:hidden">
                <h3 className="text-[15.86px] font-medium leading-[23.79px] md:text-[33px] md:leading-[41px]">
                  {event?.name || <Skeleton />}
                </h3>
                <h4 className="text-[7.93px] md:text-[20px] md:leading-[23px] leading-[11.9px]">
                  {event ? `by ${event.host_name}` : <Skeleton />}
                </h4>
              </div>
            </div>
          </div>
          <div>
            <div className="hidden lg:block text-white mb-[27px]">
              <h3 className="lg:text-[33px] font-medium lg:leading-[50px]">
                {event?.name || (
                  <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
                    <Skeleton />
                  </SkeletonTheme>
                )}
              </h3>
              <h4 className="lg:text-[20px] xl:text-[24.75px] leading-[37.13px]">
                {event ? (
                  `by ${event.host_name}`
                ) : (
                  <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
                    <Skeleton />
                  </SkeletonTheme>
                )}
              </h4>
            </div>
            <div className="w-[217.75px] md:w-[65%] lg:static h-[47.37px] absolute right-0 left-0 -bottom-[34px] md:-bottom-[61px] px-[16px] md:px-[25px] md:py-[15px] lg:px-[47px] lg:py-[23px] py-[8.5px] flex items-center justify-between bg-brand-eventDate text-white mx-auto lg:w-auto font-medium md:h-[90px] lg:h-[131px] lg:-mt-[0] lg:mx-0">
              <div>
                <h3 className="text-[8.17px] md:text-[18px] lg:text-[22.59px] md:leading-[33.88px] leading-[12.25px]">
                  {eventStartDate?.format("MMM") || <Skeleton />}
                </h3>
                <h3 className="text-[14.37px] md:text-[28px] lg:text-[39.75px] md:leading-[59.63px] leading-[21.56px]">
                  {eventStartDate?.format("DD") || <Skeleton />}
                </h3>
              </div>
              <div>
                <h3 className="text-[10.69px] md:text-[20px] lg:text-[29.57px] md:leading-[44.35px] leading-[16.04px]">
                  {eventStartDate?.format("dddd") || <Skeleton />}
                </h3>
                <h3 className="text-[8.76px] leading-[13.14px] md:text-[16px] lg:text-[24.23px] md:leading-[36.34px]">
                  {eventStartDate?.format("HH:mm a") || <Skeleton />}
                </h3>
              </div>
              <FontAwesomeIcon
                className="text-lg md:text-3xl lg:text-4xl"
                icon={regular("heart")}
              />
            </div>
            <div className="hidden lg:block text-white mt-[75px]">
              {aboutEvent}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[75px] md:mt-[140px] lg:hidden px-[28px] pb-[28px] md:px-[54px] text-white">
        {aboutEvent}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 px-[28px] md:px-[54px] lg:px-[45px] mt-[24.54px] gap-[45px]">
        <div className="order-2 lg:order-1">
          <h3 className="text-[9.26px] text-white leading-[13.89px] md:text-[13px] md:leading-[13.89px] lg:text-[18px] lg:leading-[27px]">
            Share Event
          </h3>
          <div className="flex mt-[7.12px] gap-[9.27px] md:gap-[21px] md:mt-[8px]">
            <img
              src={faceBookIcon}
              className="social-icon"
              alt="facebookicon"
            />
            <img
              src={whatsappIcon}
              className="social-icon"
              alt="whatsappicon"
            />
            <img
              src={telegramIcon}
              className="social-icon"
              alt="telegramIcon"
            />
            <img
              src={instagramIcon}
              className="social-icon"
              alt="instagramIcon"
            />
            <img src={twitterIcon} className="social-icon" alt="twitterIcon" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-[9.02px] lg:text-[18px] leading-[13.52px] md:text-[14px] md:leading-[23px] lg:leading-[27px]">
                Price
              </h3>
              <h3 className="text-[20.03px] leading-[30.05px] md:text-[28px] md:leading-[37px] font-medium lg:text-[40px] lg:leading-[60px]">
                {event ? (
                  `${event?.leastTicketCost} MATIC`
                ) : (
                  <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
                    <Skeleton />
                  </SkeletonTheme>
                )}
              </h3>
            </div>
            <div className="">
              {event ? (
                <MintTickets event={event} setBodyScroll={setBodyScroll} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <section className="mt-[28.2px] px-[28px] md:px-[54px] lg:px-[45px] lg:mt-[121px]">
        <h3 className="text-[8px] text-center text-white leading-[12px] md:text-[14px] md:leading-[18px] lg:text-[30px] lg:leading-[45px]">
          {event?.venue || (
            <SkeletonTheme baseColor="#1A1D25" highlightColor="#374151">
              <Skeleton />
            </SkeletonTheme>
          )}
        </h3>
        {event &&
        event.contractAddress ===
          "0x7481B9dE7CAd690D9Fffdb318B6574dDB6061186" ? (
          <iframe
            title={"map"}
            className="w-full mt-5"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7370764980396!2d3.4666013142765255!3d6.427815126052796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5a5611e8a6f%3A0x551f035f8326d09a!2s3%20New%20Creation%20St%2C%20Lekki%20Phase%20I%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1652520973811!5m2!1sen!2sng"
            width="100%"
            height="600"
            style={{ border: "0px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          <img src={map} className="w-full mt-5" alt="map" />
        )}
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
