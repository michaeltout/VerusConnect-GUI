import { SET_MAIN_NAVIGATION_PATH, SET_MODAL_NAVIGATION_PATH } from '../../../../util/constants/storeType'
import { readNavigationPath } from '../../../../util/navigationUtils'

/**
 * Sets the main navigation path in the redux store
 */
export const setMainNavigationPath = (path) => {
  const navigationArray = readNavigationPath(path)
  return {
    type: SET_MAIN_NAVIGATION_PATH,
    navigationPath: path,
    navigationPathArray: navigationArray
  }
}

/**
 * Sets the modal navigation path in the redux store, will open
 * a modal if path was an empty string and changes to a path, and 
 * will close all modals if set to null
 */
export const setModalNavigationPath = (path) => {
  const navigationArray = readNavigationPath(path)
  return {
    type: SET_MODAL_NAVIGATION_PATH,
    navigationPath: path ? path : '',
    navigationPathArray: navigationArray
  }
}