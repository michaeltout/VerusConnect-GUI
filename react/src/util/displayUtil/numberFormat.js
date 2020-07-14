/**
 * Normalizes a number and returns an array containing the normalized
 * number, the power of 10 to multiply it by in order to get the 
 * original value (only normalizes large numbers down), and the letter
 * value representation of that power of 10
 * @param {Number} num The number to normalize
 * @param {Number} decimals Number of decimals to normalize to
 */
export const normalizeNum = (num, decimals = 2) => {
	var displayNum = num
  var steps = -1
  const numPostfixes = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
	
  while (displayNum > 999 || displayNum < -999) {
		displayNum = displayNum / 1000
    steps++
	}
  
  return [
    Number(displayNum.toFixed(decimals)),
    (steps + 1) * 3,
    steps > -1 && steps < numPostfixes.length ? numPostfixes[steps] : (steps > -1 ? `e${(steps + 1) * 3}` : '')
  ];
}