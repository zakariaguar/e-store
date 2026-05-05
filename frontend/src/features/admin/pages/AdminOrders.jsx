import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/orders/admin/all');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setError('Erreur chargement commandes');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/admin/${orderId}/status?status=${newStatus}`, {
        method: 'PUT',
      });
      if (response.ok) {
        fetchAllOrders();
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return 'En attente';
    }
  };

  if (loading) {
    return <div className="admin-orders-loading">⏳ Chargement des commandes...</div>;
  }

  return (
    <div className="admin-orders-container">
      <h1>📦 Gestion des commandes</h1>
      <p>Consultez et gérez toutes les commandes des clients</p>

      {error && <div className="admin-orders-error">{error}</div>}

      <div className="admin-orders-table-wrapper">
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  <div className="admin-order-client">
                    <strong>{order.firstName} {order.lastName}</strong>
                    <small>{order.phone}</small>
                    <small>{order.address}</small>
                  </div>
                </td>
                <td>{new Date(order.orderDate).toLocaleDateString('fr-FR')}</td>
                <td className="admin-order-total">{order.total} DH</td>
                <td>
                  <span className={`admin-order-status ${getStatusBadgeClass(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td>
                  <select 
                    value={order.status || 'PENDING'} 
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="admin-order-select"
                  >
                    <option value="PENDING">En attente</option>
                    <option value="CONFIRMED">Confirmée</option>
                    <option value="SHIPPED">Expédiée</option>
                    <option value="DELIVERED">Livrée</option>
                    <option value="CANCELLED">Annulée</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="admin-orders-empty">Aucune commande trouvée</div>
      )}
    </div>
  );
};

export default AdminOrders;