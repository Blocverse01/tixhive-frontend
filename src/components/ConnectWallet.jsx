import { useMoralis } from "react-moralis";
import truncateEthAddress from "truncate-eth-address";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function ConnectWallet() {
  const chainId = 137;
  const connectorId = window.ethereum ? "injected" : "walletconnect";
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: "Log in to BlocTicks",
        chainId: chainId,
        provider: connectorId,
      });
      window.localStorage.setItem("connectorId", connectorId);
    }
  };
  const logOut = async () => {
    await logout();
    console.log("logged out");
  };
  return (
    <button
      onClick={async () => {
        user ? await logOut() : await login();
      }}
      className="bg-brand-red connect-wallet h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
      disabled={isAuthenticating}
    >
      {isAuthenticating ? <FontAwesomeIcon icon={solid("spinner")} spin /> : ""}{" "}
      {user ? truncateEthAddress(account || user.get("ethAddress")) : "Connect Wallet"}
    </button>
  );
}
