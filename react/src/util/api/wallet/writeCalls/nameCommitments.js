import { getApiData } from '../../callCreator'
import { API_REGISTER_ID_NAME, NATIVE, API_REGISTER_ID_NAME_PREFLIGHT, API_DELETE_NAME_COMMITMENT } from '../../../constants/componentConstants'

/**
 * Deletes a name commitment from the stored name commitments and returns true if if was found and deleted
 * and false if it was not found
 * @param {String} chainTicker The chain to create the name commitment on
 * @param {String} name The name of the commitment to delete
 */
export const deleteIdName = async (chainTicker, name) => {
  try {
    return await getApiData(
      NATIVE,
      API_DELETE_NAME_COMMITMENT,
      {
        chainTicker,
        name
      }
    );
  } catch (e) {
    throw e
  }
};

/**
 * Creates a name commitment for a Verus ID
 * @param {String} preflight Whether or not to actually register the ID name or just return data to confirm
 * @param {String} chainTicker The chain to create the name commitment on
 * @param {String} name The name to create a commitment for 
 * @param {String} controlAddress The address that the name will be attached to
 * @param {String} referralId The refferal id that can be used for a creation discount
 */
export const registerIdName = async (
  preflight,
  chainTicker,
  name,
  controlAddress,
  referralId
) => {
  try {
    return await getApiData(
      NATIVE,
      preflight ? API_REGISTER_ID_NAME_PREFLIGHT : API_REGISTER_ID_NAME,
      {
        chainTicker,
        name,
        controlAddress,
        referralId
      }
    );
  } catch (e) {
    throw e
  }
};