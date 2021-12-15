import { getApiData } from '../../callCreator'
import { API_GET_IDENTITIES } from '../../../constants/componentConstants'

/**
 * Function to get users Verus Identities on a specified chain
 * @param {String} mode (native only)
 * @param {String} chainTicker Ticker symbol for coin to fetch identities for
 * @param {Boolean} includeCanSign Whether or not to include "Can Sign" IDs
 * @param {Boolean} includeWatchOnly Whether or not to include "Watch Only" IDs
 */
export const getIdentities = async (
  mode,
  chainTicker,
  includeCanSign,
  includeWatchOnly,
  includeOffers
) => {
  let params = { chainTicker, includeCanSign, includeWatchOnly, includeOffers };
  let identites = {};

  try {
    identites = await getApiData(mode, API_GET_IDENTITIES, params);
  } catch (e) {
    throw e;
  }

  return identites;
};