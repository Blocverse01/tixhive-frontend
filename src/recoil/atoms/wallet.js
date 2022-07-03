import { atom, selector } from "recoil";

export const walletCryptoBalanceState = atom({
    key: "walletCryptoBalance",
    default: {
        maticBalance: "0",
        usdtBalance: "0",
    },
});

export const walletUsdBalanceState = atom({
    key: "walletUsdBalance",
    default: {
        maticUsd: "0",
        usdtUsd: "0",
    },
})

export const totalUsdBalanceState = selector({
    key: "totalUsdBalance",
    get: ({ get }) => {
        const usdBalance = get(walletUsdBalanceState);
        return Number(parseFloat(usdBalance.maticUsd) + parseFloat(usdBalance.usdtUsd)).toFixed(2);
    }
})

export const showWalletModalState = atom({
    key: "showWalletModal",
    default: false,
});