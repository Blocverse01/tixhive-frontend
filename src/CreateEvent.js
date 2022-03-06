import vector from "./svgs/Vector-4.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function CreateEvent() {
  return (
    <div className="relative h-screen z-0">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="px-5 sm:px-6 lg:px-8 lg:col-span-2">
          <div className="lg:pl-10 mt-[60px] text-white">
            <h3 className="font-[600] text-[70px] leading-[105px]">
              Create Your Event
            </h3>
            <div className="mt-[10px] font-[400] lg:max-w-[520px] lg:text-[25px] lg:leading-[37.5px] text-white">
              Teresa will insert some cool text here, ipsum dolor sit amet
              lorem.
            </div>
          </div>
        </div>
        <div className="mt-[60px] lg:mx-[70px] h-full lg:col-span-3">
          <img
            src={vector}
            alt="vector"
            className="fixed bottom-0 h-full top-0 z-[-1] right-0"
          />
          <div className="create-event-section z-50 h-full lg:px-[40px] grid grid-cols-1 gap-[20px] lg:pt-[65px] lg:pb-[40px]">
            <div>
              <label className="text-[23px] font-[400] text-white leading-[37.5px]">
                Who is hosting this event?
              </label>
              <input className="input pt-3 pb-1 focus:outline-none focus:border-gray-500 text-white w-full bg-transparent" />
            </div>
            <div>
              <label className="text-[23px] font-[400] text-white leading-[37.5px]">
                What type of event is being hosted?
              </label>
              <input className="input pt-3 pb-1 focus:outline-none focus:border-gray-500 text-white w-full bg-transparent" />
            </div>
            <div>
              <label className="text-[23px] font-[400] text-white leading-[37.5px]">
                How would you categorize this event?
              </label>
              <input className="input pt-3 pb-1 focus:outline-none focus:border-gray-500 text-white w-full bg-transparent" />
            </div>
            <div className="flex justify-end mt-[10px]">
              <button
                type="button"
                className="bg-brand-red connect-wallet h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
              >
                <span className="flex items-center">
                  Continue
                  <FontAwesomeIcon
                    icon={solid("chevron-right")}
                    className="ml-[22px]"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateEvent;
