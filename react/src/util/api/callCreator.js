import {
  getPostToken,
  getGetToken,
  getShieldKey,
  agamaPort,
  apiEncryption
} from '../../config';
import fetchType from '../fetchType';
import urlParams from '../url'
import { NATIVE, ETH, ELECTRUM, POST, GET, MAX_RECURSION_DEPTH_API } from '../constants/componentConstants'
import Store from '../../store';
import {
  getPostTicket,
  selectPostWinner,
  getGetTicket,
  selectGetWinner,
} from "../../actions/actionDispatchers";
const iocane = require('iocane');
const session = iocane.createSession().use('gcm')

const decrypt = session.decrypt.bind(session);
const encrypt = session.encrypt.bind(session);

/**
 * Makes a blockchain call to the API depending on a number of parameters
 * @param {String} mode native || electrum || eth
 * @param {String} call Name of the api call to make, e.g. get_balances
 * @param {Object} params Parameters to pass to api call, the required parameters depend on the mode specified above
 * @param {String} reqType (Optional) 'post' || 'get' If unspecified, defaults to 'post' for native mode and 'get' for eth and electrum
 */
export const getApiData = (mode, call, params, reqType, shieldPost = apiEncryption) => {
  const requestFunc = reqType ? modeNameMap[reqType] : modeDefaultCallMap[mode]

  return new Promise((resolve, reject) => {
    requestFunc(`${mode}/${call}`, params, shieldPost)
    .catch((error) => {
      console.error(error);
      reject(error)
    })
    .then(json => {
      resolve(json)
    });
  })
}

/**
 * Makes an API get request to the specified API call 
 * @param {String} callPath The full location of the specified call, e.g. electrum/get_balances
 * @param {Object} params Parameters to pass to api call
 */
export const apiGet = (callPath, params, shield = apiEncryption, retry = true) => {
  const ticket = getGetTicket(Store.dispatch)
  let checkTicks = 0

  return new Promise(async (resolve, reject) => {
    const checkTurn = () => {
      checkTicks++

      return new Promise((resolve, reject) => {
        if (
          Store.getState().api.getWinner === ticket ||
          checkTicks > MAX_RECURSION_DEPTH_API
        )
          resolve();
        else {
          setImmediate(async () => {
            await checkTurn();
            resolve();
          });
        }
      })
    }

    await checkTurn()

    const token = getGetToken()

    let urlParamsObj = {
      ...params,
      validity_key: token
    }

    fetch(
      `http://127.0.0.1:${agamaPort}/api/${callPath}${urlParams(urlParamsObj)}`,
      fetchType.get
    )
    .then(response => {
      selectGetWinner(Store.dispatch)

      return response.json()
    })
    .then(json => {
      const parsedRes = json

      if (parsedRes.msg === 'error' && parsedRes.result === 'Unauthorized Access' && retry) {
        setTimeout(async () => {          
          resolve(await apiGet(callPath, params, false, false))
        }, 100)
      } else resolve(json)
    })
    .catch(e => {
      if (Store.getState().api.getWinner === ticket) selectGetWinner(Store.dispatch)

      reject(e)
    })
  })
  
}

/**
 * Makes an API post request to the specified API call 
 * @param {String} callPath The full location of the specified call, e.g. native/get_balances
 * @param {Object} params Parameters to pass to api call
 */
export const apiPost = async (callPath, params, shield = apiEncryption, retry = true) => {  
  const ticket = !shield ? getPostTicket(Store.dispatch) : null

  return new Promise(async (resolve, reject) => {
    if (!shield) {
      let checkTicks = 0

      const checkTurn = () => {
        checkTicks ++
        
        return new Promise((resolve, reject) => {
          if (
            Store.getState().api.postWinner === ticket ||
            checkTicks > MAX_RECURSION_DEPTH_API
          )
            resolve();
          else {
            setImmediate(async () => {
              await checkTurn();
              resolve();
            });
          }
        })
      }

      await checkTurn()
    }

    const token = shield ? getShieldKey() : getPostToken()

    fetch(
      `http://127.0.0.1:${agamaPort}/api/${callPath}`,
      fetchType(
        JSON.stringify({
          validity_key: token,
          encrypted: shield,
          payload:
            params == null
              ? !shield ? {} : await encrypt(JSON.stringify({}), token)
              : !shield ? params : await encrypt(JSON.stringify(params), token),
        })
      ).post
    )
      .then((response) => {
        selectPostWinner(Store.dispatch)

        return response.json();
      })
      .then(async (data) => { 
        if (shield) resolve(JSON.parse(await decrypt(data.payload, token)));
        else {
          const parsedRes = JSON.parse(data.payload)

          if (parsedRes.msg === 'error' && parsedRes.result === 'Unauthorized Access' && retry) {
            setTimeout(async () => {              
              resolve(await apiPost(callPath, params, shield = apiEncryption, false))
            }, 100)
          } else resolve(JSON.parse(data.payload))
        }
      })
      .catch((e) => {
        if (!shield && Store.getState().api.postWinner === ticket)
          selectPostWinner(Store.dispatch);

        console.error(e)
        reject(e)
      });
  })
}

export const modeDefaultCallMap = {
  [NATIVE]: apiPost,
  [ETH]: apiGet,
  [ELECTRUM]: apiGet
}

export const modeNameMap = {
  [POST]: apiPost,
  [GET]: apiGet
}

