import VerusZkedidUtils from 'verus-zkedid-utils'
import { satsToCoins } from './satMath'

export const decodeCoinImportFile = (importText) => {
  const importObj = VerusZkedidUtils.StructuredCurrencyImport.readImport(importText)

  let rawCoinObj = importObj.objects[0] //TODO: Handle multi-coin import file

  rawCoinObj.options.dustThreshold = satsToCoins(rawCoinObj.options.dustThreshold)
  rawCoinObj.options.txFee = satsToCoins(rawCoinObj.options.txFee)

  rawCoinObj.options.startupOptions = rawCoinObj.options.startupOptions.split('|')
  rawCoinObj.options.tags = rawCoinObj.options.tags.split('|')
  rawCoinObj.options.customServers = rawCoinObj.options.customServers.split('|')

  return rawCoinObj
}