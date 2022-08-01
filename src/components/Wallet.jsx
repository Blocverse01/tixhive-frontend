import { useMoralis } from "react-moralis";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  showWalletModalState,
  totalUsdBalanceState,
  walletCryptoBalanceState,
  walletUsdBalanceState,
} from "recoil/atoms/wallet";
import truncateEthAddress from "truncate-eth-address";
import usdtLogo from "svgs/tether-usdt-logo.svg";
import maticLogo from "svgs/polygon-matic-logo.svg";
import { convertBalanceToEther } from "utils/web3-utils";
import ClickToCopy from "./ClickToCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Wallet() {
  const { user, logout, isAuthenticated, isAuthenticating } = useMoralis();
  const [showWalletModal, setShowWalletModal] =
    useRecoilState(showWalletModalState);
  const totalUsdBalance = useRecoilValue(totalUsdBalanceState);
  const walletCryptoBalance = useRecoilValue(walletCryptoBalanceState);
  const walletUsdBalance = useRecoilValue(walletUsdBalanceState);
  return (
    <>
      {showWalletModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden auth-modal overflow-y-auto bottom-0 left-0 right-0 fixed md:inset-0 z-[1050] outline-none focus:outline-none">
            <div className="relative w-full max-w-[472px] mx-auto md:my-6">
              <div className="relative flex flex-col w-full bg-[#111317] border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-end pr-5 rounded-t md:pl-8">
                  <button
                    className="float-right p-1 mt-3 mb-3 ml-auto text-3xl font-normal leading-none text-white bg-transparent border-0 outline-none focus:outline-none"
                    onClick={() => setShowWalletModal(false)}
                  >
                    <span className="flex items-center justify-center w-10 h-10 text-3xl text-white border rounded-full outline-none bg-slate-600 border-slate-700 focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto px-8 md:px-14 pb-8 md:pb-14 lg:px-[60px] lg:pb-[68px] 2xl:pb-[88.99px] text-white">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={async () => {
                        await logout();
                        setShowWalletModal(false);
                      }}
                      className="Wallet-disconnect-btn"
                    >
                      {isAuthenticating && (
                        <FontAwesomeIcon
                          icon={solid("spinner")}
                          className="mr-2 text-white"
                          spin
                        />
                      )}
                      Disconnect
                    </button>
                  </div>
                  <h3 className="text-center text-base md:text-lg py-[26px] lg:leading-[26.04px]">
                    <span className="mr-3">
                      {isAuthenticated &&
                        truncateEthAddress(user.get("ethAddress"))}
                    </span>{" "}
                    <ClickToCopy
                      text={isAuthenticated && user.get("ethAddress")}
                      buttonText={<FontAwesomeIcon icon={solid("copy")} />}
                    />
                  </h3>
                  <h3 className="font-medium font-sora mb-5 text-[40px] md:text-5xl lg:text-[67.87px] lg:leading-[85.51px] text-center">
                    ${totalUsdBalance}
                  </h3>
                  <div className="mb-5 bg-[#22262F] p-3 flex items-center justify-between rounded-[8.69px]">
                    <div className="flex items-center">
                      <img
                        src={usdtLogo}
                        alt="usdt logo"
                        className="w-8 h-8 mr-2"
                      />
                      <span>
                        {convertBalanceToEther(
                          walletCryptoBalance.usdtBalance,
                          6
                        )}
                      </span>
                    </div>
                    <span>${walletUsdBalance.usdtUsd}</span>
                  </div>
                  <div className="bg-[#22262F] p-3 flex items-center justify-between rounded-[8.69px]">
                    <div className="flex items-center">
                      <img
                        src={maticLogo}
                        alt="matic logo"
                        className="w-8 h-8 mr-2"
                      />
                      <span>
                        {convertBalanceToEther(
                          walletCryptoBalance.maticBalance
                        )}
                      </span>
                    </div>
                    <span>${walletUsdBalance.maticUsd}</span>
                  </div>
                  <div className="flex justify-between mt-5">
                    <button className="bg-brand-red text padded-btn darker-red">
                      Add Funds
                    </button>
                    <button className="bg-[#22262F] text padded-btn darker-red">
                      Withdraw Funds
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
