import InputField from "components/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Label from "components/Label";

function StepZero({ event, handleChange, setStep }) {
  return (
    <div className="grid grid-cols-1 gap-[27px]">
      <InputField
        type="text"
        value={event.host}
        placeholder="e.g Cavemen"
        name="host"
        label="Who is hosting this event?"
        onChange={handleChange}
      />
      <InputField
        type="text"
        value={event.category}
        placeholder="e.g Tech event"
        name="category"
        label="How would you categorize this event?"
        onChange={handleChange}
      />
      <div>
        <Label
          value="What kind of venue will your event be held in?"
          htmlFor="venue_type"
        />
        <div className="mt-[13.11px] flex flex-wrap gap-[12.68px]">
          <button
            onClick={() => {
              handleChange({
                target: { name: "venue_type", value: "physical" },
              });
            }}
            className="create-event-gradient text-[20px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3"
          >
            {event.venue_type === "physical" ? (
              <FontAwesomeIcon
                icon={solid("check-circle")}
                className="mr-2 text-brand-red"
              />
            ) : (
              ""
            )}
            <span>Physical Venue</span>
          </button>
          <button
            onClick={() => {
              handleChange({ target: { name: "venue_type", value: "online" } });
            }}
            className="create-event-gradient text-[20px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3"
          >
            {event.venue_type === "online" ? (
              <FontAwesomeIcon
                icon={solid("check-circle")}
                className="mr-2 text-brand-red"
              />
            ) : (
              ""
            )}
            <span>Online Venue</span>
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-[10px]">
        <button
          onClick={() => {
            setStep(1);
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

export default StepZero;
