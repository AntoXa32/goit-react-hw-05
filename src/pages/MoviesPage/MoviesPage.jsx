import { searchMovies } from "../../Movies_api";
import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initialQuery = searchParams.get("query");
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [searchParams]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError(null);
    setMessage("");
    setMovies([]);
    if (!searchQuery.trim()) {
      setLoading(false);
      setMessage("Please enter a movie title.");
      return;
    }
    try {
      const movies = await searchMovies(searchQuery);
      setMovies(movies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query });
    handleSearch(query);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {message && <p className={css.error}>{message}</p>}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}
