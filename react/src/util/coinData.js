import explorerList from 'agama-wallet-lib/src/coin-helpers';
import { staticVar } from './mainWindow';
import coins from '../translate/coins'
import {
  NATIVE,
  ETH,
  ELECTRUM,
  IS_PBAAS,
  IS_ZCASH,
  IS_PBAAS_ROOT,
  IS_SAPLING,
  DEFAULT_DUST_THRESHOLD,
  DEFAULT_DAEMON,
  KOMODO_DAEMON,
  Z_ONLY,
  IS_VERUS,
  ZCASH_DAEMON,
  ZCASH_CONF_NAME,
  KOMODO_CONF_NAME
} from './constants/componentConstants'
import erc20ContractId from 'agama-wallet-lib/src/eth-erc20-contract-id'
import electrumServers from 'agama-wallet-lib/src/electrum-servers'
import networks from 'agama-wallet-lib/src/bitcoinjs-networks'
import { fromSats } from 'agama-wallet-lib/src/utils'
import komodoUtils from 'agama-wallet-lib/src/coin-helpers';
import * as Vibrant from 'node-vibrant'
import * as randomColor from 'randomcolor'
import { coinDataDirectories } from './constants/coinDataDirectories';

/**
 * Aggregates all relevant coin data needed in order to add
 * a coin to the wallet based on its chain ticker
 * @param {String} chainTicker Coin to add's chain ticker
 * @param {Boolean} isPbaas Whether or not the coin to add is a pbaas chain, will override unsupported coin check
 */
export const getCoinObj = (chainTicker, isPbaas = false) => {
  const allCoinNames = {...coins.BTC, ...coins.ETH}
  const chainTickerUc = chainTicker.toUpperCase()
  const chainTickerLc = chainTickerUc.toLowerCase()
  let tags = {}
  let coinObj = {
    id: chainTicker,
    options: {
      dustThreshold: DEFAULT_DUST_THRESHOLD, // 0.00001
    },
    isPbaasChain: isPbaas
  }
  let available_modes = {
    [NATIVE]: false,
    [ELECTRUM]: false,
    [ETH]: false
  }

  //If trying to add an unsupported chain, create a coin obj instead, dont use this function
  if (!isPbaas && !allCoinNames[chainTickerUc]) throw new Error(`${chainTicker} not found in Verus coin list.`)
  else coinObj.name = allCoinNames[chainTickerUc]

  if (explorerList.explorerList[chainTickerUc]) coinObj.options.explorer = explorerList.explorerList[chainTickerUc]

  // Determine available modes based on available coin data and libraries
  if (erc20ContractId[chainTickerUc] || chainTickerUc === 'ETH') {
    available_modes[ETH] = true
  } else {
    if (staticVar.chainParams[chainTickerUc] || chainTickerUc === 'KMD') {
      available_modes[NATIVE] = true
      if (chainTickerUc !== 'KMD' && staticVar.chainParams[chainTickerUc].ac_private) {
        tags = {...tags, [IS_ZCASH]: true, [IS_SAPLING]: true, [Z_ONLY]: true}
      }

      coinObj.options.dirNames = coinDataDirectories[chainTickerUc]

      if (komodoUtils.isKomodoCoin(chainTickerUc) && chainTickerUc !== 'VRSC' && chainTickerUc !== 'VRSCTEST') {
        coinObj.options.daemon = KOMODO_DAEMON  // komodod

        if (chainTickerUc === 'KMD') coinObj.options.confName = KOMODO_CONF_NAME // komodo.conf

      } else if (chainTickerUc === 'ZEC') {
        coinObj.options.daemon = ZCASH_DAEMON // zcashd
        coinObj.options.confName = ZCASH_CONF_NAME // zcash.conf
      } else {
        coinObj.options.daemon = DEFAULT_DAEMON // verusd
      }
    }

    if (networks[chainTickerLc]) {
      if (electrumServers.electrumServers[chainTickerLc]) {
        available_modes[ELECTRUM] = true
      }

      if (chainTickerUc !== 'KMD' && networks[chainTickerLc].isZcash) tags[IS_ZCASH] = true
      if (networks[chainTickerLc].sapling) {
        tags[IS_SAPLING] = true
        coinObj.options.saplingHeight = networks[chainTickerLc].saplingActivationHeight
      }
      if (networks[chainTickerLc].dustThreshold) coinObj.options.dustThreshold = fromSats(networks[chainTickerLc].dustThreshold)
    }

    // Determine if chain is pbaas compatible, and if it is a pbaas root chain
    if (isPbaas || chainTickerUc === 'VRSCTEST') {
      tags = {...tags, [IS_ZCASH]: true, [IS_PBAAS]: true, [IS_SAPLING]: true}
      available_modes[NATIVE] = true
      coinObj.options.daemon = DEFAULT_DAEMON

      if (chainTickerUc === 'VRSCTEST') tags[IS_PBAAS_ROOT] = true
    }

    if (chainTickerUc === 'VRSCTEST' || chainTickerUc === 'VRSC') {
      tags[IS_VERUS] = true
    }
  }

  /* Final coin object structure, when it is dispatched to the store
    {
      id: 'VRSC',                                // Coin's chain ticker
      name: Verus,                               // Coin name
      available_modes: {                         // Modes in which this coin can be activated
        'native': true,
        'electrum': true,
        'eth': false
      },
      options: {
        explorer: https://explorer.veruscoin.io, // (Optional) Explorer URL.
        saplingHeight: 10000,                    // (Optional) height at which sapling will be activated for the chain
        dustThreshold: 0.00001,                  // (Optional) Network threshold for dust values
        daemon: 'verusd',                        // (Optional) Specify a custom daemon for native mode
        startupOptions: ['-mint'],               // (Optional) Added in a later step, native options for daemon start
        tags: [                                  // Tags for coin to identify properties
        'is_sapling',
        'is_zcash',
        'is_pbaas',
        'is_pbaas_root'],
      },
      isPbaasChain: false,                       // Boolean to decide whether or not to skip coin compatability check
      themeColor: hexCode                        // Theme color for coin to add, added to coin object in addCoin asynchronously
    }
  */

  coinObj.options.tags = Object.keys(tags)
  return {
    ...coinObj,
    available_modes
  }
}

/**
 * Returns the most vibrant color from a coin's logo icon
 * @param {String} chainTicker The chain ticker for the coin to get color from
 * @param {Array} availableModes The available mode object from the coinObj generated for the coin
 */
export const getCoinColor = async (chainTicker, availableModes) => {
  try {
    const palette = await Vibrant.from(
      `assets/images/cryptologo/${availableModes[ETH] ? ETH : 'btc'}/${chainTicker.toLowerCase()}.png`).getPalette()

    return palette.Vibrant.getHex()
  } catch (e) {
    console.error(e)
    return randomColor.randomColor()
  }
}

export const getSimpleCoinArray = () => {
  let coinArr = []

  for (let protocol in coins) {
    for (let coin in coins[protocol]) {
      coinArr.push({
        id: coin,
        name: coins[protocol][coin],
        protocol
      })
    }
  }

  // Put VRSC, KMD and BTC at the top, else sort alphabetically
  let topThree = []
  for (let i = 0; i < 3; i++) topThree.push(coinArr.shift())

  coinArr = coinArr.sort(function(a,b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  })

  coinArr.unshift(...topThree)

  return coinArr
}


