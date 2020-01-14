import { getApiData } from "../../callCreator";
import {
  API_VERIFY_FILE,
  API_VERIFY_MESSAGE,
  NATIVE,
  FILE_DATA,
  TEXT_DATA,
  API_VERIFY_HASH
} from "../../../constants/componentConstants";

/**
 * Verifies if a signature matches the data it is supposed to have signed
 * @param {String} chainTicker Chain to verify data on
 * @param {String} address The address or identity the data was signed with
 * @param {String} data The data that was signed or its location
 * @param {String} signature The signature that the signed data produced
 * @param {Number} dataType The number specifying what type of data to sign, 0 is text, and 1 is file
 */
export const verifyData = async (
  chainTicker,
  address,
  data,
  signature,
  dataType
) => {
  try {
    return await getApiData(
      NATIVE,
      dataType === FILE_DATA
        ? API_VERIFY_FILE
        : dataType === TEXT_DATA
        ? API_VERIFY_MESSAGE
        : API_VERIFY_HASH,
      {
        chainTicker,
        address,
        data,
        signature
      }
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};
