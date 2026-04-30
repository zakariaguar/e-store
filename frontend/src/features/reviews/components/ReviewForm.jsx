import { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Récupérer l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setMessage('❌ Veuillez vous connecter pour laisser un avis');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: parseInt(productId),
          userId: user.id,
          userName: userName || `${user.firstName} ${user.lastName}`,
          rating: rating,
          comment: comment
        })
      });

      if (response.ok) {
        setMessage('✅ Merci pour votre avis !');
        setRating(5);
        setComment('');
        if (onReviewAdded) onReviewAdded();
      } else {
        setMessage('❌ Erreur lors de l\'envoi de l\'avis');
      }
    } catch (err) {
      setMessage('❌ Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form-container">
      <h3 className="review-form-title">📝 Donnez votre avis</h3>
      
      {message && <div className={`review-form-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-form-group">
          <label>Votre nom</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={user ? `${user.firstName} ${user.lastName}` : 'Votre nom'}
          />
        </div>

        <div className="review-form-group">
          <label>Note</label>
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`review-star ${star <= rating ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="review-form-group">
          <label>Votre avis</label>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partagez votre expérience avec ce produit..."
            required
          />
        </div>

        <button type="submit" className="review-submit-btn" disabled={loading}>
          {loading ? 'Envoi en cours...' : '📤 Publier mon avis'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;