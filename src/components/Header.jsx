import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Carrega tema salvo ao montar componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Alterna tema
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <>
      {/* VIDRO: cobre só abaixo do header */}
      <div
        className={`menu-backdrop ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <header className="header">
        <nav className="nav-container container">
          <div className="logo">JM</div>

          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a></li>
            <li><a href="#competencias" onClick={() => setMenuOpen(false)}>Competências</a></li>
            <li><a href="#timeline" onClick={() => setMenuOpen(false)}>Experiência</a></li>
            <li><a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfólio</a></li>
            <li><a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a></li>
          </ul>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
