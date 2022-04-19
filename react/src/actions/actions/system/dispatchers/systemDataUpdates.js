import { updateSysTime } from './updateSysTime'
import { updateCpuTemp } from './updateCpuTemp'
import { updateCpuLoad } from './updateCpuLoad'
import { readNavigationUrl } from '../../../../util/navigationUtils'
import {
  API_ABORTED,
  API_ERROR,
  API_SUCCESS,
  WARNING_SNACK,
  MID_LENGTH_ALERT,
  API_GET_SYS_TIME,
  API_GET_CPU_LOAD,
  API_GET_CPU_TEMP,
  API_UNSUPPORTED_SYSTEM_CALL
} from '../../../../util/constants/componentConstants'
import {
  disableUpdateWarningSnack,
  enableUpdateWarningSnack,
  newSnackbar,
  logDebugWarning
} from "../../../actionCreators";
import { occupySystemApiCall, freeSystemApiCall } from '../../updateManager'

// Map of update functions to be able to call them through standardized 
// API call constants. Each function requires the same three parameters: (store, mode, chainTicker)
export const systemDataUpdates = {
  [API_GET_SYS_TIME]: updateSysTime,
  [API_GET_CPU_LOAD]: updateCpuLoad,
  [API_GET_CPU_TEMP]: updateCpuTemp
}

/**
 * Calls an api fetch and dispatch function if all conditions of an update are met according
 * to that updates tracker in the store. Returns 'aborted' if api call was not made due to conditions,
 * 'success' if the call succeeded and 'error' if the call failed.
 * @param {Object} state Reference to redux state
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} updateId Name of system API call to update
 */
export const conditionallyUpdateSystemData = async (state, dispatch, updateId) => {
  const updateInfo = state.updates.systemUpdateTracker[updateId]
  const currentModalPath = state.navigation.modalPath
  const currentMainPath = state.navigation.mainPath

  if (updateInfo && !updateInfo.busy) {
    // -1 denotes a failed restriction test, 0 denotes empty, and 1 denotes a pass
    let testPassed = true
    
    if (updateInfo.location_restrictions && updateInfo.location_restrictions.length > 0) {
      testPassed = updateInfo.location_restrictions.some((locationRestriction) => {
        const locationRestrictions = readNavigationUrl(locationRestriction)
        if (!(currentMainPath.includes(locationRestrictions.mainPath)) || !(currentModalPath.includes(locationRestrictions.modalPath))) {
          return false
        } else return true
      })
    }

    if (!testPassed) return API_ABORTED

    if(await udpateSystemData(dispatch, updateId)) {
      return API_SUCCESS
    }
    else return API_ERROR
  } else if (updateInfo && updateInfo.busy) {
    const { updateWarningSnackDisabled } = state.updates

    dispatch(logDebugWarning(`The ${updateId} call is taking a very long time to complete. This may impact performace.`))

    // TODO: Deprecated, delete
    /*if (!updateWarningSnackDisabled) {
      // Disable spamming of update warnings if many updates are taking a while,
      // max. 1 warning every 10 minutes
      
      dispatch(disableUpdateWarningSnack())
      dispatch(
        newSnackbar(
          WARNING_SNACK,
          `The ${updateId} call is taking a very long time to complete. This may impact performace.`,
          MID_LENGTH_ALERT
        )
      );
      
      setTimeout(() => {
        dispatch(enableUpdateWarningSnack())
      }, 600000)
    }*/
  }

  return API_ABORTED
}

/**
 * Calls the specified API update function and renews (un-expires) the data in the 
 * redux store if the API call succeeded.
 * @param {Function} dispatch Redux action dispatch function
 * @param {String} updateId Name of API call to update
 */
export const udpateSystemData = async (dispatch, updateId) => {
  dispatch(occupySystemApiCall(updateId))
  let callCompleted = false

  try {
    callCompleted = await systemDataUpdates[updateId](dispatch)
  } catch (e) {
    console.error(e)
  }
  
  dispatch(freeSystemApiCall(updateId))
  return callCompleted
}