import { saveConfig, loadConfig, getConfigSchema } from '../../../../util/api/settings/configData'
import { SET_CONFIG, SET_CONFIG_SCHEMA } from '../../../../util/constants/storeType'
import { useStringAsKey, editValueByKeyPath } from '../../../../util/objectUtil'

/**
 * Loads the config object from the config file and returns
 * two actions in an array, an action from the loaded config file, and the
 * config schema stored in the main wallet repo.
 */
export const initConfig = async () => {
  try {
    return [setConfig(await loadConfig()), setConfigSchema(await getConfigSchema())]
  } catch (e) {
    throw e
  }
}

/**
 * Sets certain config values, updates the config file, 
 * and returns an action to dispatch to the store.
 * @param {Object} configObj The current config object
 * @param {Object} params The config paramters to change
 * @param {String} configLocation The location of the parameter to change (optional)
 */
export const setConfigParams = async (configObj, params, configLocation = null) => {
  const newConfig =
    configLocation == null
      ? { ...configObj, ...params }
      : editValueByKeyPath(configObj, configLocation.split('.'), { ...useStringAsKey(configObj, configLocation), ...params })
  
  try {
    await saveConfig(newConfig)
    return setConfig(newConfig)
  } catch (e) {
    throw e
  }
}

/**
 * Creates an action to set the config object in the redux store
 * @param {Object} configObj A config json object
 */
export const setConfig = (configObj) => {
  return {type: SET_CONFIG, config: configObj}
}

/**
 * Creates an action to set the config schema object in the redux store
 * @param {Object} schemaObj A config schema json object
 */
export const setConfigSchema = (schemaObj) => {
  return {type: SET_CONFIG_SCHEMA, schema: schemaObj}
}