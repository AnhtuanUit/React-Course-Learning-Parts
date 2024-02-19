const customerInitialState = {
  fullName: '',
  nationalID: '',
};

export default function customerReducer(state = customerInitialState, action) {
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

export function createCustomer(fullName, nationalID) {
  return { type: 'customer/createCustomer', payload: { fullName, nationalID } };
}

export function deleteCustomer() {
  return { type: 'customer/deleteCustomer' };
}
