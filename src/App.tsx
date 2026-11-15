import { NavLink, Route, Routes } from 'react-router';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <NavLink className="brand" to="/">
          What's for Dinner
        </NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
