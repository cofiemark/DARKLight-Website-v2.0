import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Search } from './components/Search';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { Community } from './pages/Community';
import { Tools } from './pages/Tools';
import { Downloads } from './pages/Downloads';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-sans">
        <Header 
          onOpenSearch={() => setIsSearchOpen(true)} 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn/:pageSlug" element={<Learn />} />
            {/* redirect of learn/getting-started */}
            <Route
              path="/learn"
              element={<Navigate to="/learn/installation-setup" replace />}
            />
            <Route path="/tools" element={<Tools />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>

        <Footer />
        
        <Search 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      </div>
    </Router>
  );
}

export default App;