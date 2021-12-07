import { getApiData } from '../../callCreator'
import { API_TAKE_OFFER } from '../../../constants/componentConstants'

export const takeOffer = async (mode, chain, fromaddress, offer) => {
  try {
    return await getApiData(mode, API_TAKE_OFFER, { chain, fromaddress, offer });
  } catch (e) {
    throw e;
  }
};