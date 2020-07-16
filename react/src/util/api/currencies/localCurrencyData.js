import { apiGet, apiPost } from '../callCreator'
import {
  API_LOAD_LOCAL_BLACKLIST,
  API_LOAD_LOCAL_WHITELIST,
  API_SAVE_LOCAL_BLACKLIST,
  API_SAVE_LOCAL_WHITELIST
} from "../../constants/componentConstants";

export const getLocalBlacklist = async () => {
  try {
    return await apiGet(API_LOAD_LOCAL_BLACKLIST, {})
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getLocalWhitelist = async () => {
  try {
    return await apiGet(API_LOAD_LOCAL_WHITELIST, {})
  } catch (e) {
    throw new Error(e.message)
  }
}

export const saveLocalBlacklist = async (blacklist) => {
  try {
    return await apiPost(API_SAVE_LOCAL_BLACKLIST, { blacklist })
  } catch (e) {
    throw new Error(e.message)
  }
}

export const saveLocalWhitelist = async (whitelist) => {
  try {
    return await apiPost(API_SAVE_LOCAL_WHITELIST, { whitelist })
  } catch (e) {
    throw new Error(e.message)
  }
}


