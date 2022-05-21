import Metamask from "../WalletIcons/metamask.svg";
import Coin98 from "../WalletIcons/Coin98.png";
import WalletConnect from "../WalletIcons/walletconnect.svg";
//import MathWallet from "../WalletIcons/MathWallet.svg";
//import SafePal from "../WalletIcons/SafePal.svg";
import TrustWallet from "../WalletIcons/trustwallet.svg";
import Email from "../WalletIcons/Email.png";

export const connectors =
    [{
        title: "Metamask",
        icon: Metamask,
        connectorId: "injected",
        priority: 1,
    }, {
        title: "Mobile Wallets",
        icon: WalletConnect,
        connectorId: "walletconnect",
        priority: 2,
    },
    {
        title: "Email",
        icon: Email,
        connectorId: "web3Auth",
        priority: 4,
    },
    {
        title: "Coin98",
        icon: Coin98,
        connectorId: "injected",
        priority: 999,
    }, {
        title: "Trust Wallet",
        icon: TrustWallet,
        connectorId: "injected",
        priority: 3,
    }];

export const getWallets = [{
    title: "Metamask",
    icon: Metamask,
    type: "Browser Extension & Mobile Wallet",
    link: "https://metamask.io/download/"
},
{
    title: "Coin98",
    icon: Coin98,
    type: "Mobile Wallet",
    link: "https://coin98.com/"
}, {
    title: "Trust Wallet",
    icon: TrustWallet,
    type: "Mobile Wallet",
    link: "https://trustwallet.com/"
}];