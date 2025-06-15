import React from 'react';

const ContactHeaderSection: React.FC = () => (
  <section className="contact-us-first-section">
    <div className="container">
      <div>
        <div className="line-container">
          <div className="line" />
          <span>Зв'яжіться з нами</span>
        </div>
        <div className="contact-us-title">
          <h1>Ми будемо раді вас почути</h1>
          <p>Маєте запитання, пропозиції або бажаєте приєднатися до нашої справи? Зв’яжіться з нами через форму або за вказаними контактами.</p>
        </div>
      </div>
      <div className="contact-section">
        <p className="contact-subtitle">Давайте поспілкуємось!</p>
        <div className="contact-info">
          <p>+38 (0342) 77-88-99</p>
          <p>contact@largerthani.ua</p>
        </div>
        <div className="event-line" />
        <div className="office-info">
          <div className="office">
            <p className="contact-subtitle">Головний офіс</p>
            <p className="contact-subtitle-text">
              вул. Грушевського, 15,<br />76000 Івано-Франківськ, Україна
            </p>
          </div>
          <div className="office">
            <p className="contact-subtitle">Регіональний центр</p>
            <p className="contact-subtitle-text">
              вул. Шевченка, 21А,<br />м. Коломия, Івано-Франківська обл.
            </p>
          </div>
          <div className="social-icons contact-social-icons">
            <a href="#" target="_blank"><i className="fab fa-facebook" /></a>
            <a href="#" target="_blank"><i className="fab fa-twitter" /></a>
            <a href="#" target="_blank"><i className="fab fa-linkedin" /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactHeaderSection;
