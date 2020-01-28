import { getApiData } from '../../callCreator'
import { NATIVE, API_SHIELDCOINBASE, API_SHIELDCOINBASE_PREFLIGHT, POST } from '../../../constants/componentConstants'

/**
 * Shield any unshielded coinbase transactions to an address
 * @param {Boolean} preflight If true, nothing will be sent, and information for the user to confirm will be returned
 * @param {String} chainTicker The chainticker to shield coinbases in 
 * @param {String} toAddress The address to shield to
 * @param {String} fromAddress (optional) The address to shield from, leave blank for max unshielded funds
 * @param {Number} fee (optional) A custom tx fee
 * @param {Number} limit (optional) A custom limit on the number of unshielded utxos to shield
 */
export const shieldCoinbase = async (
  preflight = true,
  chainTicker,
  toAddress,
  fromAddress,
  fee,
  limit
) => {
  return await getApiData(
    NATIVE,
    preflight ? API_SHIELDCOINBASE_PREFLIGHT : API_SHIELDCOINBASE,
    {
      chainTicker,
      toAddress,
      fromAddress,
      fee,
      limit
    },
    POST
  );
};