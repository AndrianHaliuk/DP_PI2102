import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import Footer from '../components/Footer';
import '../assets/styles/_create-campaign-page.scss';

const CreateCampaignPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [priority, setPriority] = useState<number>(3);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) errs.title = 'Назва обов’язкова.';
    else if (title.length < 5) errs.title = 'Має бути ≥5 символів.';
    if (!description.trim()) errs.description = 'Опис обов’язковий.';
    else if (description.length < 10) errs.description = '≥10 символів.';
    if (goalAmount <= 0) errs.goalAmount = 'Потрібно більше 0.';
    if (![1, 2, 3].includes(priority)) errs.priority = 'Виберіть пріоритет.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await client.post('/upload/campaign-image', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrl(res.data.url);
    } catch (err) {
      console.error('Помилка завантаження картинки:', err);
      alert('Не вдалося завантажити зображення');
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await client.post('/campaigns', {
        title,
        description,
        goalAmount,
        priority,
        imageUrl, 
      });
      navigate('/campaigns');
    } catch (err) {
      console.error('Помилка створення кампанії:', err);
      alert('Помилка при створенні кампанії');
    }
  };

  return (
    <>
      <main className="create-campaign-page">
        <form onSubmit={submit} className="campaign-form">
          <h1 className="campaign-form__title">Створити нову кампанію</h1>

          <div className="campaign-form__group">
            <label className="campaign-form__label">Назва кампанії</label>
            <input
              className="campaign-form__input"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Збір на..."
            />
            {errors.title && <p className="campaign-form__error">{errors.title}</p>}
          </div>

          <div className="campaign-form__group">
            <label className="campaign-form__label">Опис кампанії</label>
            <textarea
              className="campaign-form__textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Опишіть, чому це важливо"
            />
            {errors.description && <p className="campaign-form__error">{errors.description}</p>}
          </div>

          <div className="campaign-form__group">
            <label className="campaign-form__label">Зображення (jpg, png)</label>
            <input
              className="campaign-form__input-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading && <p>Завантаження картинки...</p>}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Попередній перегляд"
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            )}
          </div>

          <div className="campaign-form__row">
            <div className="campaign-form__group campaign-form__half">
              <label className="campaign-form__label">Цільова сума (грн)</label>
              <input
                className="campaign-form__input"
                type="number"
                value={goalAmount}
                onChange={e => setGoalAmount(+e.target.value)}
                placeholder="10000"
              />
              {errors.goalAmount && <p className="campaign-form__error">{errors.goalAmount}</p>}
            </div>

            <div className="campaign-form__group campaign-form__half">
              <label className="campaign-form__label">Пріоритет</label>
              <select
                className="campaign-form__input"
                value={priority}
                onChange={e => setPriority(+e.target.value)}
              >
                <option value={1}>Терміновий збір</option>
                <option value={2}>Високий пріоритет</option>
                <option value={3}>Звичайний пріоритет</option>
              </select>
              {errors.priority && <p className="campaign-form__error">{errors.priority}</p>}
            </div>
          </div>

          <button type="submit" className="btn-width primary-btn" disabled={uploading}>
            Створити кампанію
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CreateCampaignPage;
