// src/components/MediaPage/MediaSection.tsx
import React from 'react';
import { useNews, NewsItem } from '../../hooks/useNews';

const MediaSection: React.FC = () => {
  const { news, loading, error } = useNews();

  return (
    <section className="media-first-section">
      <div className="container">
        {/* Заголовок */}
        <div className="media-title">
          <div className="line-container">
            <div className="line" />
            <span>Головні новини</span>
          </div>
          <h1>Наша мета - забезпечити інклюзивний догляд для дітей з особливими потребами</h1>
          <p>
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
          </p>
          <a href="#" className="primary-btn">Читати більше</a>
        </div>

        {loading && <p>Завантаження новин...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div id="news-container" className="news-container">
          {news.map((item: NewsItem, idx: number) => (
            <div key={idx} className="news">
              <img src={item.image} alt={item.title} />
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <p className="news-date">{item.date}</p>
                <p className="news-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
