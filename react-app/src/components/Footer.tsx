import React, { useState } from 'react';
import client from '../api/client';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    try {
      await client.post('/newsletter/subscribe', { email });
      setSuccess(true);
      setEmail('');
    } catch (err: any) {
      console.error(err);
      setError('Не вдалося підписатися. Спробуйте пізніше.');
    }
  };

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
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="sec-btn">Підписатися</button>
        </form>
        {success && <p style={{ color: 'green' }}>Дякуємо за підписку!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
    </footer>
  );
};

export default Footer;
