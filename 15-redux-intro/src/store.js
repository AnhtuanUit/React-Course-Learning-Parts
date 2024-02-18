const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

// eslint-disable-next-line no-unused-vars
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'acount/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'acount/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'acount/requestLoan':
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'acount/payLoan':
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
