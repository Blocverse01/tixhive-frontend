import React from "react";
import { useMoralis } from "react-moralis";

export default function Web3Boot({ children }) {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, user } = useMoralis();
  const connectorId = window.localStorage.getItem("connectorId");
  React.useEffect(() => {
    async function bootWeb3() {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
        console.log("enabling web3");
        await enableWeb3({ provider: connectorId });
      }
    }
    bootWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled, user]);
  return <>{children}</>;
}
