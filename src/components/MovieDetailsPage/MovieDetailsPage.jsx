import { NavLink, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import styles from './MovieDetailsPage.module.css'



export default function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  
  const { movieId } = useParams();
 



  
    const getMovieDetailsRequest = async (id) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=7d4759b38fdb93bbea25cb13d285324c`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

  
  useEffect(() => {
    getMovieDetailsRequest(movieId);
  }, [movieId, setMovie]);

  
  const {
    poster_path,
    title,
    release_date,
    vote_average,
    overview,
    genres
  } = movie;


  return (
    <div>
      <div>
        <div className={styles.MovieDetails}>
          <div className={styles.MoviePoster}>
            {poster_path !== undefined ? (
              <img
                className={styles.MoviePosterPhoto}
                src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
              />
            ) : (
              `${title}`
            )}
          </div>

          <div className={styles.MovieInformation}>
            <h2>
              {title} ({release_date ? release_date.slice(0, 4) : ''})
            </h2>

            <p> User Score: {vote_average * 10}%</p>
            <h3> Overview</h3>
            <p className={styles.MovieOverview}> {overview}</p>
            <h3>Genres</h3>
            <p>
              {genres !== undefined
                ? genres.map(({ id, name }) => (
                    <span key={id}>
                      {name} {'  '}
                    </span>
                  ))
                : `No genres`}
            </p>
          </div>
        </div>
        <div className={styles.AddInf}>
          <h4>Additional information</h4>
          <ul>
            <li>
              <NavLink to={`/movies/${movieId}/cast`}>Cast </NavLink>
            </li>
            <li>
              <NavLink to={`/movies/${movieId}/reviews`}> Reviews</NavLink>
            </li>
          </ul>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
