import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CategoryProducts.css';

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/products/category/${id}`);
      if (!response.ok) throw new Error('Erreur chargement produits');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Noms des catégories selon l'ID
  const categoryNames = {
    1: 'Smartphones',
    2: 'Ordinateurs',
    3: 'Électroménager',
    4: 'TV & Audio'
  };

  if (loading) {
    return <div className="product-list-loading">⏳ Chargement des produits...</div>;
  }

  if (error) {
    return (
      <div className="product-list-error">
        ❌ {error}
        <br />
        <button onClick={fetchProducts} className="product-list-retry-btn">Réessayer</button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">
        {categoryNames[id]} <span style={{ fontSize: '1rem', color: '#888' }}>({products.length} produits)</span>
      </h1>
      <p className="product-list-subtitle">Découvrez notre sélection</p>

      <div className="product-list-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.imageUrl || 'https://picsum.photos/id/0/300/200'}
                alt={product.name}
                className="product-card-image"
              />
            </Link>
            <div className="product-card-content">
              <h3 className="product-card-name">{product.name}</h3>
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
        <div className="product-list-empty">Aucun produit dans cette catégorie.</div>
      )}
    </div>
  );
};

export default CategoryProducts;