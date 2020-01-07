export const normalizeNum = (num, decimals = 2) => {
	var displayNum = num
  var steps = -1
	
  while (displayNum > 999 || displayNum < -999) {
		displayNum = displayNum / 1000
    steps++
	}
  
  return [Number(displayNum.toFixed(decimals)), (steps + 1) * 3]
}