import { getApiData } from '../../callCreator'
import {
  API_REGISTER_ID,
  NATIVE,
  API_REGISTER_ID_PREFLIGHT,
  API_RECOVER_ID_PREFLIGHT,
  API_REVOKE_ID,
  API_RECOVER_ID,
  API_UPDATE_ID_PREFLIGHT,
  API_UPDATE_ID,
} from "../../../constants/componentConstants";

/**
 * Creates an ID registration transaction and sends it to the specified chain
 * @param {String} preflight Whether or not to actually register the ID or just return data to confirm
 * @param {String} chainTicker Chain to create a Verus ID on
 * @param {String} name The name of the ID as specified in the name reservation
 * @param {String} txid The txid of the name reservation
 * @param {String} salt The salt returned from the name reservation
 * @param {String[]} primaryaddresses An array of primary addresses for the ID, (should include name registration address)
 * @param {Number} minimumsignatures The minimum number of signatures to sign a transaction with this ID
 * @param {Object} contentmap A map of content hashes to associate to this ID
 * @param {String} revocationauthority The ID of the revocation authority for this ID (can be itself)
 * @param {String} recoveryauthority The ID of the recovery authority for this ID (can be itself)
 * @param {String} privateaddress The private address associated with this ID
 * @param {Number} idFee The amount the user is willing to pay for their ID (min 100)
 * @param {Number} referral The referral for this ID (optional)
 */
export const registerId = async (
  preflight,
  chainTicker,
  name,
  txid,
  salt,
  primaryaddresses,
  minimumsignatures,
  contentmap,
  revocationauthority,
  recoveryauthority,
  privateaddress,
  idFee,
  referral
) => {
  try {
    return await getApiData(
      NATIVE,
      preflight ? API_REGISTER_ID_PREFLIGHT : API_REGISTER_ID,
      {
        chainTicker,
        name,
        txid,
        salt,
        primaryaddresses,
        minimumsignatures,
        contentmap,
        revocationauthority,
        recoveryauthority,
        privateaddress,
        idFee,
        referral
      }
    );
  } catch (e) {
    throw e
  }
};

/**
 * Creates an ID recovery transaction and sends it to the specified chain
 * @param {String} preflight Whether or not to actually register the ID or just return data to confirm
 * @param {String} chainTicker Chain to recover a Verus ID on
 * @param {String} name The name of the ID
 * @param {String[]} primaryaddresses An array of primary addresses for the ID
 * @param {Number} minimumsignatures The minimum number of signatures to sign a transaction with this ID
 * @param {Object} contentmap A map of content hashes to associate to this ID
 * @param {String} revocationauthority The ID of the revocation authority for this ID (can be itself)
 * @param {String} recoveryauthority The ID of the recovery authority for this ID (can be itself)
 * @param {String} privateaddress The private address associated with this ID
 */
export const recoverId = async (
  preflight,
  chainTicker,
  name,
  primaryaddresses,
  minimumsignatures,
  contentmap,
  revocationauthority,
  recoveryauthority,
  privateaddress,
) => {
  try {
    return await getApiData(
      NATIVE,
      preflight ? API_RECOVER_ID_PREFLIGHT : API_RECOVER_ID,
      {
        preflight,
        chainTicker,
        name,
        primaryaddresses,
        minimumsignatures,
        contentmap,
        revocationauthority,
        recoveryauthority,
        privateaddress,
      }
    );
  } catch (e) {
    throw e
  }
};

/**
 * Creates an ID update transaction and sends it to the specified chain
 * @param {String} preflight Whether or not to actually register the ID or just return data to confirm
 * @param {String} chainTicker Chain to recover a Verus ID on
 * @param {String} name The name of the ID
 * @param {String[]} primaryaddresses An array of primary addresses for the ID
 * @param {Number} minimumsignatures The minimum number of signatures to sign a transaction with this ID
 * @param {Object} contentmap A map of content hashes to associate to this ID
 * @param {String} revocationauthority The ID of the revocation authority for this ID (can be itself)
 * @param {String} recoveryauthority The ID of the recovery authority for this ID (can be itself)
 * @param {String} privateaddress The private address associated with this ID
 */
 export const updateId = async (
  preflight,
  chainTicker,
  name,
  primaryaddresses,
  minimumsignatures,
  contentmap,
  revocationauthority,
  recoveryauthority,
  privateaddress,
) => {
  try {
    return await getApiData(
      NATIVE,
      preflight ? API_UPDATE_ID_PREFLIGHT : API_UPDATE_ID,
      {
        preflight,
        chainTicker,
        name,
        primaryaddresses,
        minimumsignatures,
        contentmap,
        revocationauthority,
        recoveryauthority,
        privateaddress,
      }
    );
  } catch (e) {
    throw e
  }
};

/**
 * Creates an ID revocation transaction and sends it to the specified chain
 * @param {String} chainTicker Chain to revoke a Verus ID on
 * @param {String} name The name of the ID
 */
export const revokeIdentity = async (
  chainTicker,
  name,
) => {
  try {
    return await getApiData(
      NATIVE,
      API_REVOKE_ID,
      {
        chainTicker,
        name,
      }
    );
  } catch (e) {
    throw e
  }
};