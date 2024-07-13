import { useEffect, useState, useMemo, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../Movies_api";
import { FaArrowLeft } from "react-icons/fa";
import css from "./MoviesDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const previousLocation = useRef(location.state ?? "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const movie = await getMovieDetails(movieId);
        setMovie(movie);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const userScore = useMemo(
    () => (movie?.vote_average ? Math.round(movie.vote_average * 10) : "N/A"),
    [movie]
  );

  const genres = useMemo(
    () =>
      movie?.genres.length
        ? movie.genres.map((genre) => genre.name).join(", ")
        : "N/A",
    [movie]
  );

  return (
    <div className={css.container}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && movie && (
        <>
          <Link to={previousLocation.current} className={css.goBackButton}>
            <FaArrowLeft className={css.arrowIcon} />
            Go back
          </Link>
          <div className={css.movies}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={css.inform}>
              <h1>
                {movie.title || "N/A"}{" "}
                {movie.release_date
                  ? `(${new Date(movie.release_date).getFullYear()})`
                  : ""}
              </h1>
              <p>User Score: {userScore}%</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{genres}</p>
            </div>
          </div>
          <h3 className={css.title}>Additional information</h3>
          <ul className={css.list}>
            <li>
              <Link to="cast" className={css.link}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" className={css.link}>
                Reviews
              </Link>
            </li>
          </ul>
          <Outlet />
        </>
      )}
    </div>
  );
}
