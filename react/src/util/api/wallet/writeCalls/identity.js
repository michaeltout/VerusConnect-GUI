import { getApiData } from '../../callCreator'
import { API_REGISTER_ID_NAME, API_REGISTER_ID, NATIVE } from '../../../constants/componentConstants'

/**
 * Creates a name commitment for a Verus ID
 * @param {String} chainTicker The chain to create the name commitment on
 * @param {String} name The name to create a commitment for 
 * @param {String} controlAddress The address that the name will be attached to
 * @param {String} referralId The refferal id that can be used for a creation discount
 */
export const registerIdName = async (
  chainTicker,
  name,
  controlAddress,
  referralId
) => {
  try {
    return await getApiData(
      NATIVE,
      API_REGISTER_ID_NAME,
      {
        coin: chainTicker,
        name,
        controlAddress,
        referralId
      }
    );
  } catch (e) {
    throw e
  }
};

/**
 * Creates an ID registration transaction and sends it to the specified chain
 * @param {String} chainTicker Chain to create a Verus ID on
 * @param {String} name The name of the ID as specified in the name reservation
 * @param {String} txid The txid of the name reservation
 * @param {String} salt The salt returned from the name reservation
 * @param {String[]} primaryaddresses An array of primary addresses for the ID, (should include name registration address)
 * @param {Number} minimumsignatures The minimum number of signatures to sign a transaction with this ID
 * @param {String[]} contenthashes An array of content hashes to associate to this ID
 * @param {String} revocationauthorityid The ID of the revocation authority for this ID (can be itself)
 * @param {String} recoveryauthorityid The ID of the recovery authority for this ID (can be itself)
 * @param {String} privateaddress The private address associated with this ID
 */
export const registerId = async (
  chainTicker,
  name,
  txid,
  salt,
  primaryaddresses,
  minimumsignatures,
  contenthashes,
  revocationauthorityid,
  recoveryauthorityid,
  privateaddress
) => {
  try {
    return await getApiData(
      NATIVE,
      API_REGISTER_ID,
      {
        coin: chainTicker,
        name,
        txid,
        salt,
        primaryaddresses,
        minimumsignatures,
        contenthashes,
        revocationauthorityid,
        recoveryauthorityid,
        privateaddress
      }
    );
  } catch (e) {
    throw e
  }
};