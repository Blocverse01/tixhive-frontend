import { connectWallet, logOut } from ".utils/web3-utils";
import { useRecoilState } from "recoil";
import truncateEthAddress from "truncate-eth-address";
import { web3User } from "recoil/atoms/web3-user";
import React from "react";

export const login = async (setUser) => {
  let loggedInUser = await connectWallet({
    signingMessage: "Log in to Bloc-Ticks",
    chainId: 137,
  });
  setUser(loggedInUser);
};

export const disconnectWallet = async (setUser) => {
  await logOut();
  setUser(null);
};

export default function ConnectWallet() {
  const [user, setUser] = useRecoilState(web3User);
  return (
    <button
      onClick={() => {
        user ? disconnectWallet(setUser) : login(setUser);
      }}
      className="bg-brand-red connect-wallet h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
    >
      {user ? truncateEthAddress(user?.get("ethAddress")) : "Connect Wallet"}
    </button>
  );
}
