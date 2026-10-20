const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default async function searchMovies(query) {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing");
  }

  const url = new URL(
    "https://api.themoviedb.org/3/search/movie"
  );

  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("query", query);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}