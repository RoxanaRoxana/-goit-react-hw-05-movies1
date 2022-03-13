import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.css';

const url =
  'https://api.themoviedb.org/3/movie/popular?api_key=7d4759b38fdb93bbea25cb13d285324c';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  const getMovieRequest = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

  return (
    <div>
      <h2 className={styles.MovieListHeader} >Trending today</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`}> {movie.title}</NavLink>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
}
