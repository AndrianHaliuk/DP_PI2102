import React, { useState, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { AuthContext } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { UserCircle } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL;

interface NavbarProps {
  onFeedbackClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFeedbackClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const { token } = useContext(AuthContext);
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  useNavbarScroll(navRef);

  const navLinksRefs = useRef<Array<HTMLLIElement | null>>([]);
  const handleBurgerClick = () => {
    setIsMobileMenuOpen(open => !open);
    navLinksRefs.current.forEach((link, i) => {
      if (link) link.style.animation = !isMobileMenuOpen
        ? `navLinkFade 0.5s ease forwards ${i / 7}s`
        : '';
    });
  };

  const getAvatarSrc = (avatarUrl?: string): string | undefined => {
    if (!avatarUrl) return undefined;
    if (avatarUrl.startsWith('http') || avatarUrl.startsWith('data:')) return avatarUrl;
    return `${BASE_URL}/uploads/${avatarUrl}`;
  };

  return (
    <nav ref={navRef} className="site-nav" id="navbar" role="navigation">
      <div className="nav-container">
        <NavLink to="/" className="logo-link" onClick={() => isMobileMenuOpen && handleBurgerClick()}>
          <img src="/img/logo.webp" alt="Логотип" className="logo" loading="lazy" />
        </NavLink>

        <div className={`burger ${isMobileMenuOpen ? 'toggle' : ''}`} onClick={handleBurgerClick}>
          <div className="line1" />
          <div className="line2" />
          <div className="line3" />
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`}>
          {['/', '/about-us', '/what-we-do', '/contact', 'feedback'].map((path, i) => {
            const label = path === 'feedback' ? 'Відгук'
              : path === '/' ? 'Головна'
              : path === '/about-us' ? 'Про нас'
              : path === '/what-we-do' ? 'Що ми робимо'
              : 'Контакти'
            return (
              <li key={i} ref={(el) => { navLinksRefs.current[i] = el; }}>
                {path === 'feedback'
                  ? <a className="link-btn" onClick={() => { onFeedbackClick(); handleBurgerClick(); }}>{label}</a>
                  : <NavLink to={path} onClick={() => isMobileMenuOpen && handleBurgerClick()}>{label}</NavLink>
                }
              </li>
            );
          })}
           <li ref={(el) => { navLinksRefs.current[6] = el; }}>
              <NavLink
                to="/campaigns"
                className="nav-btn"
                onClick={() => isMobileMenuOpen && handleBurgerClick()}
              >
                Задонатити
              </NavLink>
          </li>
        </ul>

        {token ? (
          <div className="profile-wrapper">
            <a
              onClick={() => {
                navigate('/profile');
                isMobileMenuOpen && handleBurgerClick();
              }}
              className="profile-btn"
              aria-label="Перейти до профілю"
            >
              {profile?.avatarUrl ? (
                <img
                  src={getAvatarSrc(profile.avatarUrl)}
                  alt="Avatar"
                  className="navbar-avatar"
                />
              ) : (
                <UserCircle size={36} className="text-white cursor-pointer" />
              )}
            </a>
          </div>
        ) : (
          <a
            onClick={() => {
              navigate('/login');
              isMobileMenuOpen && handleBurgerClick();
            }}
            className="login-btn primary-btn"
          >
            Увійти
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
