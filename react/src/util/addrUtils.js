import { ELECTRUM, ETH, NATIVE } from './constants/componentConstants';
import { isValidAddress } from 'ethereumjs-util'

const { addressVersionCheck } = require('agama-wallet-lib/src/keys');
const networks = require('agama-wallet-lib/src/bitcoinjs-networks');

/**
 * Returns a boolean indicating whether an address is valid
 * for a specified mode and chainTicker.
 * @param {String} address 
 * @param {String} mode 
 * @param {String} chainTicker 
 */
export const checkAddrValidity = (address, mode, chainTicker) => {
  //Validate IDs
  if ((chainTicker === 'VRSC' || chainTicker === 'VRSCTEST') && (address[address.length - 1] === '@' || address[0] === 'i')) {
    return true
  } else if (mode === ELECTRUM || mode === NATIVE) {
    let addrCheck = addressVersionCheck(networks[chainTicker.toLowerCase()] || networks.kmd, address)

    if (
      addrCheck === true ||
      (address[0] === "z" &&
        (address.length === 95 || address.length === 78)) ||
      (chainTicker === "BTC" &&
        address.length > 3 &&
        address.substring(0, 3).toLowerCase() === "bc1")
    )
      return true;
    else return false;
  } else if (mode === ETH) {
    return isValidAddress(address)
  }

  return false
}