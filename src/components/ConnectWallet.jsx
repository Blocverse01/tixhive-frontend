import Moralis from "moralis";
import { connectWallet, logOut } from "../utils/web3-utils";
import { useState } from "react";
import truncateEthAddress from "truncate-eth-address";

export default function ConnectWallet() {
  const [user, setUser] = useState(Moralis.User.current());
  const login = async () => {
    let loggedInUser = await connectWallet({
      signingMessage: "Log in to Bloc-Ticks",
      chainId: 137,
    });
    setUser(loggedInUser);
  };
  const disconnectWallet = async () => {
    await logOut();
    setUser(null);
  };
  return (
    <button
      onClick={() => {
        user ? disconnectWallet() : login();
      }}
      className="bg-brand-red connect-wallet h-[56px] px-5 lg:px-0 lg:w-[170px] text-white text-[18px] leading-[35px] flex justify-center items-center"
    >
      {user ? truncateEthAddress(user?.get("ethAddress")) : "Connect Wallet"}
    </button>
  );
}
