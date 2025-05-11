import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const inputClass = 'auth-input';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/campaigns');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <main className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Вхід</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputClass}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={inputClass}
            required
          />
          <button type="submit" className="primary-btn login">
            Увійти
          </button>
          <p className="auth-link">
            Немає акаунту?{' '}
            <button type="button" onClick={() => navigate('/register')}>
              Зареєструватися
            </button>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
};

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate('/campaigns');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar onFeedbackClick={() => {}} />
      <main className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Реєстрація</h2>
          <input
            type="text"
            placeholder="Ім’я"
            value={name}
            onChange={e => setName(e.target.value)}
            className={inputClass}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={inputClass}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={inputClass}
            required
          />
          <button type="submit" className="primary-btn register">
            Зареєструватись
          </button>
          <p className="auth-link">
            Вже є акаунт?{' '}
            <button type="button" onClick={() => navigate('/login')}>
              Увійти
            </button>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
};
