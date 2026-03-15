import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About.tsx';
import Gallery from './pages/Gallery.tsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
