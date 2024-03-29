function fromDecimalToHex(number) {
  if (typeof number !== "number") throw new Error("The input provided should be a number");
  return `0x${number.toString(16)}`;
}

function fromHexToDecimal(hex) {
  if (typeof hex !== "string") throw new Error("The input provided should be a string");
  return parseInt(hex, 16);
}

module.exports = {
  fromDecimalToHex,
  fromHexToDecimal,
};
