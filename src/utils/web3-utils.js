import Moralis from "moralis";
export const ethers = Moralis.web3Library;
export const connectWallet = async (moralisOptions = null) => {
  if (!Moralis.User.current()) {
    await Moralis.authenticate({
      provider: window.ethereum ? null : "walletConnect",
      ...moralisOptions,
    })
      .then(function (user) {
        console.log("logged in user:", user);
        return user;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return Moralis.User.current();
};

export const logOut = async () => {
  await Moralis.User.logOut();
  console.log("logged out");
};

/**
 * A function for connecting a contract with a web3 provider
 * @param contractAddress
 * @param ABI
 * @return array;
 */

export const contractWithProvider = async (contractAddress, ABI) => {
  if (Moralis.User.current()?.authenticated()) {
    let web3Provider = window.ethereum
      ? await Moralis.enableWeb3()
      : await Moralis.enableWeb3({ provider: "walletConnect" });
    return [
      new ethers.Contract(contractAddress, ABI, web3Provider),
      web3Provider,
    ];
  }
  return [new ethers.Contract(contractAddress, ABI), null];
};
