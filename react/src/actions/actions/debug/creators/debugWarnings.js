import {
  LOG_WARNING
} from "../../../../util/constants/storeType";

/**
 * Logs a warning that may not be visible to the user
 * when it occurs to the store
 * @param {String} message The warning message
 */
export const logDebugWarning = (message) => {
  return {
    type: LOG_WARNING,
    warning: {
      time: (new Date()).getTime(),
      message
    }
  }
}