import Search from './components/Search'
import { useState, useEffect } from 'react';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from "react-use";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [moveList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    try {
      const endpoint = query ? API_BASE_URL + `/search/movie?query=${query}` : API_BASE_URL + `/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log(data);
      if (data.Response === 'false') {
        setErrorMessage(data.errorMessage);
        setMovieList([])
        return
      } 
      setMovieList(data.results || []);
    } catch (error) {
      console.error('Error fetching movies: ', error);
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  }

  useDebounce(() => {
    setDebounceSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return (
    <main>
        <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner"/> 
          <h1>Find <span className='text-gradient'>Movies</span>You'll Enjoy Without the Hassle</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <section className='all-movies'> 
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {moveList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
