import Moralis from "moralis";
import React from "react";
import { web3User } from "recoil/atoms/web3-user";
import { contracts, updateContract } from "recoil/atoms/contracts";
import useRecoilState from "recoil";

export default function Web3Boot({ children }) {
  const [user, setUser] = useRecoilState(web3User);
  const [web3Contracts, setContracts] = useRecoilState(contracts);
  React.useEffect(() => {
    setUser(Moralis.User.current());
    if (user) {
      updateContract(web3Contracts, setContracts, "eventFactory");
    }
  });
  return { children };
}
