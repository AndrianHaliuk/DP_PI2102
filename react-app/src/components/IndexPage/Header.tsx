import React, { useEffect, useState } from 'react';
import client from '../../api/client'; 

const Header: React.FC = () => {
  const [stats, setStats] = useState<{ donationsCount: number; completedCollections: number } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await client.get('/api/statistics');
        setStats(response.data);
      } catch (error) {
        console.error('Не вдалося завантажити статистику', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <header role="banner">
      <div className="header-img-wrapper">
        <picture>
          <source srcSet="/img/header-back-mobile.webp" media="(max-width: 767px)" />
          <source srcSet="/img/header-back.webp" media="(min-width: 768px)" />
          <img
            src="/img/header-back.webp"
            alt="Hero"
            width="1280"
            height="600"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="container">
        <div className="title-wrapper">
          <div className="title">
            <h1>Ми допомагаємо тим, хто цього потребує</h1>
            <div className="title-buttons">
              <a className="sec-btn" href="/what-we-do">Що ми робимо</a>
              <div>
                <svg className="playicon">
                  <use xlinkHref="/img/sprite.svg#Play icon"></use>
                </svg>
                <a className="video-btn" href="https://youtu.be/erk75UIANe4">Переглянути відео</a>
              </div>
            </div>
          </div>
        </div>
        <div className="sub-title">
          {stats ? (
            <>
              <p>{stats.donationsCount} донатів</p>
              <div></div>
              <p>{stats.completedCollections} завершених зборів</p>
            </>
          ) : (
            <p>Завантаження статистики...</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
