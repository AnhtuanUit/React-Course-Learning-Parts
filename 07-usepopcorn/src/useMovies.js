import { useState, useEffect } from 'react';

const KEY = '3bc4c000';
export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(
    function () {
      if (!query) return;

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            {
              signal: controller.signal,
            }
          );
          if (!res.ok)
            throw Error('Some thing went wrong with fetching movies!');

          const data = await res.json();
          if (data.Response === 'False') {
            throw new Error('Movie not found');
          }

          setMovies(data?.Search);
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      const timeoutQuery = setTimeout(function () {
        fetchMovies();
      }, 500);

      return function () {
        controller.abort();
        clearTimeout(timeoutQuery);
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
