export function truncate([str, length]) {
  if (str.length > length) {
    var newStr = str.slice(0, length);
    return newStr;
  }
  return str;
};

export default Ember.Helper.helper(truncate);
