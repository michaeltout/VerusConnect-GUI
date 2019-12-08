/*
  This reducer contains snackbar data for the snackbar 
  alert/notification system
*/

import { 
  NEW_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_SNACK_TIMER
} from '../util/constants/storeType'

export const snackbar = (state = {
  variant: 'info',
  open: false,
  message: '',
  autoCloseMs: null
}, action) => {
  switch (action.type) {
  case NEW_SNACKBAR:
    return {
      ...state,
      variant: action.variant,
      open: true,
      message: action.message,
      autoCloseMs: action.autoCloseMs
    }
  case CLOSE_SNACKBAR:
    return {
      ...state,
      open: false,
      autoCloseMs: null
    }
  case SET_SNACK_TIMER:
    return {
      ...state,
      autoCloseMs: action.time
    }
  default:
    return state;
  }
}