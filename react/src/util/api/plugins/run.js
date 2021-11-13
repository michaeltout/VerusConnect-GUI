import {
  API_AUTHENTICATE_COIN,
  API_MAKE_LOGIN_CONSENT_REQUEST,
  API_RUN_PLUGIN,
} from "../../constants/componentConstants";
import { apiPost } from "../callCreator";

/**
 * Attempts to run the plugin with specified id
 * @param {String} id
 */
export const runPlugin = async (id, builtin) => {
  try {
    const res = await apiPost(API_RUN_PLUGIN, { id, builtin });
    if (res.msg !== "success") throw new Error(res.result);
    else return res.result;
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
};

/**
 * Attempts to authenticate a coin
 * @param {String} chainTicker
 * @param {String} mode
 */
export const authenticateCoin = async (chainTicker, mode) => {
  try {
    const res = await apiPost(API_AUTHENTICATE_COIN, { chainTicker, mode });
    if (res.msg !== "success") throw new Error(res.result);
    else return res.result;
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
};

export const makeLoginConsentRequest = async (
  chainId,
  signer,
  signature,
  timestamp,
  challenge,
  redirectUrl,
  onBehalfOf,
  request
) => {
  try {
    const res = await apiPost(API_MAKE_LOGIN_CONSENT_REQUEST, {
      chainId,
      signer,
      signature,
      timestamp,
      challenge,
      redirectUrl,
      onBehalfOf,
      request,
    });
    if (res.msg !== "success") throw new Error(res.result);
    else return res.result;
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
};
