import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // Récupérer l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Rediriger vers login si non connecté
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
  setLoading(true);
  try {
    const response = await fetch(`http://localhost:8080/api/cart/${userId}`);
    if (!response.ok) throw new Error('Erreur chargement panier');
    const data = await response.json();
    console.log('📦 Panier reçu:', data);
    setCart(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  

  const updateQuantity = async (cartItemId, newQuantity) => {
  if (newQuantity < 1) {
    removeItem(cartItemId);
    return;
  }
  
  setUpdating(true);
  try {
    const response = await fetch(`http://localhost:8080/api/cart/update?cartItemId=${cartItemId}&quantity=${newQuantity}`, {
      method: 'PUT',
    });
    
    if (response.ok) {
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.map(item =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      }));
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setUpdating(false);
  }
};

const removeItem = async (cartItemId) => {
  setUpdating(true);
  try {
    const response = await fetch(`http://localhost:8080/api/cart/remove/${cartItemId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.id !== cartItemId)
      }));
    }
  } catch (err) {
    console.error('Erreur:', err);
  } finally {
    setUpdating(false);
  }
};
  const clearCart = async () => {
  setUpdating(true);
  try {
    const response = await fetch(`http://localhost:8080/api/cart/${userId}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      // Vide le panier localement IMMÉDIATEMENT
      setCart(prevCart => ({
        ...prevCart,
        items: []
      }));
    } else {
      throw new Error('Erreur vidage panier');
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setUpdating(false);
  }
};

  const checkout = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${userId}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erreur validation commande');
      await fetchCart();
      alert('✅ Commande validée avec succès !');
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Calcul du total
  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  if (loading) {
    return <div className="cart-loading">⏳ Chargement de votre panier...</div>;
  }

  if (error) {
    return (
      <div className="cart-error">
        ❌ {error}
        <br />
        <button onClick={fetchCart} className="cart-retry-btn">Réessayer</button>
      </div>
    );
  }

  const total = calculateTotal();
  const hasItems = cart && cart.items && cart.items.length > 0;

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Mon Panier</h1>

      {!hasItems ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛍️</div>
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos produits et ajoutez-les à votre panier.</p>
          <Link to="/" className="cart-empty-btn">Continuer mes achats</Link>
        </div>
      ) : (
        <>
          <div className="cart-content">
            {/* Liste des produits */}
            <div className="cart-items">
              <div className="cart-items-header">
                <span className="cart-col-product">Produit</span>
                <span className="cart-col-price">Prix</span>
                <span className="cart-col-quantity">Quantité</span>
                <span className="cart-col-total">Total</span>
                <span className="cart-col-remove"></span>
              </div>

              {cart.items.map((item) => {
  console.log('Item ID:', item.id, 'Product:', item.productName);
  return (
    <div key={item.id} className="cart-item">
      <div className="cart-item-product">
        <img 
          src={item.imageUrl || 'https://picsum.photos/id/0/60/60'} 
          alt={item.productName}
          className="cart-item-img"
        />
        <div className="cart-item-info">
          <Link to={`/product/${item.productId}`} className="cart-item-name">
            {item.productName}
          </Link>
        </div>
      </div>
      <div className="cart-item-price">{item.price} DH</div>
      <div className="cart-item-quantity">
        <button 
          className="cart-qty-btn"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={updating}
        >
          -
        </button>
        <span className="cart-qty-value">{item.quantity}</span>
        <button 
          className="cart-qty-btn"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          disabled={updating}
        >
          +
        </button>
      </div>
      <div className="cart-item-total">{item.price * item.quantity} DH</div>
      <div className="cart-item-remove">
        <button 
          className="cart-remove-btn"
          onClick={() => removeItem(item.id)}
          disabled={updating}
        >
          🗑️
        </button>
      </div>
    </div>
  );
})}
            </div>

            {/* Résumé de la commande */}
            <div className="cart-summary">
              <h3 className="cart-summary-title">Résumé de la commande</h3>
              <div className="cart-summary-row">
                <span>Sous-total</span>
                <span>{total} DH</span>
              </div>
              <div className="cart-summary-row">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="cart-summary-divider"></div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span className="cart-summary-total-price">{total} DH</span>
              </div>
              <button 
                className="cart-checkout-btn"
                onClick={checkout}
                disabled={updating}
              >
                {updating ? 'Traitement...' : '✅ Valider la commande'}
              </button>
              <button 
                className="cart-clear-btn"
                onClick={clearCart}
                disabled={updating}
              >
                🗑️ Vider le panier
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;