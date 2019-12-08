import { SET_MODAL_PARAMS } from '../../../../util/constants/storeType'


/**
 * Returns an action to set the params for a modal to the store so that the modal
 * can access them
 * @param {String} modal The modal name
 * @param {Object} params Params to dispatch
 */
export const setModalParams = (modal, params) => {
  return {
    type: SET_MODAL_PARAMS,
    modal,
    params
  }
}