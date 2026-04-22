// features/reviews/components/ReviewForm.jsx
import { useState } from 'react';
import { addReview } from '../services/reviewService';

const ReviewForm = ({ productId, userId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const reviewData = {
        productId: Number(productId),
        userId: Number(userId),
        rating: parseInt(rating, 10),
        comment: comment,
        date: new Date().toISOString()
      };
      
      await addReview(reviewData);
      setComment('');
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'avis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Donnez votre avis</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Note :</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">★★★★★ (5/5)</option>
            <option value="4">★★★★☆ (4/5)</option>
            <option value="3">★★★☆☆ (3/5)</option>
            <option value="2">★★☆☆☆ (2/5)</option>
            <option value="1">★☆☆☆☆ (1/5)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Votre commentaire :</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
            placeholder="Partagez votre experience avec ce produit..."
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Envoi...' : 'Publier mon avis'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;