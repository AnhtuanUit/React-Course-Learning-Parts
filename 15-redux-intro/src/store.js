// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { thunk } from 'redux-thunk';
// import { composeWithDevTools } from '@redux-devtools/extension';
import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';
import accountReducer from './features/account/accountSlice';
import customerReducer from './features/customer/customerSilce';

const rootReducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = configureStore({ reducer: rootReducers });

// const store = createStore(
//   rootReducers,
//   composeWithDevTools(applyMiddleware(thunk))
// );

export default store;
