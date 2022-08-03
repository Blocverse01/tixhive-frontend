import caret from "../images/caret.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function WithDrawFundsModal(props) {
  return (
    <>
      {!props.show ? null : (
        <>
          <div className="modal auth-modal">
            <div className="relative w-full max-w-[400px] md:max-w-[550px] xl:max-w-[472px] mx-auto md:my-6">
              <div className="modal-content modal-border py-12  ">
                <div className="flex justify-between modal-padding items-center">
                  <button onClick={props.onBack}>
                    <img src={caret} alt={caret} className="scale-75" />
                  </button>

                  <button
                    onClick={props.onClose}
                    className="bg-[#22262F] h-[42px] w-[42px] flex items-center justify-center rounded-full text-white duration-200 lg:hover:text-gray-300  text-xl"
                    type="button"
                  >
                    <FontAwesomeIcon icon={solid("xmark")} />
                  </button>
                </div>
                <div className="modal-header mt-6">
                  <h4 className="text text-center font-bold">Withdraw funds</h4>
                </div>

                <div className="flex mt-4 justify-between">
                  <div className="border-b-[3px] cursor-pointer flex-1 font-bold border-b-brand-red">
                    <p className="text modal-padding font-bold py-2">
                      Withdraw MATIC
                    </p>
                  </div>
                  <div className="cursor-not-allowed flex-1 flex justify-end">
                    <p className="text text-[#858D9F] modal-padding py-2  font-bold ">
                      Withdraw USDT
                    </p>
                  </div>
                </div>

                <div className="modal-padding">
                  <p className="text w-full max-w-[295px] text-center mt-8 font-[300px] mx-auto">
                    Withdraw to a Polygon (MATIC) Wallet.
                  </p>

                  <div className="  w-full mt-5  relative   ">
                    <div>
                      <input
                        placeholder="Recipient Address"
                        className="text  w-full p-3 font-[500] outline-none focus:border-[0.5px] focus:border-brand-darkred rounded-[8.69px] bg-[#22262F]"
                      />
                    </div>
                    <div className="mt-4 flex items-center relative ">
                      <input
                        placeholder="MATIC Amount"
                        className="text  w-full p-3 font-[500] outline-none focus:border-[0.5px] focus:border-brand-darkred rounded-[8.69px] bg-[#22262F]"
                      />
                      <button className="absolute text text-brand-red right-[20px]">
                        Max
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
