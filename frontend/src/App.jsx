import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './shared/components/Navbar/Navbar';
import Footer from './shared/components/Footer/Footer';
import ProductList from './features/catalog/pages/ProductList';
import ProductDetail from './features/catalog/pages/ProductDetail';
import Login from './features/auth/pages/Login';
import CategoryProducts from './features/catalog/pages/CategoryProducts';
import Cart from './features/cart/pages/Cart';
import Orders from './features/orders/pages/Orders';
import AdminProducts from './features/admin/pages/AdminProducts';



import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/category/:id" element={<CategoryProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin" element={<AdminProducts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;