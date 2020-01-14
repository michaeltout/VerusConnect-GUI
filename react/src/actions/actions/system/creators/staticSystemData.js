import { getStaticSystemData } from '../../../../util/api/system/systemData'
import { SET_STATIC_DATA } from '../../../../util/constants/storeType'

/**
 * Loads the static system data from the systeminformation library
 */
export const initStaticSystemData = async () => {
  try {
    const staticData = await getStaticSystemData()
    if (staticData.msg !== 'success') throw new Error(staticData.result)
    else return setStaticSystemData(staticData.result)
  } catch (e) {
    throw e
  }
}

/**
 * Returns an action to set the static system
 * data to the store
 */
export const setStaticSystemData = (staticData) => {
  return {
    type: SET_STATIC_DATA,
    staticData
  }
}