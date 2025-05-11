import React from 'react';

const MissionVision: React.FC = () => (
  <section className="about-us-second-section">
    <div className="container">
      <div className="about-us-big-video">
        <a
          href="https://www.youtube.com/watch?v=rkRyetRMrjQ"
          target="_blank"
          rel="noopener noreferrer"
          className="video-facade"
        >
          <img
            src="https://img.youtube.com/vi/rkRyetRMrjQ/hqdefault.jpg"
            alt="About Us Video"
            className="video-thumbnail"
            loading="lazy"
          />
          <svg className="playicon-video">
            <use xlinkHref="img/sprite.svg#Play icon" />
          </svg>
        </a>
      </div>
      <div className="about-us-sec-section-textbloks">
        <div className="about-us-sec-section-textblok">
          <p className="textblok-title">Наша місія</p>
          <h3>
            Ми забезпечуємо інклюзивний догляд для дітей з особливими потребами
          </h3>
          <p className="about-us-sub-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
          </p>
        </div>
        <div className="about-us-sec-section-textblok">
          <p className="textblok-title">Наша візія</p>
          <h3>
            Забезпечити більше інклюзивного догляду для дітей по всьому світу
          </h3>
          <p className="about-us-sub-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
          </p>
        </div>
      </div>
      <div className="supporters">
        <h3>Наші підтримувачі</h3>
        <div className="sup-line" />
      </div>
      <div className="sup-logo">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <svg key={id} className="logoicon">
            <use xlinkHref={`img/logosprite.svg#Logo${id > 1 ? `-${id - 1}` : ''}`} />
          </svg>
        ))}
      </div>
    </div>
  </section>
);

export default MissionVision;
