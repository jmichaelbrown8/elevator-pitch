const marked = require('marked');

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  is_interested: (interestList, userId) => {
    return interestList.reduce((prev, curr) => {
      if (prev) {
        return true;
      }
      // check if the current interest object includes the userId
      if (curr.id === userId) {
        return true;
      }
      // else return false
      return false;
    }, false);
  },
  as_json: (data) => JSON.stringify(data),
  is_match: (a, b) => {
    return a === b;
  },
  marked: (md) => marked.parse(md),
};
