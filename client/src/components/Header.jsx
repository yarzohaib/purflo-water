import { useEffect, useState } from 'react';
import './Header.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Why Purflo', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" onClick={handleNavClick}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="30" height="30">
              <path
                d="M20 5c6 8 11 14 11 20a11 11 0 1 1-22 0c0-6 5-12 11-20z"
                fill="var(--color-primary)"
              />
            </svg>
          </span>
          <span className="brand-name">Purflo</span>
        </a>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={handleNavClick}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary nav-cta" onClick={handleNavClick}>
            Get in touch
          </a>
        </nav>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Header;
