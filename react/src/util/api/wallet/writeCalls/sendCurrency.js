import { getApiData } from '../../callCreator'
import { NATIVE, API_SENDCURRENCY } from '../../../constants/componentConstants'

export const sendCurrency = async (
  chainTicker,
  from,
  outputs,
  feeamount
) => {
  return await getApiData(
    NATIVE,
    API_SENDCURRENCY,
    {
      chainTicker,
      from,
      outputs,
      feeamount
    },
    "post"
  );
};