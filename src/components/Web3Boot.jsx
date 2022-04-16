import React from "react";
import { eventFactoryState } from "recoil/atoms/contracts";
import { useRecoilState } from "recoil";
import { enableContract } from "utils/web3-utils";
import { useMoralis } from "react-moralis";

export default function Web3Boot({ children }) {
  const { isWeb3Enabled, enableWeb3, web3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
  const connectorId = window.localStorage.getItem("connectorId");
  const [EventFactory, setEventFactory] = useRecoilState(eventFactoryState);
  React.useEffect(() => {
    async function bootWeb3() {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
        await enableWeb3({ provider: connectorId });
        setEventFactory(await enableContract(EventFactory.deployedAddress, EventFactory.abi, web3));
      }
    }
    bootWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  return <>{children}</>;
}
