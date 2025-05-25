import React, { useEffect, useRef, useState } from 'react';
import client from '../api/client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ANIMATION_DURATION = 300;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      const timeout = setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await client.post('/feedback', { subject, message });
      setSubject('');
      setMessage('');
      onClose();
    } catch (error) {
      alert('Помилка надсилання повідомлення');
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`modal ${isOpen ? 'open' : 'closing'}`}
      style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
    >
      <div className="modal-content" ref={modalRef}>
        <div className="close-container" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M1 1L13 13" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
        <h2>Залиште свій відгук</h2>
        <p>Напишіть нам будь-яке повідомлення або питання, ми раді допомогти!</p>
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
              placeholder="Введіть ваше повідомлення тут..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="button-wrapper">
            <button type="submit" className="primary-btn">Надіслати повідомлення</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
