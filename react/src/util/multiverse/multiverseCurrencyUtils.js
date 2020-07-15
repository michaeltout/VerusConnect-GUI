import { CENTRALIZED_ISSUANCE, DEFUALT_ISSUANCE, IS_TOKEN_FLAG, IS_FRACTIONAL } from "../constants/flags"
import { checkFlag } from "../flagUtils"
import { blocksToTime } from "../blockMath"

/**
 * Calculates a decentralization score from 0-100 based on 
 * chain preallocaation, proofprotocol (2 = centralized minting),
 * and number of preassigned notaries
 * @param {Object[]} preallocation The preallocation property of the chain obj
 * @param {Number} proofprotocol The proofprotocol property of the chain obj
 * @param {Object[]} notaries The notaries property of the chain obj
 * @param {Number} emitted The total number of emitted coins
 */
export const getDecentralizationScore = (preallocation = [], proofprotocol = DEFUALT_ISSUANCE, notaries = [], emitted = Infinity) => {
  let score = 0
  let centralizedFunds = 0
  if (proofprotocol == CENTRALIZED_ISSUANCE || notaries.length > 0) return score

  // TODO: Change when protocol changes from array of objects to object
  preallocation.map(preallocationObj => {
    const id = Object.keys(preallocationObj)[0]
    centralizedFunds += preallocationObj[id]
  })

  score = (centralizedFunds / emitted)

  return score > 100 ? 100 : score
}

/**
 * Parses a currency into a displayable currency by adding some display data
 * @param {Object} currency 
 */
export const getCurrencyInfo = (currency, currentHeight, ownedIdentities = []) => {
  const {
    options,
    minpreconversion,
    bestcurrencystate,
    startblock,
    conversions,
    proofprotocol,
    name
  } = currency;
  const { supply } = bestcurrencystate != null ? bestcurrencystate : {}
  const isToken = checkFlag(options, IS_TOKEN_FLAG)
  const isReserve = checkFlag(options, IS_FRACTIONAL)
  const isPending = startblock > currentHeight
  const age =  currentHeight - startblock
  const isFailed =
      !isPending &&
      minpreconversion != null &&
      minpreconversion.length > 0 &&
      minpreconversion.every((n) => n > 0) &&
      supply === 0;
  const ownedIdentity = ownedIdentities.find(id => id.identity.name === name)
  const spendableTo = !isFailed && (isReserve || (isPending && conversions != null && conversions.length > 0))
  const spendableFrom = !isFailed && !isPending
  
  return {
    age,
    ageString: blocksToTime(Math.abs(age)),
    isToken,
    status: isFailed ? 'failed' : (isPending ? 'pending' : 'active'),
    spendableTo,
    spendableFrom,
    preConvert: spendableTo && age < 0,
    currency,
    mintable: proofprotocol === 2 && ownedIdentity != null && ownedIdentity.status === 'active',
    ownedIdentity
  }
}

/**
 * Returns an object in the form of {[currency_name]: {to: [{id: i31..., name: 'a', price: 0.3}], from: [{id: i31..., name: 'a', price: 0.2}]}}, 
 * with one key for every currency given in currency params by calculating what conversions can be made
 * (to where/from where) between the given currencies.
 * @param {Object} currencyObjects
 * @param {Number} currentHeight The current blockchain height (used to determine if a currency is a preconvert)
 */
export const getConversionGraph = (currencyObjects, currentHeight) => {
  let retObj = {}
  let names = {}

  for (const key in currencyObjects) {
    retObj[key] = {
      to: [],
      from: []
    }

    names[currencyObjects[key].currencyid] = currencyObjects[key].name
  }

  for (const key in currencyObjects) {
    const { bestcurrencystate, currencyid, startblock, options } = currencyObjects[key];
    const isReserve = checkFlag(options, IS_FRACTIONAL)
    const { currencies } = bestcurrencystate || {}
    const age = currentHeight - startblock

    if (currencies != null && Object.keys(currencies).length > 0 && (isReserve || age < 0)) {      
      Object.keys(currencies).map((value) => {
        if (names[value] != null) {
          const name = names[value]

          retObj[name].to.push({
            id: currencyid,
            name: key,
            price: currencies[value].lastconversionprice
          })
  
          if (age >= 0) {
            retObj[key].to.push({
              id: value,
              name,
              price: 1/currencies[value].lastconversionprice
            })
          }
  
          retObj[key].from.push({
            id: value,
            name,
            price: 1/currencies[value].lastconversionprice
          })
        }
      })
    }
  }

  return retObj
}