import { useMoralis } from "react-moralis";
import caret from "../images/caret.png";
import ClickToCopy from "./ClickToCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function AddFundsModal(props) {
  const { user, isAuthenticated } = useMoralis();

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
                  <h4 className="text text-center font-[500]">Add funds</h4>
                </div>

                <div className="flex mt-4 justify-between">
                  <div className="border-b-[3px] cursor-pointer flex-1 font-bold border-b-brand-red">
                    <p className="text modal-padding font-[500] py-2">
                      Deposit Crypto
                    </p>
                  </div>
                  <div className="cursor-not-allowed flex-1 flex justify-end">
                    <p className="text text-[#858D9F] modal-padding py-2  font-[500] ">
                      Fund with Card
                    </p>
                  </div>
                </div>

                <div className="modal-padding">
                  <p className="text w-full max-w-[295px] text-center mt-8 font-[300] mx-auto">
                    Transfer funds from an exchange or another wallet to the
                    address below
                  </p>

                  <div className="text-center mt-6 pl-3 max-w-[403px] mx-auto justify-between flex w-full h-[53px] items-center relative  rounded-[8.69px]  bg-[#22262F]">
                    <span className="mr-3 truncate">
                      {isAuthenticated && user.get("ethAddress")}
                    </span>{" "}
                    <span className="bg-brand-red  rounded-[8.69px] p-3">
                      <ClickToCopy
                        text={isAuthenticated && user.get("ethAddress")}
                        buttonText={<FontAwesomeIcon icon={solid("copy")} />}
                      />
                    </span>
                  </div>

                  <p className="text-[10px] text-center mt-10 ">
                    Only send Polygon (MATIC) to this address
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
