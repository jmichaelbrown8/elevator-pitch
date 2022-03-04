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
    return interestList.reduce((prev, curr, i, arr) => {
      console.log(arr);
      console.log(prev);
      console.log(curr.user_id);
      console.log(userId);
      // check if the current interest object includes the userId
      if (curr.user_id === userId) {
        return true;
      }
      // else return false
      return false;
    }, false);
  },
};
