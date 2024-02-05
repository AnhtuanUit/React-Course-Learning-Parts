import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import { useEffect, useReducer } from 'react';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

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

const BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
