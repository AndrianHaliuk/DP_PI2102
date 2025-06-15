const Hero = () => {
  return (
    <section className="what-we-do-first-section about-us-first-section">
      <div className="container">
        <div className="line-container">
          <div className="line"></div>
          <span>Що ми робимо</span>
        </div>
        <div className="what-we-do-title">
          <div>
            <h1>Ми працюємо по всій Україні</h1>
            <p>
              Надаємо допомогу тим, хто цього потребує: збираємо кошти на лікування, гуманітарну підтримку,
              реабілітацію ветеранів, розвиток освітніх та соціальних ініціатив. Наші проєкти охоплюють міста й села
              по всій країні.
            </p>
          </div>
          <img src="/img/header-back.webp" alt="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
