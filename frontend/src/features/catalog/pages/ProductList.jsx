import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
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

  // Styles
  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    marginBottom: '0.5rem',
    color: '#1a1a2e',
    fontSize: '2rem'
  };

  const subtitleStyle = {
    marginBottom: '2rem',
    color: '#666'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem'
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, boxShadow 0.3s',
    cursor: 'pointer'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const cardContentStyle = {
    padding: '1rem'
  };

  const productNameStyle = {
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    color: '#333',
    height: '50px',
    overflow: 'hidden'
  };

  const descriptionStyle = {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '1rem',
    height: '40px',
    overflow: 'hidden'
  };

  const priceRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const priceStyle = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#e74c3c'
  };

  const buttonStyle = {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'opacity 0.3s'
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#666'
  };

  const errorStyle = {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: 'red'
  };

  const retryButtonStyle = {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer'
  };

  const emptyStyle = {
    textAlign: 'center',
    padding: '3rem',
    color: '#666'
  };

  // Événements
  const handleCardMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  };

  const handleButtonMouseEnter = (e) => {
    e.target.style.opacity = '0.8';
  };

  const handleButtonMouseLeave = (e) => {
    e.target.style.opacity = '1';
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        ⏳ Chargement des produits...
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorStyle}>
        ❌ Erreur : {error}
        <br />
        <button onClick={fetchProducts} style={retryButtonStyle}>
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Nos Produits Tech</h1>
      <p style={subtitleStyle}>Découvrez notre sélection de produits high-tech</p>
      
      <div style={gridStyle}>
        {products.map((product) => (
          <div
            key={product.id}
            style={cardStyle}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            <img
              src={product.imageUrl || 'https://picsum.photos/id/0/300/200'}
              alt={product.name}
              style={imageStyle}
            />
            <div style={cardContentStyle}>
              <h3 style={productNameStyle}>
                {product.name}
              </h3>
              <p style={descriptionStyle}>
                {product.description}
              </p>
              <div style={priceRowStyle}>
                <span style={priceStyle}>
                  {product.price} €
                </span>
                <Link
                  to={`/product/${product.id}`}
                  style={buttonStyle}
                  onMouseEnter={handleButtonMouseEnter}
                  onMouseLeave={handleButtonMouseLeave}
                >
                  Voir détails
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div style={emptyStyle}>
          Aucun produit disponible pour le moment.
        </div>
      )}
    </div>
  );
};

export default ProductList;