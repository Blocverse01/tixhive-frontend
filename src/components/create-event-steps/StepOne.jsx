import InputField from "components/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Label from "components/Label";
import { useRecoilValue } from "recoil";
import { newEventState } from "recoil/atoms/newEvent";
import { useForm } from "react-hook-form";
import DateTimeInputField from "components/DateTimeInput";

function StepOne({ handleChange, setStep }) {
  const event = useRecoilValue(newEventState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: event.name,
      venue: event.venue,
      start_date: event.start_date,
      end_date: event.end_date,
      start_time: event.start_time,
      end_time: event.end_time,
    },
  });
  const handleStepChange = (data) => {
    setStep(2);
  };
  const handleError = (errors) => {
    console.log(errors);
  };
  const validationOptions = {
    name: { required: "A name for your event is required" },
    venue: { required: "A venue is required" },
    start_date: { required: "Required field" },
    end_date: { required: "Required field" },
    start_time: { required: "Required field" },
    end_time: { required: "Required field" },
  };
  return (
    <form
      onSubmit={handleSubmit(handleStepChange, handleError)}
      className="grid grid-cols-1 gap-[27px]"
    >
      <InputField
        register={register}
        rules={validationOptions.name}
        type="text"
        placeholder="e.g Cavvy 2.0"
        name="name"
        label="What is the name of your event?"
        error={errors.name}
        watch={watch}
        onChange={handleChange}
      />
      <div>
        <Label value="When will your event happen?" htmlFor="event_time" />
        <div className="create-event-gradient p-4 md:p-5 grid mt-[23px] gap-5 grid-cols-2">
          <div>
            <div>
              <DateTimeInputField
                register={register}
                rules={validationOptions.start_date}
                type="date"
                name="start_date"
                label="Start Date"
                error={errors.start_date}
                watch={watch}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2 sm:mt-[13px]">
              <DateTimeInputField
                register={register}
                rules={validationOptions.end_date}
                type="date"
                name="end_date"
                label="End Date"
                error={errors.end_date}
                watch={watch}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="justify-center sm:flex">
            <div>
              <div>
                <DateTimeInputField
                  register={register}
                  rules={validationOptions.start_time}
                  type="time"
                  name="start_time"
                  label="Start Time"
                  error={errors.start_time}
                  watch={watch}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2 sm:mt-[13px]">
                <DateTimeInputField
                  register={register}
                  rules={validationOptions.end_time}
                  type="time"
                  name="end_time"
                  label="End Time"
                  error={errors.end_time}
                  watch={watch}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {event.venue_type === 0 ? (
        <InputField
          register={register}
          rules={validationOptions.venue}
          type="text"
          placeholder="eg. O2 Arena, London, UK"
          name="venue"
          label="Where will your event happen?"
          error={errors.venue}
          watch={watch}
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
          className="bg-brand-red connect-wallet h-[45px] lg:h-[56px] px-3 lg:px-0 lg:w-[170px] text-white text-[15px] md:text-[18px] leading-[35px] flex justify-center items-center"
        >
          <span className="flex items-center">
            <FontAwesomeIcon
              icon={solid("chevron-left")}
              className="mr-[13px] md:mr-[22px]"
            />
            Previous
          </span>
        </button>
        <button
          type="submit"
          className="bg-brand-red connect-wallet h-[45px] lg:h-[56px] px-3 lg:px-0 lg:w-[170px] text-white text-[15px] md:text-[18px] leading-[35px] flex justify-center items-center"
        >
          <span className="flex items-center">
            Continue
            <FontAwesomeIcon
              icon={solid("chevron-right")}
              className="ml-[13px] md:ml-[22px]"
            />
          </span>
        </button>
      </div>
    </form>
  );
}

export default StepOne;
