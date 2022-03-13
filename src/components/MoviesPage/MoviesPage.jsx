import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './MoviesPage.module.css';


export default function MoviePage() {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);

  let navigate = useNavigate();
  let params = useParams();

 

  const url = `https://api.themoviedb.org/3/search/movie?api_key=7d4759b38fdb93bbea25cb13d285324c&query=${searchValue}`;

  const handleChange = e => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    getMovieRequest(e.target.elements.searchValue.value);
    setSearchValue(searchValue);
  };

  const getMovieRequest = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      alert("Wprowadź szukaną wartość");
      
    }
  };

  return (
    <div>
      {!params.movieId && (
        <div>
          <div className={styles.Form}>
            <header>
              <form onSubmit={handleSubmit}>
                <input
                  onChange={handleChange}
                  value={searchValue}
                  name="searchValue"
                  type="text"
                  autoComplete="off"
                  autoFocus
                  placeholder="Search movie"
                />
                <button type="submit">
                  <span>Search</span>
                </button>
              </form>
            </header>
          </div>

          <div>
            <ul>
              {movies.map(({ id, title }) => (
                <Link to={`/movies/${id}`} key={id}>
                  <li key={id}>{title}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
      {params.movieId && (
        <div>
          <button
            className={styles.ReturnButton}
            onClick={() => {
              navigate(-1);
            }}
          >
            <span className={styles.ButtonText}> Go back</span>
          </button>
          <Outlet />
        </div>
      )}
    </div>
  );
}
