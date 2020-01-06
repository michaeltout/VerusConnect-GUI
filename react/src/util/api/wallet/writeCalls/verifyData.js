import { getApiData } from '../../callCreator'
import { API_VERIFY_FILE, API_VERIFY_MESSAGE, NATIVE } from '../../../constants/componentConstants'

/**
 * Verifies if a signature matches the data it is supposed to have signed
 * @param {String} chainTicker Chain to verify data on
 * @param {String} address The address or identity the data was signed with
 * @param {String} data The data that was signed or its location
 * @param {String} signature The signature that the signed data produced
 * @param {Boolean} isFile True if the data signed is a file, and the data inputted above is its location
 */
export const verifyData = async (
  chainTicker,
  address,
  data,
  signature,
  isFile
) => {
  try {
    return await getApiData(
      NATIVE,
      isFile ? API_VERIFY_FILE : API_VERIFY_MESSAGE,
      {
        chainTicker,
        address,
        data,
        signature
      }
    );
  } catch (e) {
    console.error(e)
    throw e
  }
};