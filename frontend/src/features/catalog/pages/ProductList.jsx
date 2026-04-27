import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      if (!response.ok) throw new Error('Erreur chargement produits');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <div className="product-list-loading">⏳ Chargement des produits...</div>;
  }

  if (error) {
    return (
      <div className="product-list-error">
        ❌ Erreur : {error}
        <br />
        <button onClick={fetchProducts} className="product-list-retry-btn">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Nos Produits Tech</h1>
      <p className="product-list-subtitle">Découvrez notre sélection de produits high-tech</p>
      
      <div className="product-list-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl || 'https://picsum.photos/id/0/300/200'}
              alt={product.name}
              className="product-card-image"
              onClick={() => handleImageClick(product.id)}
            />
            <div className="product-card-content">
  <h3 className="product-card-name">{product.name}</h3>
  
  {/* Affichage simplifié sans HTML */}
  <p className="product-card-description">
    {product.description?.replace(/<[^>]*>/g, ' ').substring(0, 80)}...
  </p>
  
  <div className="product-card-price-row">
    <span className="product-card-price">{product.price} DH</span>
    <Link to={`/product/${product.id}`} className="product-card-btn">
      Voir détails
    </Link>
  </div>
</div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="product-list-empty">
          Aucun produit disponible pour le moment.
        </div>
      )}
    </div>
  );
};

export default ProductList;