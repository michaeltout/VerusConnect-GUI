import {
  OPEN_TEXT_DIALOG,
  CLOSE_TEXT_DIALOG,
} from "../../../../util/constants/storeType";
import Store from "../../../../store";


/**
 * Shows a text dialog with the provided props
 * @param {Func} onCancel Function called when dialog is canceled/closed
 * @param {Object[]} actions List of actions the user can take in response to the dialog in { onClick: Func, title: String }
 * format
 * @param {String} description The text of the dialog
 * @param {String} title The title of the dialog
 */
export const openTextDialog = (onCancel, actions, description, title) => {
  Store.dispatch({
    type: OPEN_TEXT_DIALOG,
    props: {
      onCancel,
      actions,
      description,
      title
    },
  });
};

/**
 * Closes the existing text dialog
 */
export const closeTextDialog = () => {
  Store.dispatch({
    type: CLOSE_TEXT_DIALOG,
  });
}