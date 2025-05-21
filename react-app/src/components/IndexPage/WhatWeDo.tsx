import React from 'react';

const services = [
  {
    icon: 'building',
    title: 'Підтримка сімей',
    description: 'Консультації, групи підтримки та матеріальна допомога для родин, що виховують дітей з інвалідністю.',
  },
  {
    icon: 'hand',
    title: 'Медичні послуги',
    description: 'Ми допомагаємо з доступом до реабілітаційних програм, обстежень і фахової медичної підтримки.',
  },
  {
    icon: 'wave',
    title: 'Стипендії',
    description: 'Фінансова підтримка для навчання та розвитку талановитих дітей з особливими потребами.',
  },
  {
    icon: 'dog',
    title: 'Терапія',
    description: 'Заняття з арт-, музико- та анімалотерапії для покращення емоційного стану та соціалізації.',
  },
];

const WhatWeDo: React.FC = () => {
  return (
    <section className="what-we-do-section">
      <div className="container">
        <div className="section-container">
          <div className="section-title">
            <div className="line-container">
              <div className="line"></div>
              <span>що ми робимо</span>
            </div>
            <h2>Послуги, які ми надаємо нашим дітям</h2>
            <p>
              Ми прагнемо створити повноцінне середовище підтримки для дітей з особливими потребами, їхніх родин та громади. Ось основні напрямки нашої діяльності:
            </p>
            <div className="services-container">
              {services.map((service, index) => (
                <div className="services" key={index}>
                  <div className="ser-icon">
                    <svg className="icon">
                      <use xlinkHref={`/img/sprite.svg#${service.icon}`}></use>
                    </svg>
                  </div>
                  <div className="ser-text">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img src="/img/kid.webp" alt="дитина" className="kid" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
