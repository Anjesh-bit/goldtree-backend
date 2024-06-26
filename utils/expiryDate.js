const getExpiration = (days) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  expiryDate.toUTCString();
  return expiryDate;
};

module.exports = getExpiration;
