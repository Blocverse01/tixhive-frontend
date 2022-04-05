import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileUploader } from "react-drag-drop-files";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

const fileTypes = ["JPG", "PNG", "GIF", "SVG"];

function StepTwo({ event, handleChange, setStep }) {
  return (
    <div className="grid grid-cols-1 lg:px-[30px] gap-[27px]">
      <div>
        <h3 className="text-[25px] text-white font-[500] leading-[51.62px]">
          Add Your Main Event Image
        </h3>
        <h4 className="text-[14px] text-white font-[500] leading-[25.81px]">
          This is the first image attendees will see at the top of your listing.
          Use a high quality image : 2033px by 20393px (2:1)
        </h4>
        <div className="mt-[17.63px] cursor-pointer hover:bg-red-100 text-white create-event-gradient">
          <FileUploader
            value={event.cover_image}
            handleChange={(file) =>
              handleChange({ target: { name: "cover_image", value: file } })
            }
            name="cover_image"
            types={fileTypes}
            children={
              <div className="text-white cursor-pointer">
                {event.cover_image ? (
                  <div className="relative">
                    <div className="bg-black absolute bg-opacity-40 z-10 inset-0 h-[220px] sm:h-[203px] flex items-center justify-center">
                      <div>
                        <div className="text-center">
                          <FontAwesomeIcon
                            icon={regular("image")}
                            className="text-white text-3xl"
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
                        className="text-white text-4xl"
                      />
                    </div>
                    <h3 className="text-center mt-[15.45px] text-[15px] font-[600] leading-[27.58px]">
                      Drag and Drop or Click to Add an Image
                    </h3>
                    <h3 className="text-center font-[500] text-[12px] leading-[22.07px]">
                      Must be JPEG, SVG, PNG or GIF; Must not exceed 10MB
                    </h3>
                  </div>
                )}
              </div>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-[25px] text-white font-[500] leading-[51.62px]">
          Add a Description
        </h3>
        <h4 className="text-[14px] text-white font-[500] leading-[25.81px]">
          Add a short summary of your event for your attendees (Max 200
          Characters)
        </h4>
        <textarea
          defaultValue={event.description}
          maxLength="200"
          name="description"
          placeholder="Write Summary..."
          rows="4"
          className="create-event-gradient focus:outline-none text-white placeholder-[#FFFFFFB2] w-full p-5 mt-[20.21px]"
          onChange={handleChange}
        ></textarea>
        <h3 className="text-right mt-[18px] text-white text-[18px] leading-[30.97px] font-[500]">
          {event.description.length}/200
        </h3>
      </div>

      <div className="flex justify-end mt-[10px]">
        <button
          onClick={() => {
            setStep(3);
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

export default StepTwo;
