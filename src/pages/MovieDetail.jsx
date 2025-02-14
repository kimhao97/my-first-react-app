import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
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

  if (!movie) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl max-w-4xl mx-auto mt-10 shadow-lg">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <div className="flex items-center mt-2">
        <span className="text-yellow-400 flex items-center">
          <FaStar className="mr-1" /> {movie.vote_average.toFixed(1)}
        </span>
        <span className="ml-4 text-gray-400">{movie.runtime} mins</span>
      </div>
      <div className="mt-4 flex gap-4">
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className="w-48 rounded-lg shadow-md" />
        <p className="text-gray-300">{movie.overview}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Genres:</h3>
        <div className="flex gap-2 mt-2">
          {movie.genres.map((genre) => (
            <span key={genre.id} className="bg-blue-600 px-3 py-1 rounded-full text-sm">
              {genre.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Release Date:</h3>
        <p className="text-gray-300">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
