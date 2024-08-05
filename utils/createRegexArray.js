const createRegexArray = (commaSeparatedString) => {
  return commaSeparatedString
    .split(",")
    .map((item) => item.trim().toLowerCase());
};

module.exports = { createRegexArray };
