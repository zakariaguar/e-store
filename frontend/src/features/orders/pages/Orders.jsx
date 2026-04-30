import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
  setLoading(true);
  try {
    const response = await fetch(`http://localhost:8080/api/orders/user/${userId}`);
    console.log('Response status:', response.status);
    
    const text = await response.text();
    console.log('Premiers 200 caractères:', text.substring(0, 200));
    console.log('Derniers 200 caractères:', text.substring(text.length - 200));
    
    if (!response.ok) throw new Error('Erreur chargement commandes');
    
    // Nettoie la réponse si nécessaire
    let cleanText = text;
    // Si la réponse commence par [ et finit par ], c'est un JSON valide
    
    const data = JSON.parse(cleanText);
    console.log('Parsed orders:', data);
    setOrders(data);
  } catch (err) {
    console.error('Erreur:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return <div className="orders-loading">⏳ Chargement de vos commandes...</div>;
  }

  if (error) {
    return (
      <div className="orders-error">
        ❌ {error}
        <br />
        <button onClick={fetchOrders} className="orders-retry-btn">Réessayer</button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="orders-empty-icon">📦</div>
        <h2>Aucune commande</h2>
        <p>Vous n'avez pas encore passé de commande.</p>
        <Link to="/" className="orders-empty-btn">Commencer mes achats</Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">📦 Mes Commandes</h1>
      <p className="orders-subtitle">Consultez l'historique de vos achats</p>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="orders-card">
            <div className="orders-card-header">
              <div>
                <span className="orders-card-number">📋 CMD-{order.id}</span>
                <span className="orders-card-date">
                  {new Date(order.orderDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <span className={`orders-card-status status-${order.status?.toLowerCase() || 'pending'}`}>
                {order.status === 'PENDING' && 'En attente'}
                {order.status === 'CONFIRMED' && 'Confirmée'}
                {order.status === 'SHIPPED' && 'Expédiée'}
                {order.status === 'DELIVERED' && 'Livrée'}
                {order.status === 'CANCELLED' && 'Annulée'}
                {!order.status && 'En attente'}
              </span>
            </div>

            <div className="orders-card-items">
              {order.items?.map((item) => (
                <div key={item.id} className="orders-item">
                  <img 
                    src={item.imageUrl || 'https://picsum.photos/id/0/60/60'} 
                    alt={item.productName}
                    className="orders-item-img"
                  />
                  <div className="orders-item-info">
                    <Link to={`/product/${item.productId}`} className="orders-item-name">
                      {item.productName}
                    </Link>
                    <div className="orders-item-meta">
                      <span>Quantité: {item.quantity}</span>
                      <span>Prix unitaire: {item.price} DH</span>
                    </div>
                  </div>
                  <div className="orders-item-total">
                    {item.price * item.quantity} DH
                  </div>
                </div>
              ))}
            </div>

            <div className="orders-card-footer">
              <div className="orders-card-total">
                <span>Total de la commande</span>
                <strong>{order.total} DH</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;