import { useReducer, useEffect, createContext, useContext } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false };
    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoading: false };
    case 'city/created':
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case 'city/deleted':
      return {
        ...state,
        currentCity: {},
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
      };

    case 'rejected':
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error('Unknown action');
  }
}

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...',
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (!id) return;
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw Error('Some thing went wrong with fetching city');
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the city...',
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the city...',
      });
    }
  }

  async function deleteCity(id) {
    if (!id) return;
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      await res.json();
      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        getCity,
        createCity,
        deleteCity,
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
