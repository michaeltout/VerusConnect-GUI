import { getApiData } from '../../callCreator'
import { API_SIGN_FILE, API_SIGN_MESSAGE, NATIVE } from '../../../constants/componentConstants'

/**
 * Signs data given an identity or address and returns the signature if successful
 * @param {String} chainTicker Chain to sign on
 * @param {String} address The address or identity to sign with
 * @param {String} data The data to sign or its location
 * @param {Boolean} isFile True if the data to sign is a file, and the data inputted above is its location
 */
export const signData = async (
  chainTicker,
  address,
  data,
  isFile
) => {
  try {
    return await getApiData(
      NATIVE,
      isFile ? API_SIGN_FILE : API_SIGN_MESSAGE,
      {
        chainTicker,
        address,
        data
      }
    );
  } catch (e) {
    throw e
  }
};