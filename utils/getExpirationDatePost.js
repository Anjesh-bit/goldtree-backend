const getExpirationDatePost = (applyBeforeDays, timestamp) => {
  const expirationDate = new Date(timestamp);
  expirationDate.setDate(expirationDate.getDate() + applyBeforeDays);
  const isClosed = expirationDate < new Date();
  return isClosed;
};

module.exports = getExpirationDatePost;
