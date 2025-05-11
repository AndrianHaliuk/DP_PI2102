import React, { useState, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { AuthContext } from '../contexts/AuthContext';
import { UserCircle } from 'lucide-react';

interface NavbarProps {
  onFeedbackClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFeedbackClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useNavbarScroll(navRef);

  const navLinksRefs = useRef<Array<HTMLLIElement | null>>([]);

  const handleBurgerClick = () => {
    setIsMobileMenuOpen(open => !open);

    navLinksRefs.current.forEach((link, index) => {
      if (link) {
        link.style.animation = !isMobileMenuOpen
          ? `navLinkFade 0.5s ease forwards ${index / 7}s`
          : '';
      }
    });
  };

  return (
    <nav ref={navRef} className="site-nav" id="navbar" role="navigation">
      <div className="nav-container">
        <NavLink to="/" className="logo-link">
          <img src="/img/logo.webp" alt="Логотип" className="logo" loading="lazy" />
        </NavLink>

        {/* BURGER */}
        <div
          className={`burger ${isMobileMenuOpen ? 'toggle' : ''}`}
          onClick={handleBurgerClick}
        >
          <div className="line1" />
          <div className="line2" />
          <div className="line3" />
        </div>

        {/* NAV LINKS */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`}>
          {['/', '/about-us', '/what-we-do', '/media', '/contact', 'feedback'].map((path, i) => {
            const label = path === 'feedback' ? 'Відгук' 
              : path === '/' ? 'Головна'
              : path === '/about-us' ? 'Про нас'
              : path === '/what-we-do' ? 'Що ми робимо'
              : path === '/media' ? 'Медіа'
              : 'Контакти';

            return (
              <li
                key={i}
                ref={el => { navLinksRefs.current[i] = el; }}
              >
                {path === 'feedback' ? (
                  <a
                    className="link-btn"
                    onClick={() => { onFeedbackClick(); handleBurgerClick(); }}
                  >
                    {label}
                  </a>
                ) : (
                  <NavLink
                    to={path}
                    onClick={() => { if (isMobileMenuOpen) handleBurgerClick(); }}
                  >
                    {label}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>

        {/* DONATE LINK */}
        <NavLink to="/campaigns" className="nav-btn">
          Пожертвувати
        </NavLink>

        {/* PROFILE OR LOGIN */}
        {token ? (
          <a
            onClick={() => navigate('/profile')}
            className="profile-btn"
            aria-label="Перейти до профілю"
          >
            <UserCircle size={36} className="text-white cursor-pointer" />
          </a>
        ) : (
          <a onClick={() => navigate('/login')} className="login-btn primary-btn">
            Увійти
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
