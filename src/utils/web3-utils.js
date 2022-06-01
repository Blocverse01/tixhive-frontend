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

export const convertBalanceToEther = (balance, decimal = 18) => {
  const bigNumber = ethers.BigNumber.from(balance);
  return Number(ethers.utils.formatUnits(bigNumber, decimal)).toFixed(2);
}

export const calculateUsdValue = (usd, balance, decimal = 18) => {
  const ether = convertBalanceToEther(balance, decimal);
  return Number(parseFloat(ether) * parseFloat(usd.toString())).toFixed(2);
};
