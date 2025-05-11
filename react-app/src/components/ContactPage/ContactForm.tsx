import React, { FormEvent, useState } from 'react';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // TODO: відправка даних на сервер
    alert('Повідомлення надіслано!');
    setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  };

  return (
    <section>
      <div className="container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Ім'я</label>
              <input type="text" id="firstName" value={form.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Прізвище</label>
              <input type="text" id="lastName" value={form.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="contact-email" value={form.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Тема</label>
              <input type="text" id="subject" value={form.subject} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Повідомлення</label>
            <textarea id="message" rows={5} placeholder="Напишіть ваше повідомлення" value={form.message} onChange={handleChange} />
          </div>
          <div className="button-wrapper">
            <button type="submit" className="primary-btn">Надіслати повідомлення</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
