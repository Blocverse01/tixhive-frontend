import event from "svgs/event.svg";
import eventPeople from "svgs/event-people.svg";
import eventTickets from "svgs/event-tickets.svg";
import curveLine from "svgs/curve-line.svg";
import { Link } from "react-router-dom";
import Events from "components/Events";
function Home() {
  return (
    <div>
      <div className="flex lg:px-8 justify-between lg:flex-row flex-col">
        <div className="mt-[90px] lg:mt-[60px] px-5 sm:px-6 order-2 lg:order-1 lg:pl-10">
          <div className="relative">
            <h3 className="font-medium text-[36.97px] max-w-[226px] leading-[55.45px] lg:max-w-[546px] text-white lg:text-[78px] lg:leading-[132px]">
              A New Era of NFT Utility
            </h3>
            <img
              src={curveLine}
              className="lg:max-w-[330px] max-w-[157.12px] absolute top-12 lg:top-28 ml-[36px] lg:ml-[76px]"
              alt="curve"
            />
          </div>
          <div className="mt-[10px] font-[400] max-w-[218.45px] lg:max-w-[520px] text-[10.5px] leading-[15.75px] lg:text-[25px] lg:leading-[37.5px] text-white">
            Teresa will insert some cool text here, ipsum dolor sit amet lorem.
          </div>
          <div className="mt-[13.3px] lg:mt-[54px] flex gap-[43px] items-center">
            <button className="bg-black-gradient px-5 lg:px-0 lg:w-[233px] btn-border h-[50px] lg:h-[65px] text-white text-[20px] lg:text-[25px] leading-[37.5px] flex justify-center items-center">
              Get Started
            </button>
            <Link to="/create-event">
              <button className="bg-brand-red h-[50px] lg:h-[65px] px-5 lg:px-0 lg:w-[233px] text-white text-[20px] lg:text-[25px] leading-[37.5px] flex justify-center items-center">
                Create Event
              </button>
            </Link>
          </div>
          <div className="hidden lg:flex lg:mt-[61px] text-white lg:gap-[64px] xl:gap-[55px]">
            <div>
              <h3 className="lg:text-[48px] xl:text-[53px] lg:leading-[86.14px]">20k+</h3>
              <h4 className="lg:text-[16px] xl:text-[17px] lg:leading-[35.89px]">Events Hosted</h4>
            </div>
            <div>
              <h3 className="lg:text-[48px] xl:text-[53px] lg:leading-[86.14px]">300k+</h3>
              <h4 className="lg:text-[16px] xl:text-[17px] lg:leading-[35.89px]">Tickets Generated</h4>
            </div>
            <div>
              <h3 className="lg:text-[48px] xl:text-[53px] lg:leading-[86.14px]">8k+</h3>
              <h4 className="lg:text-[16px] xl:text-[17px] lg:leading-[35.89px]">Daily Visitors</h4>
            </div>
          </div>
        </div>
        <div className="order-1 w-full lg:order-2">
          <img src={eventPeople} alt="event-people" className="lg:hidden h-full w-full -mt-[110px]" />
          <img src={eventTickets} alt="event-tickets" className="lg:hidden h-full w-full absolute top-[150px]" />
          <img
            src={event}
            className="lg:h-[600px] hidden lg:block xl:h-[760px] 2xl:h-[1088px] lg:-mt-[110px]"
            alt="event"
          />
        </div>
      </div>
      <Events />
    </div>
  );
}

export default Home;
