import event from "svgs/event.png";
import eventPeople from "svgs/event-people.png";
import eventTickets from "svgs/event-tickets.png";
import curveLine from "svgs/curve-line.svg";
import { Link } from "react-router-dom";
import Events from "components/Events";
function Home() {
  return (
    <div className="relative">
      <div className="flex flex-col justify-between lg:px-8 lg:flex-row">
        <div className="mt-[110px] z-0 lg:mt-[60px] px-5 sm:px-6 order-2 lg:order-1 lg:pl-10">
          <div className="relative">
            <h3 className="font-medium text-[2.311rem] max-w-[226px] leading-[55.45px] lg:max-w-[546px] text-white lg:text-[65px] lg:leading-[119px] xl:text-[78px] xl:leading-[132px]">
              A New Era of NFT Utility
            </h3>
            <img
              src={curveLine}
              className="lg:max-w-[280px] xl:max-w-[330px] max-w-[157.12px] absolute top-12 xl:top-28 lg:top-[6rem] ml-[36px] lg:ml-[63px] xl:ml-[76px]"
              alt="curve"
            />
          </div>
          <div className="mt-[10px] font-[400] max-w-[218.45px] lg:max-w-[520px] text-[10.5px] leading-[15.75px] lg:text-[25px] lg:leading-[37.5px] text-white">
            Put Your Event on Chain and Let’s Freaking GO!!!!
          </div>
          <div className="mt-[13.3px] lg:mt-[54px] flex gap-[27px] sm:gap-[35px] md:gap-[43px] items-center">
            <button className="bg-black-gradient px-3 flex-shrink-0 lg:px-0 lg:w-[233px] btn-border h-[45px] lg:h-[65px] text-white text-[16px] sm:text-[20px] lg:text-[25px] leading-[37.5px] flex justify-center items-center">
              Get Started
            </button>
            <Link
              className="flex-shrink-0 bg-brand-red h-[45px] lg:h-[65px] px-3 lg:px-0 lg:w-[233px] text-white text-[16px] sm:text-[20px] lg:text-[25px] leading-[37.5px] flex justify-center items-center"
              to="/create-event"
            >
              Create Event
            </Link>
          </div>
          <div className="hidden lg:flex lg:mt-[61px] text-white lg:gap-[64px] xl:gap-[55px]">
            <div>
              <h3 className="lg:text-[48px] xl:text-[53px] lg:leading-[86.14px]">
                20k+
              </h3>
              <h4 className="lg:text-[16px] xl:text-[15px] lg:leading-[35.89px]">
                Events Hosted
              </h4>
            </div>
            <div>
              <h3 className="lg:text-[48px] xl:text-[53px] lg:leading-[86.14px]">
                300k+
              </h3>
              <h4 className="lg:text-[16px] xl:text-[15px] lg:leading-[35.89px]">
                Tickets Generated
              </h4>
            </div>
            <div>
              <h3 className="lg:text-[48px] xl:text-[53px] lg:leading-[86.14px]">
                8k+
              </h3>
              <h4 className="lg:text-[16px] xl:text-[15px] lg:leading-[35.89px]">
                Daily Visitors
              </h4>
            </div>
          </div>
        </div>
        <div className="order-1 w-full lg:order-2">
          <img
            src={eventPeople}
            alt="event-people"
            className="lg:hidden w-full -mt-[110px]"
          />
          <img
            src={eventTickets}
            alt="event-tickets"
            className="lg:hidden w-full absolute z-0 top-[140px] sm:top-[330px]"
          />
          <img
            src={event}
            className="lg:h-[725px] hidden lg:block xl:h-[880px] 2xl:h-[980px] -mt-[110px] top-0 absolute right-0 object-scale-down"
            alt="event"
          />
        </div>
      </div>
      <Events />
    </div>
  );
}

export default Home;
