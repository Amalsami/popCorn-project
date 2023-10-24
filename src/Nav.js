import { useState } from "react";

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo></Logo>
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
export function Search({ searchQuery, setSearchQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
export function Results({ movies }) {
  console.log(movies);
  return (
    <p className="num-results">
      Found <strong>{movies[0]?.Year}</strong> results
    </p>
  );
}
