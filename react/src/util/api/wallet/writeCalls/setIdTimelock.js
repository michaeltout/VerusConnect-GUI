import { getApiData } from '../../callCreator'
import { API_SET_IDENTITY_TIMELOCK } from '../../../constants/componentConstants'

export const setIdTimelock = async (mode, chain, identity, lock) => {
  try {
    return await getApiData(mode, API_SET_IDENTITY_TIMELOCK, { chain, identity, lock });
  } catch (e) {
    throw e;
  }
};