import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmQwNThiMzkxMTE3ZjFkMmUyZDFkOWUxNTU1MTk2NSIsIm5iZiI6MTcyMDYyMjIzMC43NzA1NjIsInN1YiI6IjY2OGU5NmJjZjI4YTU4NWZhZDJlYjk3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upLqT5hXpc0d5SiNdtd3oUjh2g-8mZhLBjrSrzCewvQ";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getPopularMovies = () => {
  return instance
    .get("/movie/popular?language=en-US&page=1")
    .then((response) => response.data.results);
};
export const searchMovies = (query) => {
  return instance
    .get(
      `/search/movie?query=${query}&language=en-US&page=1&include_adult=false`
    )
    .then((response) => response.data.results);
};

export const getMovieDetails = (movieId) => {
  return instance
    .get(`/movie/${movieId}?language=en-US`)
    .then((response) => response.data);
};

export const getMovieCast = (movieId) => {
  return instance
    .get(`/movie/${movieId}/credits?language=en-US`)
    .then((response) => response.data.cast);
};

export const getMovieReviews = (movieId) => {
  return instance
    .get(`/movie/${movieId}/reviews?language=en-US&page=1`)
    .then((response) => response.data.results);
};
