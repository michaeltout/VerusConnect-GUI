import Store from "../store"
import { newSnackbar } from "../actions/actionCreators"
import { SUCCESS_SNACK, MID_LENGTH_ALERT } from "./constants/componentConstants"

export const copyDataToClipboard = (data) => {
  navigator.clipboard.writeText(data)
  Store.dispatch(newSnackbar(SUCCESS_SNACK, data + " copied to clipboard", MID_LENGTH_ALERT))
}