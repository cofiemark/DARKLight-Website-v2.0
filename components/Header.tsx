import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search as SearchIcon, Cpu, Menu, X, Wrench } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
  if (path === '/') {
    return location.pathname === '/'
      ? 'text-brand-400'
      : 'text-gray-300 hover:text-white';
  }

  return location.pathname.startsWith(path)
    ? 'text-brand-400'
    : 'text-gray-300 hover:text-white';
};

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Cpu className="text-brand-500" size={28} />
          <span className="text-xl font-bold tracking-tight text-white">
            Dark<span className="text-brand-500">Light</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/learn" className={isActive('/learn')}>Learn</Link>
          <Link to="/tools" className={isActive('/tools')}>Tools</Link>
          <Link to="/downloads" className={isActive('/downloads')}>Downloads</Link>
          <Link to="/community" className={isActive('/community')}>Community</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenSearch}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white px-3 py-1.5 rounded-full text-sm transition-colors border border-gray-700"
          >
            <SearchIcon size={14} />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-gray-500 bg-gray-900 rounded border border-gray-700">Ctrl K</kbd>
          </button>
          
          <button 
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900">
          <nav className="flex flex-col p-4 space-y-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 block">Home</Link>
            <Link to="/learn" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 block">Learn</Link>
            <Link to="/tools" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 block">Tools</Link>
            <Link to="/downloads" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 block">Downloads</Link>
            <Link to="/community" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 block">Community</Link>
          </nav>
        </div>
      )}
    </header>
  );
};