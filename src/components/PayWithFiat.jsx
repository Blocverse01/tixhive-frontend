import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useForm } from "react-hook-form";
import ValidationError from "./ValidationError";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
export default function PayWithFiat(props) {
  const [amount, setAmount] = useState(0);
  const [userConfig, setUserConfig] = useState({});
  const [userEmail, setuserEmail] = useState("");
  const [currency, setCurrency] = useState("");
  const [conversionRate, setconversionRate] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const paymentButton = document.getElementById("paybutton");

  /* const urlCheck = window.location.search;
  const urlParams = new URLSearchParams(urlCheck);
  const status = urlParams.get('status'); */

  const onSubmit = (data) => {
    
    setuserEmail(data.userEmail);
    paymentButton.innerHTML = "Processing..."
    paymentButton.disabled = true; 
  }

  const config = {
    public_key: process.env.REACT_APP_FLW_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: conversionRate,
    currency: currency,
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userEmail,
    },
    customizations: {
      title: process.env.REACT_APP_NAME,
      description: 'Payment for items in cart',
      logo: process.env.REACT_APP_TIXHIVE_LOGO,
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    if(userEmail){
      handleFlutterPayment({
        callback: (response) => {
          let dataForPayment = JSON.stringify({
            'transId' : response.transaction_id,
          })

          fetch(`${process.env.REACT_APP_VERIFY_URL}`, {
            method: 'POST',
            body: dataForPayment,
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((result) => {
            paymentButton.innerHTML = "Verifying Payment"
            paymentButton.disabled = true; 
            closePaymentModal()
            if(result.payment === "successful"){
              Swal.fire({
                title: "Hello fren 🙂",
                text: "Your payment was successful!",
                icon: "success",
              });
              paymentButton.innerHTML = `Pay ${currency} ${amount}`
              paymentButton.disabled = true; 
            }else{
              Swal.fire({
                title: "Hello fren 🙂",
                text: "Your payment was not successful!",
                icon: "error",
              });
            }
            console.log(result.payment)
            return;
           
          })
          .catch((error) => {
              return;
            console.error('Error:', error);
          });
            console.log(response);
            // this will close the modal programmatically
          },
        onClose: () => {},
      });
    }   
  },[userEmail]);

  useEffect(() => {
    if (props.country === "Nigeria") {
      setCurrency("NGN")
      let matic_to_naira = (props.totalAmount * process.env.REACT_APP_MATIC_TO_USD) * process.env.REACT_APP_USD_TO_NAIRA;
      let amount = new Intl.NumberFormat().format(matic_to_naira)
      setAmount(amount)
      setconversionRate(matic_to_naira)
    } else {
      setCurrency("USD")
      let matic_to_usd = props.totalAmount * process.env.REACT_APP_MATIC_TO_USD;
      let amount = new Intl.NumberFormat().format(matic_to_usd)
      setAmount(amount)
      setconversionRate(matic_to_usd)
    }
  }, [props.country, props.totalAmount]);

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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <input
                      {...register("userEmail",
                        {
                          required: "Your Email Address is required",
                          pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Enter a valid Email Address"
                          }
                        }
                      )}
                      placeholder="Enter Email Address"
                      className="text-[18px] w-full font-[400] p-4 mt-10 rounded-[8.69px] bg-[#22262F]"

                    />
                    {errors.userEmail && <ValidationError message={errors.userEmail.message} />}
                  </div>
                  <button type="submit" id="paybutton" className="mint-modal-subtitle w-fit mt-5 float-right  text-white outline-none pay-btn">
                    Pay {currency}<span> {amount}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
