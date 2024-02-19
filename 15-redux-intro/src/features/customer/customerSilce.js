import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  nationalID: '',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return { payload: { fullName, nationalID } };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = new Date().toISOString();
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

/* export default function customerReducer(state = customerInitialState, action) {
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
} */
