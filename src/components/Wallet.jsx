import { useMoralis } from "react-moralis";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  showWalletModalState,
  totalUsdBalanceState,
  walletCryptoBalanceState,
  walletUsdBalanceState,
} from "recoil/atoms/wallet";
import { useState } from "react";
import truncateEthAddress from "truncate-eth-address";
import usdtLogo from "svgs/tether-usdt-logo.svg";
import maticLogo from "svgs/polygon-matic-logo.svg";
import { convertBalanceToEther } from "utils/web3-utils";
import ClickToCopy from "./ClickToCopy";
import AddFundsModal from "./AddFundsModal";
import WithDrawFundsModal from "./WithDrawFundsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Wallet() {
  const { user, logout, isAuthenticated, isAuthenticating } = useMoralis();
  const [showWalletModal, setShowWalletModal] =
    useRecoilState(showWalletModalState);
  const totalUsdBalance = useRecoilValue(totalUsdBalanceState);
  const walletCryptoBalance = useRecoilValue(walletCryptoBalanceState);
  const walletUsdBalance = useRecoilValue(walletUsdBalanceState);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithDrawFunds, setShowWithDrawFunds] = useState(false);

  return (
    <>
      {showWalletModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden auth-modal overflow-y-auto bottom-0 left-0 right-0 fixed md:inset-0 z-[1050] outline-none focus:outline-none">
            <div className="relative w-full max-w-[472px] mx-auto md:my-6">
              <div className="relative flex flex-col w-full  bg-[#111317] modal-border shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-end pr-5 rounded-t md:pl-8">
                  <button
                    className="bg-[#22262F] h-[42px] mt-6 mr-2 w-[42px] flex items-center justify-center rounded-full text-white duration-200 lg:hover:text-gray-300  text-xl"
                    type="button"
                    onClick={() => setShowWalletModal(false)}
                  >
                    <FontAwesomeIcon icon={solid("xmark")} />
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
                    <button
                      onClick={() => {
                        setShowAddFunds(true);
                        setShowWalletModal(false);
                      }}
                      className="bg-brand-red text padded-btn darker-red"
                    >
                      Add Funds
                    </button>
                    <button
                      onClick={() => {
                        setShowWithDrawFunds(true);
                        setShowWalletModal(false);
                      }}
                      className="bg-[#22262F] text padded-btn darker-red"
                    >
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
      <AddFundsModal
        onClose={() => setShowAddFunds(false)}
        onBack={() => {
          setShowAddFunds(false);
          setShowWalletModal(true);
        }}
        show={showAddFunds}
      />

      <WithDrawFundsModal
        onClose={() => setShowWithDrawFunds(false)}
        onBack={() => {
          setShowWithDrawFunds(false);
          setShowWalletModal(true);
        }}
        show={showWithDrawFunds}
      />
    </>
  );
}
