import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';
import Footer from '../components/Footer';
import '../assets/styles/_create-campaign-page.scss';

const EditCampaignPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState(0);
  const [priority, setPriority] = useState(3);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await client.get(`/campaigns/${id}`);
        const campaign = res.data;
        setTitle(campaign.title);
        setDescription(campaign.description);
        setGoalAmount(campaign.goalAmount);
        setPriority(campaign.priority);
        setImageUrl(campaign.imageUrl || '');
      } catch (err) {
        console.error('Не вдалося завантажити кампанію:', err);
        alert('Помилка при завантаженні кампанії');
        navigate('/campaigns');
      }
    };

    fetchCampaign();
  }, [id, navigate]);

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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  if (!id) {
    alert('Некоректний id кампанії');
    return;
  }

  if (isNaN(goalAmount) || goalAmount <= 0) {
    alert('Цільова сума має бути числом більше 0');
    return;
  }

  try {
    await client.put(`/campaigns/${Number(id)}`, {
      title,
      description,
      goalAmount,
      priority,
      imageUrl,
    });
    navigate('/campaigns');
  } catch (err) {
    console.error('Помилка оновлення кампанії:', err);
    alert('Помилка при оновленні кампанії');
  }
};

  return (
    <>
      <main className="create-campaign-page">
        <form onSubmit={handleSubmit} className="campaign-form">
          <h1 className="campaign-form__title">Редагувати кампанію</h1>

          <div className="campaign-form__group">
            <label className="campaign-form__label">Назва кампанії</label>
            <input
              className="campaign-form__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="campaign-form__error">{errors.title}</p>}
          </div>

          <div className="campaign-form__group">
            <label className="campaign-form__label">Опис кампанії</label>
            <textarea
              className="campaign-form__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="campaign-form__error">{errors.description}</p>}
          </div>

          <div className="campaign-form__group">
            <label className="campaign-form__label">Зображення</label>
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
                onChange={(e) => setGoalAmount(+e.target.value)}
              />
              {errors.goalAmount && <p className="campaign-form__error">{errors.goalAmount}</p>}
            </div>

            <div className="campaign-form__group campaign-form__half">
              <label className="campaign-form__label">Пріоритет</label>
              <select
                className="campaign-form__input"
                value={priority}
                onChange={(e) => setPriority(+e.target.value)}
              >
                <option value={1}>Терміновий збір</option>
                <option value={2}>Високий пріоритет</option>
                <option value={3}>Звичайний пріоритет</option>
              </select>
              {errors.priority && <p className="campaign-form__error">{errors.priority}</p>}
            </div>
          </div>

          <button type="submit" className="btn-width primary-btn" disabled={uploading}>
            Зберегти зміни
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default EditCampaignPage;
