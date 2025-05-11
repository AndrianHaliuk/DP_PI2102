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
          <h1>Ми будемо раді почути вас</h1>
          <p>Маєте питання або хочете зробити запит? Будь ласка, зв’яжіться з нами через форму або за наступними контактами.</p>
        </div>
      </div>
      <div className="contact-section">
        <p className="contact-subtitle">Давайте поговоримо!</p>
        <div className="contact-info">
          <p>+234 09012346514</p>
          <p>hello@largerthani.com</p>
        </div>
        <div className="event-line" />
        <div className="office-info">
          <div className="office">
            <p className="contact-subtitle">Головний офіс</p>
            <p className="contact-subtitle-text">
              8 Brewery Drive, Лагос,<br />Нігерія.
            </p>
          </div>
          <div className="office">
            <p className="contact-subtitle">Філія</p>
            <p className="contact-subtitle-text">
              Навпроти Ополо раунд-абаута, Єнага, Байелса, Нігерія.
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
