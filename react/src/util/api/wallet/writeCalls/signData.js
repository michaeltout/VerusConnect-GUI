import { getApiData } from '../../callCreator'
import { API_SIGN_FILE, API_SIGN_MESSAGE, NATIVE, TEXT_DATA } from '../../../constants/componentConstants'

/**
 * Signs data given an identity or address and returns the signature and hash if successful
 * @param {String} chainTicker Chain to sign on
 * @param {String} address The address or identity to sign with
 * @param {String} data The data to sign or its location
 * @param {Number} dataType The number specifying what type of data to sign, 0 is text, and 1 is file
 */
export const signData = async (
  chainTicker,
  address,
  data,
  dataType
) => {
  try {
    return await getApiData(
      NATIVE,
      dataType === TEXT_DATA ? API_SIGN_MESSAGE : API_SIGN_FILE,
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