import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

// eslint-disable-next-line no-unused-vars
function reducer(state = initialState, action) {
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

const store = createStore(reducer);

// console.log(store.getState());
// store.dispatch({ type: 'account/deposit', payload: 300 });
// console.log(store.getState());

// store.dispatch({ type: 'account/withdraw', payload: 50 });
// console.log(store.getState());

// store.dispatch({
//   type: 'account/requestLoan',
//   payload: {
//     amount: 500,
//     purpose: 'Buy a house',
//   },
// });
// console.log(store.getState());

// store.dispatch({ type: 'account/payLoan' });
// console.log(store.getState());

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

console.log(store.getState());
store.dispatch(deposit(300));
console.log(store.getState());

store.dispatch(withdraw(50));
console.log(store.getState());

store.dispatch(requestLoan(500, 'Buy a house'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());