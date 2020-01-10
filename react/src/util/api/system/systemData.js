import { apiGet } from '../callCreator'
import { GET_STATIC_SYSTEM_DATA, API_GET_CPU_LOAD, API_GET_CPU_TEMP, API_GET_SYS_TIME } from '../../constants/componentConstants'

export const getStaticSystemData = async () => {
  try {
    return await apiGet(GET_STATIC_SYSTEM_DATA, {})
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getCpuTemp = async () => {
  try {
    return await apiGet(API_GET_CPU_TEMP, {})
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getCpuLoad = async () => {
  try {
    return await apiGet(API_GET_CPU_LOAD, {})
  } catch (e) {
    throw new Error(e.message)
  }
}

export const getSysTime = async () => {
  try {
    return await apiGet(API_GET_SYS_TIME, {})
  } catch (e) {
    throw new Error(e.message)
  }
}

