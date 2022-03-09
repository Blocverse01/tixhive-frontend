import InputField from "components/InputField.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Label from "components/Label.js";

function StepOne({ event, handleChange, setStep }) {
  return (
    <div className="grid grid-cols-1 gap-[27px]">
      <InputField
        type="text"
        value={event.name}
        placeholder="e.g Cavvy 2.0"
        name="name"
        label="What is the name of your event?"
        onChange={handleChange}
      />
      <div>
        <Label value="When will your event happen?" htmlFor="event_time" />
        <div className="create-event-gradient p-5 grid mt-[23px] grid-cols-2">
          <div>
            <div>
              <h3 className="text-white text-[16px] leading-[24px]">
                Start Date
              </h3>
              <input
                onChange={handleChange}
                name="start_date"
                value={event.start_date}
                type="date"
                className="bg-transparent text-white uppercase"
              />
            </div>
            <div className="mt-[11px]">
              <h3 className="text-white text-[16px] leading-[24px]">
                End Date
              </h3>
              <input
                onChange={handleChange}
                value={event.end_date}
                name="end_date"
                type="date"
                className="bg-transparent text-white uppercase"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div>
              <div>
                <h3 className="text-white text-[16px] leading-[24px]">
                  Start Time
                </h3>
                <input
                  onChange={handleChange}
                  name="start_time"
                  value={event.start_time}
                  type="time"
                  className="bg-transparent text-white uppercase"
                />
              </div>
              <div className="mt-[11px]">
                <h3 className="text-white text-[16px] leading-[24px]">
                  End Time
                </h3>
                <input
                  type="time"
                  value={event.end_time}
                  onChange={handleChange}
                  name="end_time"
                  className="bg-transparent text-white uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {event.venue_type === "physical" ? (
        <InputField
          type="text"
          value={event.venue}
          placeholder=""
          name="venue"
          label="Where will your event happen?"
          onChange={handleChange}
        />
      ) : (
        ""
      )}
      <div className="flex justify-between mt-[10px]">
        <button
          onClick={() => {
            setStep(0);
          }}
          type="button"
          className="bg-brand-red connect-wallet h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
        >
          <span className="flex items-center">
            <FontAwesomeIcon
              icon={solid("chevron-left")}
              className="mr-[22px]"
            />
            Previous
          </span>
        </button>
        <button
          onClick={() => {
            setStep(2);
          }}
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
  );
}

export default StepOne;
