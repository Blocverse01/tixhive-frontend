import Moralis from "moralis";

export const ethers = Moralis.web3Library;

/**
 * A function for connecting a contract with a web3 provider
 * @param contractAddress
 * @param ABI
 * @param web3Provider
 * @return new ethers.Contract;
 */

export const enableContract = async (contractAddress, ABI, web3Provider) => {
  const Contract = new ethers.Contract(contractAddress, ABI, web3Provider);
  return Contract;
};
