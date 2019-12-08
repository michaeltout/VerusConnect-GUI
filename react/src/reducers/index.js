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

const appReducer = combineReducers({
  ledger,
  settings,
  updates,
  navigation,
  errors,
  coins,
  users,
  modal,
  routing: routerReducer,
  snackbar
});

// reset app state on logout
const initialState = appReducer({}, {});
const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;