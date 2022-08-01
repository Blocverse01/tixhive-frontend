
import { useMoralis } from "react-moralis";
import caret from "../images/caret.png"
import ClickToCopy from "./ClickToCopy"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import truncateEthAddress from "truncate-eth-address";


export default function AddFundsModal(props){

  const { user, isAuthenticated  } = useMoralis();
   

    return(
      <>
       {
        !props.show ? (
            null
        )
        : 
        <>
             <div className="modal auth-modal">
               
                <div className="relative w-full max-w-[400px] mx-auto md:my-6">
                
                <div className="modal-content modal-border py-12  ">
                <div className="flex justify-between modal-padding items-center">
                    <button onClick={props.onBack}>
                        <img src={caret} alt={caret} className ="scale-75 " />
                    </button>

                     <button onClick={props.onClose} className='flex items-center justify-center duration-200 text-xl  hover:text-gray-300  h-10 w-10    text-white  rounded-full outline-none bg-[#22262F] focus:outline-none' type="button" >
                        x
                    </button>
                </div>
                <div className="modal-header mt-6">
                    <h4 className='text text-center font-bold'>Add funds</h4>
                </div>
                
                
                <div className="flex mt-4 justify-between">
                    <div className="border-b-[3px] cursor-pointer font-bold border-b-brand-red"  >
                          <p className="text modal-padding font-bold  py-2">
                        Deposit Crypto
                         </p>
                        
                    </div>
                    <div className='cursor-not-allowed '> 
                        <p className="text text-[#858D9F] modal-padding py-2  font-bold ">
                         Fund with Card
                         </p>
                    </div>
                </div>


           <div className="modal-padding">
                 <p className='text  w-[250px] text-justify mt-8 font-[300px] mx-auto'>
                    Transfer funds from an exchange or another wallet to the address below
                </p>

                <div className="text-center mt-6 pl-3 justify-between flex w-full h-[53px] items-center relative  rounded-[8.69px]  bg-[#22262F]">
                   <span className="mr-3 ">
                      {isAuthenticated &&
                        truncateEthAddress(user.get("ethAddress"))}
                    </span>{" "}
                    <span className='bg-brand-red  rounded-[8.69px] p-3'>
                    <ClickToCopy 
                      text={isAuthenticated && user.get("ethAddress")}
                      buttonText={<FontAwesomeIcon icon={solid("copy")} />}
                    />
                    </span>
                    
                </div>

                <p className="text-[10px] text-center mt-10 ">Only send Polygon (MATIC) to this address</p>

           </div>

               
            </div>
                </div>
        </div>
            </>
       } 
      </>
    )
    
}