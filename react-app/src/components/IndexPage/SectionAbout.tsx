const SectionAbout = () => {
  return (
    <section className="container">
      <div className="section-container about-us-wrapper">
        <div className="section-title">
          <div className="line-container">
            <div className="line"></div>
            <span>дізнайтеся про нас</span>
          </div>
          <h2>Ми допомагаємо тим, хто потребує підтримки</h2>
          <p>
            Наша організація займається благодійністю, що охоплює різні сфери життя — від індивідуальної допомоги до підтримки цілих громад. Ми віримо, що добрі справи мають силу змінювати світ. Спільно з волонтерами, партнерами та донорами ми реалізуємо прозорі й ефективні ініціативи, що дійсно приносять результат.
          </p>
          <a href="/about-us" className="primary-btn">Дізнатися більше</a>
        </div>
        <div className="video-container">
          <a href="https://youtu.be/CiFoHm7HD94" target="_blank" className="video-facade">
            <img
              src="https://img.youtube.com/vi/CiFoHm7HD94/hqdefault.jpg"
              alt="Відео про нас"
              className="video-thumbnail"
              loading="lazy"
            />
            <svg className="playicon-video">
              <use xlinkHref="/img/sprite.svg#Play icon" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
  
export default SectionAbout;
