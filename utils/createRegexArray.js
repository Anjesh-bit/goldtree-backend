const createRegexArray = (commaSeparatedString) => {
  return commaSeparatedString
    .split(",")
    .map((item) => new RegExp(item.trim(), "i"));
};

module.exports = { createRegexArray };
