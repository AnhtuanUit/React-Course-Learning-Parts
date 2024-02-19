import { combineReducers, createStore } from 'redux';
import accountReducer from './features/account/accountSlice';

import customerReducer from './features/customer/customerSilce';

const rootReducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducers);

export default store;
