import { mapObjectValues } from "./objectUtil"

/**
 * Function to read Verus Desktop GUI navigation location URL in the format
 * <modal_navigation_path>@<main_navigation_path>. Returns an object with the 
 * modal path and main path separated.
 * @param {String} url 
 */
export const readNavigationUrl = (url) => {
  const navigationPaths = url.split("@")

  return {modalPath: navigationPaths[0], mainPath: navigationPaths[1]}
}

/**
 * Function to parse navigation path string to array, where each
 * element is a member of the path originally separated by '/'
 * @param {String} path 
 */
export const readNavigationPath = (path = null) => {  
  return path ? path.split("/") : []
}

/**
 * Returns the parent path of the navigationArray path
 * @param {String[]} navigationArray 
 */
export const getPathParent = (navigationArray) => {
  return navigationArray.slice(0, -1).join('/')
}

export const getLastLocation = (traversalHistory) => {
  return mapObjectValues(traversalHistory).reduce(function(prev, current) {
    return (prev.value > current.value) ? prev : current
  }, []).path
}