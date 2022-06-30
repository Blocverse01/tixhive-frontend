import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Label from "components/Label";
import { useRecoilValue } from "recoil";
import { newEventState } from "recoil/atoms/newEvent";
import { useForm } from "react-hook-form";
import InputField from "components/InputField";
import ValidationError from "components/ValidationError";

function StepZero({ handleChange, setStep }) {
  const event = useRecoilValue(newEventState);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      host: event.host,
      category: event.category,
      venue_type: event.venue_type,
    },
  });
  const handleStepChange = (data) => {
    setStep(1);
  };
  const handleError = (errors) => {
    console.log(errors);
  };
  const validationOptions = {
    host: { required: "Event host is required" },
    category: { required: "A category for your event is required" },
    venue_type: { required: "Please select a type of venue" },
  };
  return (
    <form
      onSubmit={handleSubmit(handleStepChange, handleError)}
      className="grid grid-cols-1 gap-[27px]"
    >
      <InputField
        register={register}
        rules={validationOptions.host}
        type="text"
        placeholder="e.g Cavemen"
        name="host"
        label="Who is hosting this event?"
        error={errors.host}
        watch={watch}
        onChange={handleChange}
      />
      <InputField
        type="text"
        register={register}
        rules={validationOptions.category}
        placeholder="e.g Tech event"
        name="category"
        label="How would you categorize this event?"
        error={errors.category}
        watch={watch}
        onChange={handleChange}
      />
      <div>
        <Label
          value="What kind of venue will your event be held in?"
          htmlFor="venue_type"
        />
        <div>
          <div className="hidden">
            <InputField
              register={register}
              rules={validationOptions.venue_type}
              type="text"
              name="venue_type"
              watch={watch}
              onChange={handleChange}
            />
          </div>
          <div className="mt-[13.11px] flex flex-wrap gap-[12.68px]">
            <button
              type="button"
              onClick={() => {
                setValue("venue_type", 0);
              }}
              className={`${
                event.venue_type === 0
                  ? "bg-brand-red"
                  : "create-event-gradient"
              } text-[15px] md:text-[18px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3`}
            >
              Physical Venue
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("venue_type", 1);
              }}
              className={`${
                event.venue_type === 1
                  ? "bg-brand-red"
                  : "create-event-gradient"
              } text-[15px] md:text-[18px] leading-[34.75px] text-white h-[45px] flex items-center justify-center px-3`}
            >
              Online Venue
            </button>
          </div>
          {errors.venue_type && (
            <ValidationError message={errors.venue_type.message} />
          )}
        </div>
      </div>
      <div className="flex justify-end mt-[10px]">
        <button
          type="submit"
          className="bg-brand-red connect-wallet h-[45px] lg:h-[56px] px-3 lg:px-0 lg:w-[170px] text-white text-[15px] md:text-[18px] leading-[35px] flex justify-center items-center"
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
    </form>
  );
}

export default StepZero;
