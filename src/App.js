import { useState, useEffect } from "react";
import Main from "./Main";
import { Box, MovieList, WatchedSammury } from "./Main";
import NavBar from "./Nav";
import { Search, Results } from "./Nav";
// import Item from "./Item";
import Loader from "./loader";
import SeletedMovie from "./seletedMovie";
export const key = "74d93247"

export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("interstellar");
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  function handleSelectedMovie(id) {
    setSelectedMovieId(id)
    // console.log(selectedMovieId);

  }
  function handleClosedMovie() {
    setSelectedMovieId(null)
    // console.log(selectedMovieId);

  }
  useEffect(() => {
    async function getMovies() {
      try {
        setLoading(true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${searchQuery}`);

        if (!res.ok) {
          throw new Error("something went wrong");
        };

        const data = await res.json();
        console.log(data);
        if (data.Response === "False") {
          throw new Error("Movie not found");
        };
        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getMovies()
  }, [searchQuery])


  return (
    <>
      {/* <Item maxRate={5}></Item>
      <Item maxRate={10}></Item> */}
      <NavBar>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}></Search>
        <Results movies={movies} ></Results>
      </NavBar>
      <Main>
        <Box>
          {!loading && !error && < MovieList handleSelectedMovie={handleSelectedMovie} movies={movies} />}
          {error && <Error message={error} />}
          {loading && <Loader />}
        </Box>
        <Box>
          {selectedMovieId ? <SeletedMovie handleClosedMovie={handleClosedMovie} SeletedMovieId={selectedMovieId} /> : <WatchedSammury></WatchedSammury>}
        </Box>
      </Main>
    </>
  );
}
function Error({ message }) {
  return (
    <p className="error">{message}</p>
  )

}