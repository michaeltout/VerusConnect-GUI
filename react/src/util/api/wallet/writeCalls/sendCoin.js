import { getApiData } from '../../callCreator'
import { API_SENDTX, API_TX_PREFLIGHT, NATIVE, ELECTRUM, ETH, API_SUCCESS } from '../../../constants/componentConstants'
import { getNetworkFees } from '../../network/networkFees';

/**
 * Send or preflight check a non-reserve, traditional native transaction (sendtoaddress or z_sendmany)
 * @param {Boolean} preflight If true, nothing will be sent, and information for the user to confirm will be returned
 * @param {String} chainTicker The chainticker to send from 
 * @param {String} toAddress The address to send to
 * @param {Number} amount The amount to send
 * @param {Number} balance The current balance of the same type as amount above
 * @param {String} fromAddress (optional, required if z_transaction) The address to send from, leave blank for all transparent funds
 * @param {Number} customFee (optional) Specify a custom tx fee
 * @param {String} memo (optional, only available on sends to z_addrs) Send a private memo with a private transaction for the receiver
 * @param {String} toChain (optional, forces all pbaas params to be required) The PBaaS chain to send to 
 * @param {Boolean} toNative (optional, forces all pbaas params to be required) auto-convert from Verus reserve to PBaaS currency at market price
 * @param {Boolean} toReserve (optional, forces all pbaas params to be required) auto-convert from PBaaS to Verus reserve currency at market price
 * @param {Boolean} preConvert (optional, forces all pbaas params to be required) auto-convert to PBaaS currency at market price, this only works if the order is mined before block start of the chain
 * @param {Number} lastPriceInRoot (optional) The last price of the chain to send to vs the chain to send from, for display purposes
 */
export const sendNative = async (
  preflight = true,
  chainTicker,
  toAddress,
  amount,
  balance,
  fromAddress,
  customFee,
  memo,
  toChain,
  toNative,
  toReserve,
  preConvert,
  lastPriceInRoot
) => {
  return await getApiData(
    NATIVE,
    preflight ? API_TX_PREFLIGHT : API_SENDTX,
    {
      chainTicker,
      toAddress,
      amount,
      balance,
      fromAddress,
      customFee,
      memo,
      toChain,
      toNative,
      toReserve,
      preConvert,
      lastPriceInRoot
    },
    "post"
  );
};

/**
 * Send or preflight an electrum/spv send transaction
 * @param {Boolean} preflight If true, nothing will be sent, and information for the user to confirm will be returned
 * @param {String} chainTicker The chainticker to send from 
 * @param {String} toAddress The address to send to
 * @param {Number} amount The amount to send
 * @param {Number} customFee (optional) Specify a custom tx fee
 * @param {Number} feePerByte (required if chainticker === 'BTC') specify the fee per byte for this transaction
 */
export const sendElectrum = async (
  preflight = true,
  chainTicker,
  toAddress,
  amount,
  customFee,
  feePerByte
) => {
  if (feePerByte == null) {
    const tryFeeFetch = await getNetworkFees(chainTicker)

    // TODO: Optionally increase or decrease fee amount
    if (tryFeeFetch.msg === API_SUCCESS) feePerByte = tryFeeFetch.result.max
  }

  return await getApiData(
    ELECTRUM,
    preflight ? API_TX_PREFLIGHT : API_SENDTX,
    {
      chainTicker,
      toAddress,
      amount,
      verify: true,
      lumpFee: customFee,
      feePerByte
    },
    "post"
  );
};

//TODO: Add variable tx speed by fee
/**
 * Send or preflight an eth send transaction
 * @param {Boolean} preflight If true, nothing will be sent, and information for the user to confirm will be returned
 * @param {String} chainTicker The chainticker to send from 
 * @param {String} toAddress The address to send to
 * @param {Number} amount The amount to send
 */
export const sendEth = async (
  preflight = true,
  chainTicker,
  toAddress,
  amount
) => {
  return await getApiData(
    ETH,
    preflight ? API_TX_PREFLIGHT : API_SENDTX,
    {
      chainTicker,
      toAddress,
      amount
    },
    "post"
  );
};