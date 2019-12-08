//Math done to eliminate JS rounding errors when moving from statoshis to coin denominations
export const coinsToSats = (coins) => {
  return (Math.round(coins*10000000000))/100
}

export const satsToCoins = (satoshis) => {
  return (Math.round(satoshis))/100000000
}