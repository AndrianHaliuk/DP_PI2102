const SectionAbout = () => {
  return (
    <section className="container">
      <div className="section-container">
        <div className="section-title">
          <div className="line-container">
            <div className="line"></div>
            <span>дізнайтеся про нас</span>
          </div>
          <h2>Ми надаємо місце для дітей з особливими потребами</h2>
          <p>
            Наша організація створює безпечне та підтримуюче середовище, де діти з інвалідністю можуть навчатися, грати, розвиватися та інтегруватися в суспільство. Ми співпрацюємо з сім’ями, фахівцями та волонтерами, щоб змінити життя дітей на краще.
          </p>
          <a className="primary-btn">Дізнатися більше</a>
        </div>
        <div className="video-container">
          <a href="https://www.youtube.com/watch?v=rkRyetRMrjQ" target="_blank" className="video-facade">
            <img
              src="https://img.youtube.com/vi/rkRyetRMrjQ/hqdefault.jpg"
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