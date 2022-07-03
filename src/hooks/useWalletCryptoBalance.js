import React from "react";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";

export default function useWalletCryptoBalance() {
    const Web3Api = useMoralisWeb3Api();
    const { user, isInitialized } = useMoralis();
    const walletAddress = user?.get("ethAddress");
    const fetchMaticBalance = async () => {
        const options = {
            chain: "polygon",
            address: walletAddress,
        };
        const maticBalance = await Web3Api.account.getNativeBalance(options);
        return maticBalance.balance;
    };
    const fetchUsdtBalance = async () => {
        const options = {
            chain: "polygon",
            address: walletAddress,
        };
        const balances = await Web3Api.account.getTokenBalances(options);
        const usdtBalance = balances.find(
            (balance) => balance.token_address === "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
        );
        return usdtBalance?.balance || "0";
    };
    const [maticBalance, setMaticBalance] = React.useState(0);
    const [usdtBalance, setUsdtBalance] = React.useState(0);
    React.useEffect(() => {
        const fetchBalance = async () => {
            if (user) {
                const maticBalance = await fetchMaticBalance();
                const usdtBalance = await fetchUsdtBalance();
                setMaticBalance(maticBalance);
                setUsdtBalance(usdtBalance);
            }
        };
        if (isInitialized) {
            fetchBalance();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isInitialized]);

    return { maticBalance: maticBalance, usdtBalance: usdtBalance };
}
