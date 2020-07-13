import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ledger } from './ledger'
import { settings } from './settings'
import { updates } from './updates'
import { navigation } from './navigation'
import { errors } from './errors'
import { coins } from './coins'
import { users } from './users'
import { modal } from './modal'
import { snackbar } from './snackbar'
import { system } from './system'
import { debug } from './debug'
import { loading } from './loading'
import { localCurrencyLists } from './localCurrencyLists'
import { textdialog } from './textdialog'

const appReducer = combineReducers({
  ledger,
  settings,
  updates,
  navigation,
  errors,
  coins,
  users,
  modal,
  snackbar,
  system,
  debug,
  localCurrencyLists,
  routing: routerReducer,
  loading,
  textdialog
});

// reset app state on logout
const initialState = appReducer({}, {});
const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;