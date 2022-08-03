import Metamask from "../WalletIcons/metamask.svg";
import Coin98 from "../WalletIcons/Coin98.png";
import WalletConnect from "../WalletIcons/walletconnect.svg";
import TrustWallet from "../WalletIcons/trustwallet.svg";
import Email from "../WalletIcons/Email.png";
import UD from "../WalletIcons/unstoppabledomain.png";
import { UAuthMoralisConnector } from "@uauth/moralis";

export const injected = {};
export const walletconnect = { provider: "walletconnect" };
UAuthMoralisConnector.setUAuthOptions({
  clientID: process.env.REACT_APP_UD_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  // Scope must include openid and wallet
  scope: "openid wallet",
  // Injected and walletconnect connectors are required
  connectors: { injected, walletconnect },
});
export const uauth = { connector: UAuthMoralisConnector };

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
    deepLink: `https://metamask.app.link/dapp/${window.location.href}?utm_from=Metamask_Dapp_Link`,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: "injected",
    priority: 3,
    deepLink: `trust://open_url?coin_id=966&url=${window.location.href}?utm_from=TrustWallet_Dapp_Link`,
  },
  {
    title: "Email",
    icon: Email,
    connectorId: "web3Auth",
    priority: 4,
  },
  {
    title: "Mobile Wallets",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Coin98",
    icon: Coin98,
    connectorId: "injected",
    priority: 999,
  },
  {
    title: "Unstoppable Domains",
    icon: UD,
    connectorId: "UAuthMoralis",
    priority: 2,
  },
];

export const getWallets = [
  {
    title: "Metamask",
    icon: Metamask,
    type: "Browser Extension & Mobile Wallet",
    link: "https://metamask.io/download/",
  },
  {
    title: "Coin98",
    icon: Coin98,
    type: "Mobile Wallet",
    link: "https://coin98.com/",
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    type: "Mobile Wallet",
    link: "https://trustwallet.com/",
  },
];
