import React from 'react';

const AboutHero: React.FC = () => (
  <section className="about-us-first-section">
    <div className="container">
      <div className="line-container">
        <div className="line" />
        <span>Дізнайтесь про нас</span>
      </div>
      <div className="about-us-title">
        <h1>Ми є неурядовою організацією</h1>
        <div>
          <p className="about-us-sub-title">
            Ми об'єднуємо людей заради допомоги тим, хто цього потребує найбільше.
          </p>
          <p className="about-us-sub-text">
            Наша команда організовує благодійні збори для підтримки військових, медичних установ, родин внутрішньо переміщених осіб, дітей та літніх людей. Ми працюємо прозоро, регулярно звітуємо про кожен проєкт і прагнемо зробити допомогу ефективною та своєчасною.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutHero;
