import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer role="contentinfo">
      <div className="container">
        <a href="/">
          <img src={'/img/logo-white.webp'} alt="Логотип" className="logo" loading="lazy" />
        </a>

        <div className="footer-lists">
          <div>
            <p>Головна</p>
            <ul>
              <li><a href="/about-us">Про нас</a></li>
              <li><a href="/media">Команда</a></li>
              <li><a href="/what-we-do">Що ми робимо</a></li>
              <li><a href="/contact">Більше</a></li>
            </ul>
          </div>

          <div>
            <p>Більше</p>
            <ul>
              <li><a href="/projects">Проєкти</a></li>
              <li><a href="/events">Події</a></li>
              <li><a href="/donate">Пожертвувати</a></li>
              <li><a href="/blog">Блог</a></li>
            </ul>
          </div>

          <div>
            <p>Зв'язатися</p>
            <ul>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="subscribe">
          <h2>Підпишіться, щоб отримувати останні оновлення</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Ваш email" id="email" required />
            <button type="submit" className="sec-btn">Підписатися</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
