//exp in minutes
const getExpiration = (min) => {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + min);
  return expiryDate;
};

export default getExpiration;
