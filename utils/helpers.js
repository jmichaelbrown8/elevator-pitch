const marked = require('marked');
const sanitizeHtml = require('sanitize-html');

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
  is_liked: (likedList, userId) => {
    return likedList.reduce((prev, curr) => {
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
  /** This helper will check if the two variables passed are equal */
  is_match: (a, b) => {
    return a === b;
  },
  /** This helper will:
   * 1. convert markdown to presentable html,
   * 2. sanitize the HTML
   * 3. (client-side syntax highlighting)
   */
  format_markdown: (md) => {
    const dirtyMarkdown = marked.parse(md);
    const cleanMarkdown = sanitizeHtml(dirtyMarkdown);
    return cleanMarkdown;
  },
  /** This helper will take out any unsafe html that could allow javascript injection on the page */
  sanitize_html: (html) => sanitizeHtml(html),
};
