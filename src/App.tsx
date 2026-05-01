import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FlavorDetails } from './pages/FlavorDetails';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flavor/:id" element={<FlavorDetails />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
