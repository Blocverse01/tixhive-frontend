/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { eventsState } from "recoil/atoms/events";
import { useRecoilState } from "recoil";
import useWalletCryptoBalance from "hooks/useWalletCryptoBalance";
import useWalletUsdBalance from "hooks/useWalletUsdBalance";
import {
  walletCryptoBalanceState,
  walletUsdBalanceState,
} from "recoil/atoms/wallet-balance";

export default function Web3Boot({ children }) {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  const [events, setEvents] = useRecoilState(eventsState);
  const { fetch } = useMoralisQuery(
    "Event",
    (query) => query.descending("createdAt"),
    [],
    { autoFetch: false }
  );
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    user,
    isInitialized,
  } = useMoralis();
  const [walletCryptoBalance, setWalletCryptoBalance] = useRecoilState(
    walletCryptoBalanceState
  );
  const [walletUsdBalance, setWalletUsdBalance] = useRecoilState(
    walletUsdBalanceState
  );
  const { maticBalance, usdtBalance } = useWalletCryptoBalance();
  const { maticUsd, usdtUsd } = useWalletUsdBalance(maticBalance, usdtBalance);
  const connectorId = window.localStorage.getItem("connectorId");
  useEffect(() => {
    async function bootWeb3() {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
        console.log("enabling web3");
        await enableWeb3({ provider: connectorId, chainId: chainId });
      }
    }
    bootWeb3();
    if (user) {
      setWalletCryptoBalance({ maticBalance, usdtBalance });
      setWalletUsdBalance({ maticUsd, usdtUsd });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAuthenticated,
    isWeb3Enabled,
    user,
    maticBalance,
    usdtBalance,
    maticUsd,
    usdtUsd,
  ]);
  useEffect(() => {
    async function fetchEvents() {
      const blocEvents = (await fetch()) || [];
      setEvents(
        blocEvents.map((eventObject) => {
          return {
            ...eventObject.attributes,
          };
        })
      );
    }
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);
  return <>{children}</>;
}
