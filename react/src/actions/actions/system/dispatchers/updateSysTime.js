import { getSysTime } from '../../../../util/api/system/systemData'
import { SET_SYS_TIME, ERROR_SYS_TIME } from '../../../../util/constants/storeType'

/**
 * Fetches system time data (e.g. uptime) and dispatches it to the store
 * @param {Function} dispatch Redux action dispatch function
 */
export const updateSysTime = async (dispatch) => {
  let systemAction = {}
  let wasSuccess = true

  try {
    const apiResult = await getSysTime()
    if (apiResult.msg === 'success') {
      systemAction = {type: SET_SYS_TIME, sysTime: apiResult.result}
    } else {
      systemAction = {type: ERROR_SYS_TIME, result: apiResult.result}
      wasSuccess = false
    }
  } catch (e) {
    throw e
  }

  dispatch(systemAction)
  return wasSuccess
}