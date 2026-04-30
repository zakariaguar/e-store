import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const stored = localStorage.getItem('user');
  
  if (!stored) return <Navigate to="/login" />;
  
  const user = JSON.parse(stored);
  
  if (user.role !== 'ADMIN') return <Navigate to="/" />;
  
  return children;
};

export default AdminRoute;