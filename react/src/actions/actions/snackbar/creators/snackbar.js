import {
  CLOSE_SNACKBAR,
  NEW_SNACKBAR,
  SET_SNACK_TIMER
} from '../../../../util/constants/storeType'

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR
  }
}

/**
 * Returns an action to display a new snackbar alert
 * @param {String} variant error || info || success || warning
 * @param {String} message Message to display in snackbar
 * @param {Integer} autoCloseMs (Optional) Number of ms until the snackbar closes itself, 
 * will not auto close if this is null
 */
export const newSnackbar = (variant, message, autoCloseMs = null) => {
  return {
    type: NEW_SNACKBAR,
    variant,
    message,
    autoCloseMs
  }
}

export const setSnackTimer = (time) => {
  return {
    type: SET_SNACK_TIMER,
    time
  }
}