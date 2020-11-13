import { secretToken } from '../../../../config';
import store from '../../../../store';
import { ADD_CALLED_TIME } from '../../../../util/constants/storeType'
var blake2b = require('blake2b')

export const getSecretKey = (data) => {
  let time = new Date().valueOf();

  while (store.getState().api.calledTimes.includes(time)) time++

  const token = secretToken

  var hash = blake2b(64)

  hash.update(Buffer.from(time.toString()))
  hash.update(Buffer.from(token))
  hash.update(Buffer.from(data))

  store.dispatch({
    type: ADD_CALLED_TIME,
    payload: {
      time
    }
  })

  return {
    hash: hash.digest('hex'),
    time: time.toString()
  }
}