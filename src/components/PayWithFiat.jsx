import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function PayWithFiat(props) {
  return (
    <>
      {!props.show ? null : (
        <>
          <div className="modal auth-modal">
            <div className="relative w-full max-w-[400px] md:max-w-[550px] xl:max-w-[726px] mx-auto md:my-6">
              <div className="modal-content relative overflow-hidden modal-border pt-12 pb-20 px-12  ">
                <div className="mint-modal-header ">
                  <h3 className="mint-modal-title">Get Your Tickets</h3>

                  <button
                    onClick={props.onClose}
                    className="bg-[#22262F] h-[42px] w-[42px] flex items-center justify-center rounded-full text-white duration-200 lg:hover:text-gray-300  text-xl"
                    type="button"
                  >
                    <FontAwesomeIcon icon={solid("xmark")} />
                  </button>
                </div>
                <div>
                  <input
                    placeholder="Enter  Email Address"
                    className="text-[18px] w-full font-[400] p-4 mt-10 rounded-[8.69px] bg-[#22262F]"
                  />
                </div>

                <button className="mint-modal-subtitle w-fit mt-5 float-right  text-white outline-none pay-btn">
                  Pay NGN<span>12,000</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
