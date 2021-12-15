import { getApiData } from '../../callCreator'
import { API_MAKE_OFFER } from '../../../constants/componentConstants'

export const makeOffer = async (mode, offer) => {
  try {
    return await getApiData(mode, API_MAKE_OFFER, offer);
  } catch (e) {
    throw e;
  }
};