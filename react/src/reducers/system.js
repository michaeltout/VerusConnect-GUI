/*
  This reducer contains information about the user's
  system and cpu
*/

import { 
  SET_STATIC_DATA, SET_CPU_TEMP, SET_CPU_LOAD, SET_SYS_TIME
} from '../util/constants/storeType'

export const system = (state = {
  static: {},
  cpuTemp: {},
  cpuLoad: {},
  sysTime: {}
}, action) => {
  switch (action.type) {
  case SET_STATIC_DATA:
    return {
      ...state,
      static: action.staticData
    }
  case SET_CPU_TEMP:
    return {
      ...state,
      cpuTemp: action.cpuTemp
    }
  case SET_CPU_LOAD:
    return {
      ...state,
      cpuLoad: action.cpuLoad
    }
  case SET_SYS_TIME:
    return {
      ...state,
      sysTime: action.sysTime
    }
  default:
    return state;
  }
}