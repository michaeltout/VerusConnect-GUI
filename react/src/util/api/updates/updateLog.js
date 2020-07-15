import { apiGet, apiPost } from '../callCreator'
import {
  API_LOAD_UPDATE_LOG,
  API_SAVE_UPDATE_LOG
} from "../../constants/componentConstants";

export const getUpdateLog = async () => {
  try {
    return await apiGet(API_LOAD_UPDATE_LOG, {})
  } catch (e) {
    throw e
  }
}

export const saveUpdateLog = async (history) => {
  try {
    return await apiPost(API_SAVE_UPDATE_LOG, { history })
  } catch (e) {
    throw e
  }
}


