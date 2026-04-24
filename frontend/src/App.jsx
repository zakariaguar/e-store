import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './shared/components/Navbar/Navbar';
import About from './features/about/pages/About';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;