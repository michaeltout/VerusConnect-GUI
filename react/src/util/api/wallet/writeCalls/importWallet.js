import { getApiData } from '../../callCreator'
import { API_IMPORT_WALLET } from '../../../constants/componentConstants'

export const importWallet = async (mode, chain, filename) => {
  let params = { chain, filename };

  try {
    return await getApiData(mode, API_IMPORT_WALLET, params);
  } catch (e) {
    throw e;
  }
};