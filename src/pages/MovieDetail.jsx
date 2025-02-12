import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const MovieDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const movie = movies.find((m) => m.id.toString() === id); 

  // Fetch Trending Movies
  const fetchMovie = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${id}?language=en-US`, API_OPTIONS);
      if (!response.ok) throw new Error('Failed to fetch movie detail');

      const data = await response.json();
      setMovie(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching trending movies: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    isLoading ? (
      <p className="text-white">Loading ...</p>
    ) : movie ? (
      <div className="content">
        <h1>{movie.title}</h1>
        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `/no-movie.png`}  
          alt={movie.title || 'No title'}/>
        <p className="text-white">{movie.overview || "No overview available."}</p>
        <p className="text-white">Release Date: {movie.release_date || "No release date available."}</p>
      </div>
    ) : (
      <h2>Movie not found</h2>
    )
  );
};

export default MovieDetail;
