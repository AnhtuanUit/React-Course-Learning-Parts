import { useReducer, useEffect, createContext, useContext } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  cities: [],
  currentCity: {},
  status: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'fetchCities':
      return { ...state, status: 'loading' };
    case 'fetchCitiesSuccess':
      return { ...state, cities: action.payload, status: 'ready' };
    case 'fetchCitiesFail':
      return { ...state, error: action.payload, status: 'error' };

    case 'fetchCity':
      return { ...state, status: 'loading' };
    case 'fetchCitySuccess':
      return { ...state, currentCity: action.payload, status: 'ready' };
    case 'fetchCityFail':
      return { ...state, error: action.payload, status: 'error' };
    default:
      throw new Error('Unknown action');
  }
}

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [{ cities, status, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const isLoading = status === 'loading';

  async function getCity(id) {
    if (!id) return;
    try {
      dispatch({ type: 'fetchCity' });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw Error('Some thing went wrong with fetching data!');
      const data = await res.json();
      dispatch({ type: 'fetchCitySuccess', payload: data });
    } catch (err) {
      dispatch({ type: 'fetchCityFail', payload: err.message });
    }
  }

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: 'fetchCities' });
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw Error('Some thing went wrong with fetching data!');
        const data = await res.json();
        dispatch({ type: 'fetchCitiesSuccess', payload: data });
      } catch (err) {
        dispatch({ type: 'fetchCitiesFail', payload: err.message });
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        getCity,
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

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
