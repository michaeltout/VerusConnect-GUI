import { getApiData } from '../../callCreator'
import { API_CLOSE_OFFERS } from '../../../constants/componentConstants'

export const closeOffers = async (mode, chain, offers) => {
  try {
    return await getApiData(
      mode,
      API_CLOSE_OFFERS,
      { chain, offers }
    )
  } catch (e) {
    throw e
  }
}