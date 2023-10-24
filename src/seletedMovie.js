import { useEffect, useState } from "react";
import { key } from "./App";

function SeletedMovie({ handleClosedMovie, SeletedMovieId }) {
  const [movie, setMovie] = useState([]);
  const {
    Title: title,
    Year: year,
    imdbRating,
    Poster: poster,
    RunTime,
    Plot: plot,
    Released: released,
  } = movie;
  console.log(movie);
  // console.log(key);
  useEffect(() => {
    async function getMovieDetails() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${SeletedMovieId}`
      );
      const movieDetails = await res.json();
      setMovie(movieDetails);
      console.log(movieDetails);
    }
    getMovieDetails();
  }, []);

  return (
    <div className="details">
      <button onClick={handleClosedMovie}>→</button>
      {SeletedMovieId}
      <header>
        <img src={poster} />
        <div className=".section-overview">
          <h1>{title}</h1>
          <p>
            {released} &bull; {year}
          </p>
        </div>
      </header>
    </div>
  );
}

export default SeletedMovie;
