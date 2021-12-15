import { getApiData } from '../../callCreator'
import { API_GET_OFFERS } from '../../../constants/componentConstants'
import { GetOffersRequest, GetOffersResponse } from 'verus-typescript-primitives'

export const getOffers = async (mode, chainTicker, currencyOrId, isCurrency, withTx) => {
  try {
    const res = await getApiData(
      mode,
      API_GET_OFFERS,
      (new GetOffersRequest(chainTicker, currencyOrId, isCurrency, withTx)).toJson()
    )

    return {
      msg: res.msg,
      result: res.msg !== "success" ? res.result : (new GetOffersResponse(res.result)),
    };
  } catch (e) {
    throw e
  }
}