// features/reviews/pages/ReviewsPage.jsx
import { useState, useEffect } from 'react';
import { getReviewsByProduct, getAverageRating } from '../services/reviewService';
import ReviewForm from '../components/ReviewForm';

const ReviewsPage = ({ productId, productName, currentUserId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReviews = async () => {
    try {
      setLoading(true);
      const [reviewsData, avgData] = await Promise.all([
        getReviewsByProduct(productId),
        getAverageRating(productId)
      ]);
      setReviews(reviewsData);
      setAverageRating(avgData.average || 0);
    } catch (err) {
      setError('Impossible de charger les avis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  };

  if (loading) return <div className="loading">Chargement des avis...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="reviews-page">
      <h2>Avis sur {productName}</h2>
      
      <div className="rating-summary">
        <span className="average-rating">{averageRating.toFixed(1)} / 5</span>
        <span className="stars">{renderStars(averageRating)}</span>
        <span className="review-count">({reviews.length} avis)</span>
      </div>

      {currentUserId && (
        <ReviewForm 
          productId={productId} 
          userId={currentUserId}
          onReviewAdded={loadReviews}
        />
      )}

      <div className="reviews-list">
        <h3>Avis des clients</h3>
        {reviews.length === 0 ? (
          <p>Soyez le premier à donner votre avis !</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <strong>{review.authorName || 'Anonyme'}</strong>
                <span className="review-rating">{renderStars(review.rating)}</span>
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;