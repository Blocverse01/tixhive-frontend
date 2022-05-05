import { useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { eventsState } from "recoil/atoms/events";
import { useRecoilState } from "recoil";

export default function Web3Boot({ children }) {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useRecoilState(eventsState);
  const { fetch } = useMoralisQuery("Event", (query) => query.descending("createdAt"), [], { autoFetch: false });
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, user, isInitialized } = useMoralis();
  const connectorId = window.localStorage.getItem("connectorId");
  useEffect(() => {
    async function bootWeb3() {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
        console.log("enabling web3");
        await enableWeb3({ provider: connectorId, chainId: chainId });
      }
    }
    bootWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled, user]);
  useEffect(() => {
    async function fetchEvents() {
      const blocEvents = (await fetch()) || [];
      console.log(blocEvents, await fetch());
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
