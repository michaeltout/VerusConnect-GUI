import { apiGet, apiPost } from '../callCreator'
import { LOAD_CONFIG, RESET_CONFIG, SAVE_CONFIG, GET_SCHEMA } from '../../constants/componentConstants'

/**
 * Loads the config, or creates a blank one
 */
export const loadConfig = async () => {
  try {
    const res = await apiGet(LOAD_CONFIG)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}

/**
 * Gets the config schema object from the api
 */
export const getConfigSchema = async () => {
  try {
    const res = await apiGet(GET_SCHEMA)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}

/**
 * Saves a config object to the config file
 * @param {Object} configObj 
 */
export const saveConfig = async (configObj) => {
  try {
    const res = await apiPost(SAVE_CONFIG, {configObj})
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}

/**
 * Resets the config file to default values
 */
export const resetConfig = async () => {
  try {
    const res = await apiPost(RESET_CONFIG)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}