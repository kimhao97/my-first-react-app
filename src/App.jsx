import Search from './components/Search'
import { useState, useEffect } from 'react';

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

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const endpoint = API_BASE_URL + '/discover/movie?sort_by=popularity.desc';
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === 'false') {
        setErrorMessage(data.errorMessage);
        setMovieList([])
        return
      } 
      setMovieList(data.results || []);
      console.log(moveList);
    } catch (error) {
      console.error('Error fetching movies: ', error);
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

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
            <p>Loading...</p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {moveList.map((movie) => (
                <p key={movie.id} className="text-white">{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
