import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import truncateEthAddress from "truncate-eth-address";
import Modal from "../Modal";
import { connectors, getWallets } from "./config";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import blocTix from "images/bloctix-b.png";
import ClickToCopy from "components/ClickToCopy";

export default function ConnectWallet() {
  const [isOpen, toggle] = useState(false);
  const [getWalletOpen, setGetWalletOpen] = useState(false);
  const chainId = process.env.REACT_APP_CHAIN_ID;
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();
  const login = async (options) => {
    try {
      await authenticate(options);
      window.localStorage.setItem("connectorId", options.provider);
    } catch (e) {
      console.error(e);
    }
  };

  const web3Auth = async () => {
    toggle(false);
    await login({
      provider: "web3Auth",
      clientId: process.env.REACT_APP_WEB3_AUTH_CLIENT_ID,
      chainId: 137,
      appLogo: blocTix,
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      toggle(false);
    }
  }, [isAuthenticated, user]);
  return (
    <div>
      <div className="flex items-center">
        <button
          onClick={async () =>
            isAuthenticated ? await logout() : toggle(true)
          }
          className="bg-brand-red mr-3 connect-wallet h-[45px] md:h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
        >
          {isAuthenticating ? (
            <FontAwesomeIcon className="mr-2" icon={solid("spinner")} spin />
          ) : (
            ""
          )}
          {user
            ? truncateEthAddress(account || user.get("ethAddress"))
            : isAuthenticating
            ? "Connecting"
            : "Connect Wallet"}
        </button>
        {user ? (
          <div className="bg-gray-600 h-[40px] px-3 flex items-center">
            <ClickToCopy
              buttonText={<FontAwesomeIcon icon={solid("copy")} />}
              text={`${user.get("ethAddress")}`}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <Modal
        showModal={isOpen}
        setShowModal={toggle}
        title={"Connect a Wallet"}
        content={
          <div className="flex flex-col md:flex-row md:divide-slate-300 md:divide-x">
            <div className="flex flex-row py-5 pl-5 pr-5 overflow-x-auto md:py-8 md:flex-col md:pl-8 md:pr-8">
              <div className="flex justify-between md:w-[350px] overflow-x-auto md:grid md:grid-cols-1 md:gap-5">
                {connectors.map((connector, connectorIndex) => (
                  <div
                    onClick={async () => {
                      if (connector.connectorId === "web3Auth") {
                        await web3Auth();
                        return;
                      }
                      await login({
                        provider: connector.connectorId,
                        chainId: chainId,
                        signingMessage: "Log in to BlocTix",
                      });
                    }}
                    key={`conn_${connectorIndex}`}
                    className={`${
                      !window.ethereum && connector.connectorId === "injected"
                        ? "hidden"
                        : "flex"
                    }  flex-col cursor-pointer overflow-y-hidden flex-shrink-0 md:flex-row md:items-center mr-5 }`}
                  >
                    <div className="flex justify-center md:flex-shrink-0">
                      <img
                        src={connector.icon}
                        className="h-[40px] mb-2 md:mb-0 md:mr-3"
                        alt={connector.title}
                      />
                    </div>
                    <div className="md:flex-shrink-0">
                      <h3 className="text-xs font-semibold text-center capitalize text-slate-800 md:text-left md:text-base">
                        {connector.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {getWalletOpen ? (
                <div className="pl-5 py-6 bg-slate-100 md:bg-transparent md:py-0 md:pt-8 md:pb-14 md:w-[400px] pr-5">
                  <div className="flex mb-10">
                    <button
                      className="mr-4 text-black"
                      onClick={() => setGetWalletOpen(false)}
                    >
                      <FontAwesomeIcon icon={solid("chevron-left")} />
                    </button>
                    <h3 className="flex-1 font-semibold text-center text-slate-800">
                      Get A Wallet
                    </h3>
                  </div>
                  <div>
                    {getWallets.map((wallet, index) => (
                      <div
                        key={index}
                        className={`flex justify-between ${
                          index !== parseInt(wallet.length) - 1 ? "mb-7" : ""
                        }`}
                      >
                        <div className="flex text-xs">
                          <img
                            src={wallet.icon}
                            className="h-[30px] mr-4"
                            alt={wallet.title}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {wallet.title}
                            </h3>
                            <h3 className="font-medium text-gray-500">
                              {wallet.type}
                            </h3>
                          </div>
                        </div>
                        <div>
                          <button className="px-3 py-1 text-sm font-semibold uppercase rounded-full text-brand-red bg-slate-200">
                            Get
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-10">
                    <h3 className="text-sm font-semibold text-center text-gray-800">
                      Not what you’re looking for?
                    </h3>
                    <p className="text-sm text-center text-gray-500">
                      Select a wallet{" "}
                      <span class="hidden md:inline">on the left</span>{" "}
                      <span class="md:hidden">above</span> to get started with a
                      different wallet provider.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col px-5 py-6 md:py-14 bg-slate-100 md:bg-transparent md:px-14">
                  <h3 className="font-bold text-center capitalize text-slate-800 md:text-left">
                    What is a Wallet?
                  </h3>
                  <div>
                    <p className="text-center text-slate-500 md:hidden">
                      A Wallet is used to send, receive, store, and display
                      digital assets. It is also a new way to log in, without
                      needing to create new accounts and passwords on every
                      website.
                    </p>
                  </div>
                  <div className="mt-10 text-sm hidden md:block md:max-w-[300px]">
                    <div>
                      <h3 className="font-bold capitalize text-slate-800">
                        A Home for your Digital Assets
                      </h3>
                      <p className="text-slate-500">
                        Wallets are used to send, receive, store, and display
                        digital assets like Ethereum and NFTs.
                      </p>
                    </div>
                    <div className="mt-6">
                      <h3 className="font-bold capitalize text-slate-800">
                        A New Way to Log In
                      </h3>
                      <p className="text-slate-500">
                        Instead of creating new accounts and passwords on every
                        website, just connect your wallet.
                      </p>
                    </div>
                  </div>
                  <h3 className="mt-5 md:max-w-[300px] text-sm font-semibold text-gray-600">
                    💁‍♀️: Use the Email option to connect with your email, Google
                    account and other social accounts.
                  </h3>
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => setGetWalletOpen(true)}
                      className="px-3 py-2 text-sm text-white rounded-full bg-brand-red"
                    >
                      Get A Wallet
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        }
      ></Modal>
    </div>
  );
}
