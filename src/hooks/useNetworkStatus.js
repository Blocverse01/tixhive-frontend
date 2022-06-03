import { useChain } from "react-moralis";
import React from "react";

export default function useNetworkStatus() {
    const [isPolygon, setIsPolygon] = React.useState(false);
    const { chainId, switchNetwork, chain } = useChain();

    React.useEffect(() => {
        if (chainId === "0x89") {
            setIsPolygon(true);
        }
    }, [chainId]);
    const switchToPolygon = async () => {
        switchNetwork("0x89");
    };
    return { switchToPolygon, isPolygon, chainId, chain };
}
