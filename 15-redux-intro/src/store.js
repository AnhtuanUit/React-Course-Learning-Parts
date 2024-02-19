import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import accountReducer from './features/account/accountSlice';

import customerReducer from './features/customer/customerSilce';

const rootReducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
