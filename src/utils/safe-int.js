export const safeInt = (value) => {
  return isNaN(parseInt(value)) ? 0 : parseInt(value);
};
