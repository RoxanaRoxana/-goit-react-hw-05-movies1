import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Reviews.module.css';



export default function Reviews() {
  const [reviews, setReviews] = useState([]);
const { movieId } = useParams();

  
    const getReviews = async (id) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=7d4759b38fdb93bbea25cb13d285324c`
        );
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        console.error(error);
      }
  };
  
  useEffect(() => {
    getReviews(movieId)
  }, [movieId, setReviews])
  
  
  return (
    <div>
      <ul>
        {reviews.length > 0
          ? reviews.map(({ id, author, content }) => (
              <li key={id}>
                <span className={styles.Author}>Author: {author}</span>
                <p>{content}</p>
              </li>
            ))
          : 'No reviews'}
      </ul>
    </div>
  );
}
