import { useReducer, useEffect, createContext, useContext } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  cities: [],
  status: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'fetchCities':
      return { ...state, status: 'loading' };
    case 'fetchSuccess':
      return { ...state, cities: action.payload, status: 'ready' };
    case 'fetchFail':
      return { ...state, error: action.payload, status: 'error' };
    default:
      throw new Error('Unknown action');
  }
}

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [{ cities, status }, dispatch] = useReducer(reducer, initialState);

  const isLoading = status === 'loading';

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: 'fetchCities' });
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw Error('Some thing went wrong with fetching data!');
        const data = await res.json();
        dispatch({ type: 'fetchSuccess', payload: data });
      } catch (err) {
        dispatch({ type: 'fetchFail', payload: err.message });
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error('The CitiesContext used outside of CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
