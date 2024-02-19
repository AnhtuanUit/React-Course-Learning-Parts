import { combineReducers, createStore } from 'redux';

const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

// eslint-disable-next-line no-unused-vars
function accountReducer(state = accountInitialState, action) {
  switch (action.type) {
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
        loanPurpose: '',
      };
    default:
      return state;
  }
}

const customerInitialState = {
  fullName: '',
  nationalID: '',
};

// eslint-disable-next-line no-unused-vars
function customerReducer(state = customerInitialState, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: new Date().toISOString(),
      };
    case 'customer/deleteCustomer':
      return customerInitialState;
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducers);

// console.log(JSON.stringify(store.getState()));
// store.dispatch({ type: 'account/deposit', payload: 300 });
// console.log(JSON.stringify(store.getState()));

// store.dispatch({ type: 'account/withdraw', payload: 50 });
// console.log(JSON.stringify(store.getState()));

// store.dispatch({
//   type: 'account/requestLoan',
//   payload: {
//     amount: 500,
//     purpose: 'Buy a house',
//   },
// });
// console.log(JSON.stringify(store.getState()));

// store.dispatch({ type: 'account/payLoan' });
// console.log(JSON.stringify(store.getState()));

// const ACCOUNT_DEPOSIT = 'account/deposit';

function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: {
      amount,
      purpose,
    },
  };
}
function payLoan() {
  return { type: 'account/payLoan' };
}

console.log(JSON.stringify(store.getState()));
store.dispatch(deposit(300));
console.log(JSON.stringify(store.getState()));

store.dispatch(withdraw(50));
console.log(JSON.stringify(store.getState()));

store.dispatch(requestLoan(500, 'Buy a house'));
console.log(JSON.stringify(store.getState()));

store.dispatch(payLoan());
console.log(JSON.stringify(store.getState()));

////////////////////////////////////////////////
function createCustomer(fullName, nationalID) {
  return { type: 'customer/createCustomer', payload: { fullName, nationalID } };
}

function deleteCustomer() {
  return { type: 'customer/deleteCustomer' };
}

console.log(JSON.stringify(store.getState()));
store.dispatch(createCustomer('Tuan', '123456'));
console.log(JSON.stringify(store.getState()));
store.dispatch(deleteCustomer());
console.log(JSON.stringify(store.getState()));
