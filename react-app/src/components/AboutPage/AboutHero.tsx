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
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
          </p>
          <p className="about-us-sub-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Suspendisse varius enim elementum tristique.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutHero;