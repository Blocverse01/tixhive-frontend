import { useChain, useMoralis } from "react-moralis";
import React from "react";

export default function useNetworkStatus() {
    const [isPolygon, setIsPolygon] = React.useState(false);
    const { chainId, switchNetwork, chain } = useChain();
    const { isWeb3Enabled, isAuthenticated } = useMoralis();
    const connectorId = window.localStorage.getItem("connectorId");

    React.useEffect(() => {
        console.log(`chainId: ${chainId}`);
        if (chainId === "0x89") {
            setIsPolygon(true);
        } else if (isAuthenticated && connectorId === "web3Auth") {
            setIsPolygon(true);
        }
        else {
            setIsPolygon(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainId, isWeb3Enabled, isAuthenticated]);
    const switchToPolygon = async () => {
        switchNetwork("0x89");
    };
    return { switchToPolygon, isPolygon, chainId, chain };
}
