import { useEffect, useState } from "react";
import { getMovieCast } from "../../Movies_api";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      setLoading(true);
      try {
        const cast = await getMovieCast(movieId);
        setCast(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.movieСast}>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && cast.length === 0 && (
        <div>No cast information available</div>
      )}
      {!loading && !error && cast.length > 0 && (
        <div className={css.castGrid}>
          {cast.map((actor) => (
            <div className={css.castItem} key={actor.id}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <div className={css.noImage}>No Image</div>
              )}
              <div className={css.castInfo}>
                <p className={css.castName}>{actor.name}</p>
                <p className={css.castCharacter}>
                  Character: {actor.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
