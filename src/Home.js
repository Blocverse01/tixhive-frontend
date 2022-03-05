import event from "./svgs/event.svg";
import curveLine from "./svgs/curve-line.svg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="mt-[65px] lg:pl-10">
          <h3 className="font-500 lg:max-w-[546px] text-white lg:text-[78px] lg:leading-[132px]">
            A New Era of
          </h3>
          <img
            src={curveLine}
            className="lg:max-w-[330px] -mt-[20px] lg:ml-[78px]"
            alt="curve"
          />
          <h3 className="font-500 -mt-[20px] lg:max-w-[546px] text-white lg:text-[78px] lg:leading-[132px]">
            NFT Utility
          </h3>
          <div className="mt-[10px] font-[400] lg:max-w-[520px] lg:text-[25px] lg:leading-[37.5px] text-white">
            Teresa will insert some cool text here, ipsum dolor sit amet lorem.
          </div>
          <div className="mt-[54px] flex gap-[43px] items-center">
            <button className="bg-black-gradient px-5 lg:px-0 lg:w-[233px] btn-border h-[65px] text-white text-[25px] leading-[37.5px] flex justify-center items-center">
              Get Started
            </button>
            <Link to="/create-event">
              <button className="bg-brand-red h-[65px] px-5 lg:px-0 lg:w-[233px] text-white text-[25px] leading-[37.5px] flex justify-center items-center">
                Create Event
              </button>
            </Link>
          </div>
          <div className="flex mt-[61px] text-white items-center lg:gap-[67.6px]">
            <div>
              <h3 className="lg:text-[53px] lg:leading-[86.14px]">20k+</h3>
              <h4 className="lg:text-[18px] lg:leading-[35.89px]">
                Events Hosted
              </h4>
            </div>
            <div>
              <h3 className="lg:text-[53px] lg:leading-[86.14px]">300k+</h3>
              <h4 className="lg:text-[18px] lg:leading-[35.89px]">
                Tickets Generated
              </h4>
            </div>
            <div>
              <h3 className="lg:text-[53px] lg:leading-[86.14px]">8k+</h3>
              <h4 className="lg:text-[18px] lg:leading-[35.89px]">
                Daily Visitors
              </h4>
            </div>
          </div>
        </div>
        <img src={event} className="h-[720px] lg:-mt-[95px]" alt="event" />
      </div>
      <section className="pb-12 pt-28 px-5 sm:px-6 lg:px-10">
        <div class="relative text-white focus-within:text-gray-200">
          <span class="absolute inset-y-0 left-[20px] flex items-center pl-2">
            <button
              type="submit"
              class="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-5 h-5"
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
            autocomplete="off"
          />
        </div>

        <div className="flex mt-6 justify-start gap-2">
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
      </section>
    </div>
  );
}

export default Home;
