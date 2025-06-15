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
            Ми підтримуємо найуразливіші групи: дітей, літніх людей та поранених захисників
          </h3>
          <p className="about-us-sub-text">
            Ми прагнемо створити умови, де кожна людина в скруті отримає своєчасну допомогу — гуманітарну, медичну чи емоційну. Наша діяльність охоплює збір коштів, забезпечення обладнанням, логістичну підтримку та тісну співпрацю з волонтерами й лікарнями.
          </p>
        </div>
        <div className="about-us-sec-section-textblok">
          <p className="textblok-title">Наша візія</p>
          <h3>
            Створити мережу швидкої підтримки, яка охоплює всю Україну
          </h3>
          <p className="about-us-sub-text">
            Ми віримо у силу об’єднання та прозорої благодійності. Наша ціль — щоб у кожному місті та селі була можливість оперативно реагувати на потреби, не залежно від того, чи це евакуація, закупівля ліків, чи допомога постраждалим під час воєнних подій.
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
