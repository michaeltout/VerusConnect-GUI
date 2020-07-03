/*
  This reducer contains props for the globally 
  accessable text dialog component, used to show important
  messages to the user
*/

import { 
  LOG_WARNING, OPEN_TEXT_DIALOG, CLOSE_TEXT_DIALOG
} from '../util/constants/storeType'

export const textdialog = (state = {
  open: false,
  onCancel: null,
  actions: [],
  description: '',
  title: ''
}, action) => {
  switch (action.type) {
    case OPEN_TEXT_DIALOG:
      return {
        ...action.props,
        open: true,
      }
    case CLOSE_TEXT_DIALOG:
      return {
        open: false,
        onCancel: null,
        actions: [],
        description: ''
      }
    default:
      return state;
  }
}