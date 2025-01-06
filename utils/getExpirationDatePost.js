const getExpirationDatePost = (applyBeforeDays, timestamp) => {
  const expirationDate = new Date(timestamp);
  expirationDate.setDate(
    expirationDate.getDate() + parseInt(applyBeforeDays, 10)
  );
  const isClosed = expirationDate < new Date();
  return isClosed;
};

module.exports = getExpirationDatePost;
