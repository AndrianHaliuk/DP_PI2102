import React from 'react';

const ContactMap: React.FC = () => (
  <iframe
    className="map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5552.990843072146!2d24.727199158921547!3d48.94087752750933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4730c19a4a65e427%3A0xeb6f29186c63340!2z0JLQodCfICLQpNCw0YXQvtCy0LjQuSDQutC-0LvQtdC00LYg0LXQu9C10LrRgtGA0L7QvdC90LjRhSDQv9GA0LjQu9Cw0LTRltCyINCG0KTQndCi0KPQndCTIg!5e0!3m2!1suk!2spl!4v1733674692647!5m2!1suk!2spl"
    width="100%"
    height="450"
    style={{ border: 0 }}
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    title="Наш офіс на мапі"
  />
);

export default ContactMap;