import { useState, useEffect } from 'react';
import './ReviewList.css';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/product/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="review-list-loading">⏳ Chargement des avis...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="review-list-empty">
        <span>⭐</span>
        <p>Soyez le premier à donner votre avis !</p>
      </div>
    );
  }

  return (
    <div className="review-list-container">
      <h3 className="review-list-title">💬 Avis clients ({reviews.length})</h3>
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="review-user">
                <span className="review-user-avatar">
                  {review.userName?.charAt(0).toUpperCase() || '👤'}
                </span>
                <span className="review-user-name">{review.userName}</span>
              </div>
              <div className="review-rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <div className="review-date">
                {review.createdAt ? new Date(review.createdAt).toLocaleDateString('fr-FR') : 'Récent'}
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;