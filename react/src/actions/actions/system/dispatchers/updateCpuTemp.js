import { getCpuTemp } from '../../../../util/api/system/systemData'
import { SET_CPU_TEMP, ERROR_CPU_TEMP } from '../../../../util/constants/storeType'

/**
 * Fetches cpu temperature data and dispatches it to the store
 * @param {Function} dispatch Redux action dispatch function
 */
export const updateCpuTemp = async (dispatch) => {
  let systemAction = {}
  let wasSuccess = true

  try {
    const apiResult = await getCpuTemp()
    if (apiResult.msg === 'success') {      
      systemAction = {type: SET_CPU_TEMP, cpuTemp: apiResult.result}
    } else {
      systemAction = {type: ERROR_CPU_TEMP, result: apiResult.result}
      wasSuccess = false
    }
  } catch (e) {
    throw e
  }

  dispatch(systemAction)
  return wasSuccess
}