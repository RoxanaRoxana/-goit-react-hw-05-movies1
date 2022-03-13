import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Cast.module.css'
import photo from './noPhoto.jpg'


export default function Cast() {
  const [movieCast, setMovieCast] = useState();
  const { movieId } = useParams();
  
  const getMovieCast = async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7d4759b38fdb93bbea25cb13d285324c`
      );
      const data = await response.json();
      setMovieCast(data.cast);
    } catch (error) {
      console.error(error);
    }
  }
    
  useEffect(() => {
    getMovieCast(movieId);
  }, [movieId, setMovieCast]);


 

  return (
    <div>
      <ul className={styles.CastList}>
        {movieCast !== undefined
          ? movieCast.map(({ id, name, profile_path, character }) => (
              <li key={id} className={styles.CastListItem}>
                <div className={styles.CastListItemPhoto}>
                  {profile_path !== null ? (
                    <img
                      className={styles.CastItemPhoto}
                      src={`http://image.tmdb.org/t/p/w500/${profile_path}`}
                      alt={name}
                    />
                  ) : (
                    <img
                      className={styles.CastItemPhoto}
                      src={photo}
                      alt={name}
                    />
                  )}
                </div>
                <div className={styles.CastInfo}>
                  <span className={styles.NameSpan}>{name}</span>
                  <span>Charackter: {character}</span>
                </div>
              </li>
            ))
          : 'No cast'}
      </ul>
    </div>
  );
}
