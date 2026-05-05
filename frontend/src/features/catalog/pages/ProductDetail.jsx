import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import ReviewList from '../../reviews/components/ReviewList';
import ReviewForm from '../../reviews/components/ReviewForm';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetchProduct();
    fetchAverageRating();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      if (!response.ok) throw new Error('Produit non trouvé');
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/product/${id}`);
      if (response.ok) {
        const reviews = await response.json();
        setReviewsCount(reviews.length);
        if (reviews.length > 0) {
          const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
          const avg = sum / reviews.length;
          setAverageRating(avg);
        }
      }
    } catch (error) {
      console.error('Erreur chargement note moyenne:', error);
    }
  };

  const addToCart = async () => {
    if (!user) {
      alert('Veuillez vous connecter pour ajouter au panier');
      navigate('/login');
      return;
    }

    setAddingToCart(true);
    try {
      const response = await fetch(`http://localhost:8080/api/cart/add?userId=${user.id}&productId=${product.id}&quantity=${quantity}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        alert('✅ Produit ajouté au panier !');
        navigate('/cart');
      } else {
        alert('Erreur lors de l\'ajout au panier');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout au panier');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="product-detail-loading">⏳ Chargement du produit...</div>;
  }

  if (error || !product) {
    return (
      <div className="product-detail-error">
        ❌ {error || 'Produit non trouvé'}
        <br />
        <Link to="/" className="product-detail-back-link">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <Link to="/" className="product-detail-back-link">← Retour aux produits</Link>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.imageUrl || 'https://picsum.photos/id/0/400/400'} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          <div className="product-detail-description" dangerouslySetInnerHTML={{ __html: product.description }}></div>
          <div className="product-detail-price">{product.price} DH</div>
          
          {/* Note moyenne */}
          <div className="product-detail-rating">
            <div className="product-rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`rating-star ${star <= Math.round(averageRating) ? 'filled' : 'empty'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="product-rating-average">
              {averageRating.toFixed(1)} / 5
            </span>
            <span className="product-rating-count">
              ({reviewsCount} avis)
            </span>
          </div>

          <div className="product-detail-quantity">
            <label>Quantité :</label>
            <input
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>

          <button 
            className="product-detail-add-btn"
            onClick={addToCart}
            disabled={addingToCart}
          >
            {addingToCart ? 'Ajout en cours...' : '🛒 Ajouter au panier'}
          </button>

          <div className="product-detail-reviews">
            <ReviewList productId={id} />
            <ReviewForm productId={id} onReviewAdded={() => window.location.reload()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;