import React, { FormEvent, useState, useEffect } from 'react';
import client from '../../api/client';
import '../../assets/styles/_feedback.scss';

interface Feedback {
  id: number;
  subject: string;
  message: string;
  createdAt: string;
  user: {
    name: string;
    profile: {
      avatarUrl: string | null;
    } | null;
  } | null;
}

const ContactForm: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const { data } = await client.get<Feedback[]>('/feedback');
        setFeedbacks(data);
      } catch (error) {
        console.error('Не вдалося завантажити відгуки', error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      alert('Будь ласка, заповніть тему та повідомлення');
      return;
    }

    try {
      const { data: newFeedback } = await client.post<Feedback>('/feedback', {
        subject,
        message,
      });
      setFeedbacks(prev => [newFeedback, ...prev]);
      setSubject('');
      setMessage('');
      alert('Повідомлення надіслано!');
    } catch (error) {
      console.error('Помилка надсилання повідомлення', error);
      alert('Не вдалося надіслати повідомлення');
    }
  };

  return (
    <section>
      <div className="container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Тема</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Повідомлення</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Напишіть ваше повідомлення"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="button-wrapper">
            <button type="submit" className="primary-btn">
              Надіслати повідомлення
            </button>
          </div>
        </form>

        <div className="feedback-list">
          <h3>Відгуки</h3>
          {feedbacks.length === 0 ? (
            <p>Поки що немає відгуків.</p>
          ) : (
            feedbacks.map(fb => (
              <div key={fb.id} className="feedback-card">
                <div className="avatar-wrapper">
                  {fb.user?.profile?.avatarUrl ? (
                    <img
                      src={fb.user.profile.avatarUrl}
                      alt={fb.user.name}
                      className="avatar-img"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {fb.user?.name?.[0] ?? 'U'}
                    </div>
                  )}
                </div>
                <div className="feedback-content">
                  <div className="feedback-meta">
                    <span className="feedback-author">
                      {fb.user?.name ?? 'Анонім'}
                    </span>
                    <span className="feedback-date">
                      {new Date(fb.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h4 className="feedback-subject">{fb.subject}</h4>
                  <p className="feedback-message">{fb.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
