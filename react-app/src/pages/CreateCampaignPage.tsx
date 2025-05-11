// src/pages/CreateCampaignPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import Footer from '../components/Footer';


const CreateCampaignPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) errs.title = 'Назва обов’язкова.';
    else if (title.length < 5) errs.title = 'Назва має бути не менше 5 символів.';

    if (!description.trim()) errs.description = 'Опис обов’язковий.';
    else if (description.length < 10) errs.description = 'Опис має бути не менше 10 символів.';

    if (goalAmount <= 0) errs.goalAmount = 'Цільова сума має бути більше 0.';
    if (priority < 0) errs.priority = 'Пріоритет не може бути від’ємним.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('goalAmount', goalAmount.toString());
    formData.append('priority', priority.toString());
    if (imageFile) {
      formData.append('image', imageFile);
    }

    await client.post('/campaigns', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    navigate('/campaigns');
  };

  return (
    <>
  <main className="create-campaign-page">
      <form onSubmit={submit} className="create-campaign-form">
        <h1>Створити нову кампанію</h1>

        <label>
          Назва кампанії
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Наприклад, Збір на авто для ЗСУ"
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </label>

        <label>
          Опис кампанії
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Опишіть, чому це важливо"
          />
          {errors.description && <p className="error-text">{errors.description}</p>}
        </label>

        <label>
          Зображення (jpg, png)
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files?.[0] || null)}
          />
        </label>

        <label>
          Цільова сума (грн)
          <input
            type="number"
            value={goalAmount}
            onChange={e => setGoalAmount(+e.target.value)}
          />
          {errors.goalAmount && <p className="error-text">{errors.goalAmount}</p>}
        </label>

        <label>
          Пріоритет (чим менше число — тим вище)
          <input
            type="number"
            value={priority}
            onChange={e => setPriority(+e.target.value)}
          />
          {errors.priority && <p className="error-text">{errors.priority}</p>}
        </label>

        <button type="submit" className="primary-btn full-width">Створити кампанію</button>
      </form>
    </main>
    <Footer />
    </>
  );
};

export default CreateCampaignPage;
