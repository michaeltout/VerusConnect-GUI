import {
  getLocalBlacklist,
  getLocalWhitelist,
  saveLocalBlacklist,
  saveLocalWhitelist,
} from "../../../../util/api/currencies/localCurrencyData";
import {
  SET_ALL_CURRENCY_BLACKLISTS,
  SET_ALL_CURRENCY_WHITELISTS
} from "../../../../util/constants/storeType";

/**
 * Returns an action to set the local blacklist data to the redux store
 */
export const initLocalBlacklists = async () => {
  try {
    const data = await getLocalBlacklist()
    if (data.msg !== 'success') throw new Error(data.result)
    else return setAllCurrencyBlacklists(data.result)
  } catch (e) {
    throw e
  }
}

/**
 * Returns an action to set the local whitelist data to the redux store
 */
export const initLocalWhitelists = async () => {
  try {
    const data = await getLocalWhitelist()
    if (data.msg !== 'success') throw new Error(data.result)
    else return setAllCurrencyWhitelists(data.result)
  } catch (e) {
    throw e
  }
}

/**
 * Saves local currency blacklists and returns an action to dispatch to the store
 */
export const updateLocalBlacklists = async (blacklists) => {
  try {
    const data = await saveLocalBlacklist(blacklists)

    if (data.msg !== 'success') throw new Error(data.result)
    else return setAllCurrencyBlacklists(blacklists)
  } catch (e) {
    throw e
  }
}

/**
 * Saves local currency whitelists and returns an action to dispatch to the store
 */
export const updateLocalWhitelists = async (whitelists) => {
  try {
    const data = await saveLocalWhitelist(whitelists)

    if (data.msg !== 'success') throw new Error(data.result)
    else return setAllCurrencyWhitelists(whitelists)
  } catch (e) {
    throw e
  }
}

/**
 * Returns an action to set the stored currency blacklist 
 * data to the store 
 */
export const setAllCurrencyBlacklists = (data) => {
  return {
    type: SET_ALL_CURRENCY_BLACKLISTS,
    data
  }
}

/**
 * Returns an action to set the stored currency whitelist 
 * data to the store 
 */
export const setAllCurrencyWhitelists = (data) => {
  return {
    type: SET_ALL_CURRENCY_WHITELISTS,
    data
  }
}