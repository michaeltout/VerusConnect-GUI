/**
 * Generates a random string of a certain length to be used as a user ID
 * @param {Integer} length The length of the string, default 20
 */
export const makeId = (length = 20) => {
  var result = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charLen = chars.length;
  for ( var i = 0; i < length; i++ ) {
     result += chars.charAt(Math.floor(Math.random() * charLen));
  }
  return result;
}