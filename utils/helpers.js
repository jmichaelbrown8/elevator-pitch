module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
};