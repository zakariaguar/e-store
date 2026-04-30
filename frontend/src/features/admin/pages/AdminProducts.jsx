import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminProducts.css';

const AdminProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState('');
  const [stockLoading, setStockLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', description: '', price: '',
    imageUrl: '', categoryId: '', quantity: ''
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setCategories([]);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erreur:', error);
      setProducts([]);
    }
  };

  // Fetch stock for a product
  const fetchStock = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/${productId}`);
      if (response.ok) {
        const quantity = await response.json();
        return quantity;
      }
      return 0;
    } catch (error) {
      console.error('Erreur:', error);
      return 0;
    }
  };

  // Update stock for a product
  const updateStock = async (productId, quantity) => {
    setStockLoading(true);
    try {
      // First, check if stock exists
      const existingStock = await fetchStock(productId);
      
      let response;
      if (existingStock > 0 || existingStock === 0) {
        // Update existing stock
        response = await fetch(`http://localhost:8080/api/inventory/admin/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity })
        });
      } else {
        // Create new stock
        response = await fetch('http://localhost:8080/api/inventory/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity })
        });
      }
      
      if (response.ok) {
        setMessage('✅ Stock mis à jour avec succès !');
        setShowStockModal(false);
        setSelectedProduct(null);
        setNewStock('');
      } else {
        setMessage('❌ Erreur lors de la mise à jour du stock');
      }
    } catch (error) {
      setMessage('❌ Erreur lors de la mise à jour du stock');
    } finally {
      setStockLoading(false);
    }
  };

  // Open stock modal
  const openStockModal = async (product) => {
    const currentStock = await fetchStock(product.id);
    setSelectedProduct({ ...product, currentStock });
    setNewStock(currentStock.toString());
    setShowStockModal(true);
  };

  // Admin check
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      navigate('/login');
      setChecking(false);
      return;
    }
    if (user.role !== 'ADMIN') {
      setMessage('⛔ Accès réservé aux administrateurs');
      setTimeout(() => navigate('/'), 2000);
      setChecking(false);
      return;
    }
    setIsAuthorized(true);
    setChecking(false);
    fetchCategories();
    fetchProducts();
  }, [navigate]);

  if (checking) return <div className="admin-loading">⏳ Vérification des droits...</div>;
  if (!isAuthorized) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const formDataImage = new FormData();
        formDataImage.append('image', imageFile);
        formDataImage.append('categoryId', formData.categoryId);
        const uploadResponse = await fetch('http://localhost:8080/api/admin/upload', {
          method: 'POST', body: formDataImage
        });
        if (uploadResponse.ok) {
          const data = await uploadResponse.json();
          imageUrl = data.imageUrl;
        } else {
          throw new Error("Erreur lors de l'upload de l'image");
        }
      }
      const productResponse = await fetch('http://localhost:8080/api/products/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          imageUrl: imageUrl || 'https://picsum.photos/id/0/300/300',
          categoryId: parseInt(formData.categoryId)
        })
      });
      if (!productResponse.ok) throw new Error(await productResponse.text());
      const product = await productResponse.json();
      const stockResponse = await fetch('http://localhost:8080/api/inventory/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: parseInt(formData.quantity) })
      });
      if (!stockResponse.ok) throw new Error('Erreur ajout stock');
      setMessage('✅ Produit ajouté avec succès !');
      setFormData({ name: '', description: '', price: '', imageUrl: '', categoryId: '', quantity: '' });
      setImageFile(null);
      setImagePreview('');
      fetchProducts();
    } catch (error) {
      setMessage(`❌ Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      const response = await fetch(`http://localhost:8080/api/products/admin/products/${productId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setMessage('✅ Produit supprimé');
        fetchProducts();
      } else {
        setMessage('❌ Erreur suppression');
      }
    } catch {
      setMessage('❌ Erreur suppression');
    }
  };

  return (
    <div className="admin-container">
      <h1>👨‍💼 Administration - Gestion des produits</h1>
      {message && <div className={`admin-message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}
      
      <div className="admin-grid">
        {/* Formulaire d'ajout */}
        <div className="admin-form-card">
          <h2>➕ Ajouter un produit</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-group">
              <label>Nom du produit *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="admin-form-group">
              <label>Description</label>
              <textarea name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Prix (DH) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="admin-form-group">
                <label>Quantité (stock) *</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
              </div>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>Catégorie *</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
                  <option value="">Sélectionner</option>
                  {categories.length > 0
                    ? categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
                    : <option value="">Chargement...</option>
                  }
                </select>
              </div>
              <div className="admin-form-group">
                <label>URL de l'image (optionnel)</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} placeholder="https://..." onChange={handleChange} />
              </div>
            </div>
            <div className="admin-form-group">
              <label>OU uploader une image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && <div className="admin-image-preview"><img src={imagePreview} alt="Aperçu" /></div>}
            </div>
            <button type="submit" className="admin-btn" disabled={loading}>
              {loading ? 'Ajout en cours...' : '➕ Ajouter le produit'}
            </button>
          </form>
        </div>

        {/* Liste des produits */}
        <div className="admin-list-card">
          <h2>📦 Produits existants ({products.length})</h2>
          <div className="admin-products-list">
            {products.map(product => (
              <div key={product.id} className="admin-product-item">
                <img src={product.imageUrl || 'https://picsum.photos/id/0/50/50'} alt={product.name} />
                <div className="admin-product-info">
                  <strong>{product.name}</strong>
                  <span>{product.price} DH</span>
                </div>
                <div className="admin-product-actions">
                  <button 
                    onClick={() => openStockModal(product)} 
                    className="admin-stock-btn"
                    title="Modifier le stock"
                  >
                    Stock
                  </button>
                  <button 
                    onClick={() => deleteProduct(product.id)} 
                    className="admin-delete-btn"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de modification du stock */}
      {showStockModal && selectedProduct && (
        <div className="admin-modal-overlay" onClick={() => setShowStockModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Modifier le stock</h3>
              <button className="admin-modal-close" onClick={() => setShowStockModal(false)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <p><strong>Produit :</strong> {selectedProduct.name}</p>
              <p><strong>Stock actuel :</strong> {selectedProduct.currentStock} unités</p>
              <div className="admin-form-group">
                <label>Nouvelle quantité :</label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  min="0"
                  className="admin-stock-input"
                />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-modal-cancel" onClick={() => setShowStockModal(false)}>
                Annuler
              </button>
              <button 
                className="admin-modal-confirm" 
                onClick={() => updateStock(selectedProduct.id, parseInt(newStock))}
                disabled={stockLoading}
              >
                {stockLoading ? 'Mise à jour...' : 'Mettre à jour'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;