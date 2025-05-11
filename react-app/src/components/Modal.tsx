import React, { useEffect, useRef, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ANIMATION_DURATION = 300; // мілісекунди, має співпадати з CSS

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  // Керуємо присутністю модалки в DOM
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

  // Закриття по кліку поза модалкою
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

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
        <h2>Долучіться як волонтер</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first-name">Ім'я</label>
                <input type="text" id="first-name" />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Прізвище</label>
                <input type="text" id="last-name" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Електронна пошта</label>
              <input type="email" id="contact-email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Повідомлення</label>
              <textarea id="message" rows={5} />
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
