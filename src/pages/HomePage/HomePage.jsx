import { useEffect, useState } from "react";
import { getPopularMovies } from "../../Movies_api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPopularMovies() {
      setLoading(true);
      try {
        const movies = await getPopularMovies();
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}
