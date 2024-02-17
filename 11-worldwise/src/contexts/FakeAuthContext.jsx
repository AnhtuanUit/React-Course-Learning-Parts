/* eslint-disable react-refresh/only-export-components */
import useLocalStorageState from '@src/hooks/useLocalStorageState';
import { createContext, useContext } from 'react';

const AuthContext = createContext();

// function reducer(state, action) {
//   switch (action.type) {
//     case 'login':
//       return { ...state, isAuthenticated: true, user: action.payload };
//     case 'logout':
//       return { ...state, isAuthenticated: false, user: null };
//     default:
//       break;
//   }
// }

// let initialState = {
//   isAuthenticated: false,
//   user: null,
// };

const FAKE_USER = {
  name: 'Tuan',
  email: 'tuando@example.com',
  password: 'HighSecurityPassword',
  avatar:
    'https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F5e132ec7-6974-4943-80c1-9dcf9e5e05ae%2Fc7ccb019-db7d-451b-ab7a-c272fca78a45%2F48926316_1193648000784658_1279668802715385856_n.jpg?table=block&id=2221b0f6-0451-4c98-a3b8-219523485669&spaceId=5e132ec7-6974-4943-80c1-9dcf9e5e05ae&width=250&userId=40207143-4e8e-4f6b-907d-3221c72b46dd&cache=v2',
};

function AuthProvider({ children }) {
  // const [{ user, isAuthenticated }, dispatch] = useReducer(
  //   reducer,
  //   initialState
  // );

  const [{ isAuthenticated, user }, setAuth] = useLocalStorageState('auth');

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      // dispatch({ type: 'login', payload: FAKE_USER });
      setAuth({ user: FAKE_USER, isAuthenticated: true });
    }
  }

  function logout() {
    // dispatch({ type: 'logout' });
    setAuth({ user: null, isAuthenticated: false });
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
