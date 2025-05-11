import React from 'react';

const Header: React.FC = () => {
  return (
    <header role="banner">
      <div className="container">
        <div className="title">
          <h1>Інклюзивний догляд за дітьми з особливими потребами</h1>
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
        <div className="sub-title">
          <p>230 дітей під нашою опікою</p>
          <div></div>
          <p>58 зібраних пожертв</p>
        </div>
      </div>
    </header>
  );
};

export default Header;