import { getApiData } from '../../callCreator'
import { API_EXPORT_WALLET } from '../../../constants/componentConstants'

export const exportWallet = async (mode, chain, filename) => {
  let params = { chain, filename };

  try {
    return await getApiData(mode, API_EXPORT_WALLET, params);
  } catch (e) {
    throw e;
  }
};