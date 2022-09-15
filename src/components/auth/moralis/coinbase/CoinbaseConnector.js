import AbstractWeb3Connector from "./AbstractWeb3Connector";
import verifyChainId from "./utils/verifyChainId";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const InjectedEvents = Object.freeze({
  ACCOUNTS_CHANGED: "accountsChanged",
  CHAIN_CHANGED: "chainChanged",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
});

/**
 * Connector to connect an injected provider (like Metamask) to Moralis
 * The provider should be injected in window.ethereum
 */
class CoinbaseConnector extends AbstractWeb3Connector {
  type = "coinbase";

  static options = {};

  static setOptions({ appName = "Moralis App", appLogoUrl, darkMode = false, defaultChainId = 1, defaultRpc }) {
    CoinbaseConnector.options = {
      appLogoUrl,
      appName,
      darkMode,
      defaultChainId,
      defaultRpc,
    };
  }

  async activate() {
    const { appName, appLogoUrl, darkMode, defaultRpc, defaultChainId } = CoinbaseConnector.options;

    const coinbaseWallet = new CoinbaseWalletSDK({
      appName,
      appLogoUrl,
      darkMode,
    });
    const provider = coinbaseWallet.makeWeb3Provider(defaultRpc, defaultChainId);
    const [accounts, chainId] = await Promise.all([
      provider.request({
        method: "eth_requestAccounts",
      }),
      provider.request({ method: "eth_chainId" }),
    ]);

    const account = accounts[0] ? accounts[0].toLowerCase() : null;

    this.chainId = verifyChainId(chainId);
    this.account = account;
    this.provider = provider;

    this.subscribeToEvents(provider);

    return { provider, chainId, account };
  }

  async switchNetwork(chainId) {
    chainId = verifyChainId(chainId);

    const currentNetwork = this.chainId;
    if (currentNetwork === chainId) return;

    await this.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  }

  async addNetwork(chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl) {
    const newchainId = verifyChainId(chainId);
    await this.provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: newchainId,
          chainName: chainName,
          nativeCurrency: {
            name: currencyName,
            symbol: currencySymbol,
            decimals: 18,
          },
          rpcUrls: [rpcUrl],
          blockExplorerUrls: blockExplorerUrl ? [blockExplorerUrl] : null,
        },
      ],
    });
  }
}

export default CoinbaseConnector;
