import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
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

  const addToCart = async () => {
    setAddingToCart(true);
    try {
      // Pour l'instant, on utilise userId = 1 (en attendant l'auth)
      const userId = 1;
      const response = await fetch(`http://localhost:8080/api/cart/add?userId=${userId}&productId=${product.id}&quantity=${quantity}`, {
        method: 'POST',
      });
      if (response.ok) {
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
    return (
      <div className="product-detail-loading">
        ⏳ Chargement du produit...
      </div>
    );
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
        {/* Image */}
        <div className="product-detail-image">
          <img src={product.imageUrl || 'https://picsum.photos/id/0/400/400'} alt={product.name} />
        </div>

        {/* Infos produit */}
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-description" dangerouslySetInnerHTML={{ __html: product.description }}></p>
          <div className="product-detail-price">{product.price} €</div>
          
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;