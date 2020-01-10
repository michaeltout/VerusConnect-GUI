import { getCpuLoad } from '../../../../util/api/system/systemData'
import { SET_CPU_LOAD, ERROR_CPU_LOAD } from '../../../../util/constants/storeType'

/**
 * Fetches cpu load data and dispatches it to the store
 * @param {Function} dispatch Redux action dispatch function
 */
export const updateCpuLoad = async (dispatch) => {
  let systemAction = {}
  let wasSuccess = true

  try {
    const apiResult = await getCpuLoad()
    if (apiResult.msg === 'success') {      
      systemAction = {type: SET_CPU_LOAD, cpuLoad: apiResult.result}
    } else {
      systemAction = {type: ERROR_CPU_LOAD, result: apiResult.result}
      wasSuccess = false
    }
  } catch (e) {
    throw e
  }

  dispatch(systemAction)
  return wasSuccess
}