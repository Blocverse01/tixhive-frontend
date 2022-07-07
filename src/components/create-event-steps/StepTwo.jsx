import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileUploader } from "react-drag-drop-files";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useRecoilValue } from "recoil";
import { newEventState } from "recoil/atoms/newEvent";
import { useForm } from "react-hook-form";
import ValidationError from "components/ValidationError";
import useWatchHandleChange from "hooks/useWatchHandleChange";

const fileTypes = ["JPG", "PNG", "GIF", "SVG", "JPEG"];

function StepTwo({ handleChange, setStep }) {
  const event = useRecoilValue(newEventState);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { cover_image: event.cover_image } });
  useWatchHandleChange("cover_image", watch, handleChange);
  const handleStepChange = (data) => {
    setStep(3);
  };
  const handleError = (errors) => {
    console.log(errors);
  };
  const rules = {
    cover_image: { required: "Select A Cover Image" },
    description: { required: "A description is required" },
  };
  return (
    <form
      onSubmit={handleSubmit(handleStepChange, handleError)}
      className="grid grid-cols-1 lg:px-[30px] gap-[27px]"
    >
      <div>
        <h3 className="create-event-headline">Add Your Main Event Image</h3>
        <h4 className="create-event-subheadline">
          This is the first image attendees will see at the top of your listing.
          Use a high quality image : 2033px by 20393px (2:1)
        </h4>
        <div className="mt-[17.63px] cursor-pointer hover:bg-red-100 text-white create-event-gradient">
          <input
            name="cover_image"
            type="file"
            hidden
            /* {...register("cover_image", rules.cover_image)} */
          />
          <FileUploader
            types={fileTypes}
            value={event.cover_image}
            handleChange={(file) => setValue("cover_image", file)}
            children={
              <div className="text-white cursor-pointer">
                {event.cover_image ? (
                  <div className="relative">
                    <div className="bg-black absolute bg-opacity-40 z-10 inset-0 h-[220px] sm:h-[203px] flex items-center justify-center">
                      <div>
                        <div className="text-center">
                          <FontAwesomeIcon
                            icon={regular("image")}
                            className="text-3xl text-white"
                          />
                        </div>
                        <div className="text-center mt-[15.45px] text-[15px] font-[600] leading-[27.58px]">
                          Drag and Drop or Click, if you need to Change this
                          Image
                        </div>
                      </div>
                    </div>
                    <img
                      src={URL.createObjectURL(event.cover_image)}
                      className="h-[220px] sm:h-[203px] object-cover w-full"
                      alt="Thumb"
                    />
                  </div>
                ) : (
                  <div className="py-[24px]">
                    <div className="text-center">
                      <FontAwesomeIcon
                        icon={solid("image")}
                        className="text-4xl text-white"
                      />
                    </div>
                    <h3 className="text-center mt-[15.45px] text-[10px] md:text-[14px] font-[600] leading-[27.58px]">
                      Drag and Drop or Click to Add an Image
                    </h3>
                    <h3 className="text-center font-[500] text-[9px] leading-[22.07px]">
                      Must be JPEG, SVG, PNG or GIF; Must not exceed 10MB
                    </h3>
                  </div>
                )}
              </div>
            }
          />
        </div>
        {errors.cover_image && (
          <ValidationError message={errors.cover_image.message} />
        )}
      </div>

      <div>
        <h3 className="create-event-headline">Add a Description</h3>
        <h4 className="create-event-subheadline">
          Add a short summary of your event for your attendees (Max 200
          Characters)
        </h4>
        <textarea
          defaultValue={event.description}
          {...register("description", rules.description)}
          maxLength="200"
          name="description"
          placeholder="Write Summary..."
          rows="4"
          className="create-event-gradient text-[15px] md:text-[18px] focus:outline-none text-white placeholder-[#FFFFFFB2] w-full p-5 mt-[20.21px]"
          onChange={handleChange}
        ></textarea>
        <div className="flex items-baseline justify-between">
          {errors.description && (
            <ValidationError message={errors.description.message} />
          )}
          <h3 className="text-right flex-1 mt-[18px] text-white text-[15px] md:text-[18px] leading-[30.97px] font-[500]">
            {event.description.length}/200
          </h3>
        </div>
      </div>

      <div className="flex justify-between mt-[10px]">
        <button
          onClick={() => {
            setStep(1);
          }}
          type="button"
          className="bg-brand-red connect-wallet h-[45px] lg:h-[56px] px-3 lg:px-0 lg:w-[170px] text-white text-[12px] md:text-[18px] leading-[35px] flex justify-center items-center"
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
          className="bg-brand-red connect-wallet h-[45px] lg:h-[56px] px-3 lg:px-0 lg:w-[170px] text-white text-[12px] md:text-[18px] leading-[35px] flex justify-center items-center"
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

export default StepTwo;
