import React from 'react';

const services = [
  {
    icon: 'building',
    title: 'Фінансова підтримка',
    description: 'Збираємо кошти для медичних потреб, навчання, житла та термінової допомоги людям у скруті.',
  },
  {
    icon: 'hand',
    title: 'Гуманітарна допомога',
    description: 'Забезпечуємо продукти, одяг, засоби гігієни та інші речі першої необхідності для нужденних.',
  },
  {
    icon: 'wave',
    title: 'Підтримка громадських ініціатив',
    description: 'Допомагаємо реалізовувати волонтерські й соціальні проєкти, що змінюють суспільство на краще.',
  },
  {
    icon: 'dog',
    title: 'Психологічна допомога',
    description: 'Підтримуємо програми з ментального здоров’я та емоційного відновлення для всіх, хто цього потребує.',
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
            <h2>Напрямки нашої благодійної діяльності</h2>
            <p>
              Ми об'єднуємо ресурси, людей і можливості, щоб ефективно відповідати на соціальні виклики. Наша діяльність охоплює різні сфери, де потрібна підтримка, турбота й небайдужість.
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
