import React from 'react';

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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
            <div className="services-container">
              {[
                { icon: 'building', title: 'Підтримка сімей' },
                { icon: 'hand', title: 'Медичні послуги' },
                { icon: 'wave', title: 'Стипендії' },
                { icon: 'dog', title: 'Терапія' }
              ].map((service, index) => (
                <div className="services" key={index}>
                  <div className="ser-icon">
                    <svg className="icon">
                      <use xlinkHref={`/img/sprite.svg#${service.icon}`}></use>
                    </svg>
                  </div>
                  <div className="ser-text">
                    <h3>{service.title}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
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