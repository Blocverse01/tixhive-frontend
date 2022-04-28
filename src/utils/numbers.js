export const safeInt = (value) => {
  return isNaN(parseInt(value)) ? 0 : +(parseInt(value, 10));
};

export const safeFloat = (value) => {
  return isNaN(parseFloat(value.toString())) ? 0.00 : parseFloat(value.toString());
}
