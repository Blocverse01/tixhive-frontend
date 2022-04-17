import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import EventsList from "components/EventsList"
import { eventsState } from "recoil/atoms/events";
import { useRecoilValue } from "recoil";

function Events() {
  const events = useRecoilValue(eventsState);
  return (
    <section className="pb-12 pt-[60px] lg:pt-28 px-5 sm:px-6 lg:px-8">
      <div className="lg:px-10">
        <div className="relative text-white focus-within:text-gray-200">
          <span className="absolute inset-y-0 left-[20px] flex items-center pl-2">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="q"
            className="w-full bg-input-gradient btn-border h-[45px] placeholder-white text-sm text-white pl-[70px] pr-2 focus:outline-none focus:bg-gray-900 focus:text-white"
            placeholder="Search Events"
            autoComplete="off"
          />
        </div>

        <div className="flex mt-6 justify-start flex-wrap gap-2">
          <button className="h-[45px] shadow-sm px-5 flex items-center justify-center bg-brand-red text-white lg:text-[18px] lg:leading-[37.5px]">
            For You
          </button>
          <button className="h-[45px] shadow-sm px-5 bg-brand-black2 flex items-center justify-center text-white lg:text-[18px] lg:leading-[37.5px]">
            Tech
          </button>
          <button className="h-[45px] shadow-sm px-5 bg-brand-black2 flex items-center justify-center text-white lg:text-[18px] lg:leading-[37.5px]">
            Music
          </button>
          <button className="h-[45px] shadow-sm px-5 bg-brand-black2 flex items-center justify-center text-white lg:text-[18px] lg:leading-[37.5px]">
            Virtual
          </button>
        </div>

        <section className="mt-9">
          <EventsList events={events} />
        </section>

        <div className="flex pt-[50px] md:pt-[98px] pb-[40px] justify-center">
          <button className="see-more-btn px-[35px] lg:text-[22px] lg:leading-[37.5px] font-[400] h-[65px] flex items-center justify-center text-white">
            <span>
              See More
              <FontAwesomeIcon icon={solid("chevron-right")} className="ml-[22px]" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
export default Events;
