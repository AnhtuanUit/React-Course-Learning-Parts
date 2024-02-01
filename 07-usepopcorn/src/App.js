import { useState, useEffect, useRef } from 'react';
import StarRating from './StarRating';

// const tempMovieData = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//   },
//   {
//     imdbID: 'tt0133093',
//     Title: 'The Matrix',
//     Year: '1999',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
//   },
//   {
//     imdbID: 'tt6751668',
//     Title: 'Parasite',
//     Year: '2019',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: 'tt1375666',
//     title: 'Inception',
//     year: '2010',
//     poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: 'tt0088763',
//     title: 'Back to the Future',
//     year: '1985',
//     poster:
//       'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = '3bc4c000';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    return JSON.parse(localStorage.getItem('watched')) || [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleSelectedMovie(imdbID) {
    const isSelected = imdbID === selectedMovieId;

    setSelectedMovieId(isSelected ? null : imdbID);
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddWatchedMovie(watchedMovie) {
    setWatched(wMovies => [...wMovies, watchedMovie]);
    // localStorage.setItem('watched', JSON.stringify([...watched, watchedMovie]));
  }

  function handleDeleteWatchedMovie(imdbID) {
    setWatched(wMovies => wMovies.filter(wMovie => wMovie.imdbID !== imdbID));
  }

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched));
    },
    [watched]
  );

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

  const watchMovie = watched.find(wMovie => wMovie.imdbID === selectedMovieId);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} onQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {isLoading && <Loader />}
          {error && <ShowError message={error} />}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watchMovie={watchMovie}
              key={selectedMovieId}
            />
          ) : (
            <>
              <WatchedSumary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({
  selectedMovieId,
  onCloseMovie,
  onAddWatchedMovie,
  watchMovie,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [rating, setRatingStar] = useState(0);
  const [error, setError] = useState(false);

  const {
    Title: title,
    Released: released,
    Runtime: runtime,
    Poster: poster,
    Plot: plot,
    Director: director,
    Actors: actors,
    imdbRating,
    Genre: genre,
    imdbID,
  } = movie;

  // Violating the rules
  // if (imdbRating > 3) [isTop, setIsTop] = useState(true);
  // if (imdbRating > 3) return <p>Violating the rules</p>;

  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setError('');
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
          );
          if (!res.ok)
            throw Error('Some thing went wrong with fetching movies!');

          const data = await res.json();

          if (data.Response === 'False') {
            throw new Error('Movie not found');
          }
          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovie();
    },
    [selectedMovieId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = 'usePopcorn';
        // console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  useEffect(
    function () {
      function callback(e) {
        if (e.code === 'Escape') {
          onCloseMovie();
        }
      }
      document.addEventListener('keydown', callback);

      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [onCloseMovie]
  );

  function handleAddWatchedMovie() {
    onAddWatchedMovie({
      imdbID,
      poster,
      title,
      imdbRating: +imdbRating,
      userRating: rating,
      runtime: Number.parseInt(runtime),
    });

    onCloseMovie();
  }

  return (
    <div className="details">
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={() => onCloseMovie()}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of movie ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!watchMovie ? (
                <>
                  <StarRating
                    size={24}
                    maxRating={10}
                    onSetRating={setRatingStar}
                  />

                  {rating > 0 && (
                    <button className="btn-add" onClick={handleAddWatchedMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated with movie {watchMovie.userRating} ⭐️</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ShowError message={error} />}
      {isLoading && <Loader />}
    </div>
  );
}

function Loader() {
  return <p className="loader">...Loading</p>;
}
function ShowError({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Search({ query, onQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (e.code === 'Enter') {
          if (document.activeElement !== inputEl.current) {
            inputEl.current.focus();
            onQuery('');
          }
        }
      }
      document.addEventListener('keypress', callback);

      return () => document.removeEventListener('keypress', callback);
    },
    [onQuery]
  );

  // useEffect(
  //   function () {
  //     // How NOT to Select DOM Element in React
  //     const searchEl = document.querySelector('.search');
  //     document.addEventListener('keypress', function (e) {
  //       if (e.code === 'Enter') {
  //         if (document.activeElement !== searchEl) {
  //           searchEl.focus();
  //           onQuery('');
  //         }
  //       }
  //     });
  //   },
  //   [onQuery]
  // );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => onQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen(open => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map(movie => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

/* function WatchedBox({ children }) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen2(open => !open)}>
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && <>{children}</>}
    </div>
  );
}*/

function WatchedSumary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating)).toFixed(
    1
  );
  const avgUserRating = average(watched.map(movie => movie.userRating)).toFixed(
    1
  );
  const avgRuntime = average(watched.map(movie => movie.runtime)).toFixed(0);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatchedMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatchedMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
