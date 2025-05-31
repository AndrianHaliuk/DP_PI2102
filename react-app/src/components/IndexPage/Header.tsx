import React from 'react';

const Header: React.FC = () => {
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
            <h1>Ми допомагаємо, тим хто цього потребує </h1>
            <div className="title-buttons">
              <a className="sec-btn" href="/what-we-do">Що ми робимо</a>
              <div>
                <svg className="playicon">
                  <use xlinkHref="/img/sprite.svg#Play icon"></use>
                </svg>
                <a className="video-btn" href="https://www.youtube.com/watch?v=rkRyetRMrjQ">Переглянути відео</a>
              </div>
            </div>
          </div>
        </div>
        <div className="sub-title">
          <p>230 донатів</p>
          <div></div>
          <p>58 завершених зборів</p>
        </div>
      </div>
    </header>
  );
};

export default Header;