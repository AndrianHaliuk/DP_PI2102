import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { useProfile, useUpdateProfile, useMyDonations, useDonationSummary } from '../hooks/useProfile';
import Footer from '../components/Footer';
import DonationTable from '../components/DonationTable';
import '../assets/styles/_profile-page.scss';
import client from '../api/client';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  bio: yup.string().max(200, 'Максимум 200 символів'),
  address: yup.string().max(100, 'Максимум 100 символів'),
  phone: yup.string().nullable().required('Введіть номер телефону'),
});

const ProfilePage: React.FC = () => {
  const { logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: donations = [], isLoading: loadingDonations } = useMyDonations();
  const { data: total = 0 } = useDonationSummary();
  const updateMutation = useUpdateProfile();

  const [editMode, setEditMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { bio: '', phone: '', address: '' }
  });

  useEffect(() => {
    if (profile) {
      reset({
        bio: profile.bio || '',
        phone: profile.phone || '',
        address: profile.address || '',
      });
      setAvatarUrl(profile.avatarUrl || '');
    }
  }, [profile, reset]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await client.post('/upload/avatar', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAvatarUrl(res.data.url);
    } catch (error) {
      console.error('Помилка завантаження аватару:', error);
    }
  };

  const onSubmit = (data: any) => {
    updateMutation.mutate({ ...data, avatarUrl }, { onSuccess: () => setEditMode(false) });
  };

  if (loadingProfile) return <div className="profile--loading">Завантаження…</div>;
  if (!profile) return <div className="profile--loading">Профіль не знайдено.</div>;

  return (
    <>
      <main className="profile">
        <section className="profile__header">
          <div className="profile__avatar">
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" />
              : <div className="avatar--placeholder">?</div>
            }
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{profile.user.name || 'User'}</h1>
            <p className="profile__total">Загальна сума донатів: <span>{total.toLocaleString()} ₴</span></p>
            <div className="profile__details">
              <p><strong>Про себе:</strong> {profile.bio || 'Немає інформації'}</p>
              <p><strong>Телефон:</strong> {profile.phone || '-'}</p>
              <p><strong>Адреса:</strong> {profile.address || '-'}</p>
              <p>ID: {profile.userId}</p>
            </div>
          </div>
          <div className="profile__actions">
            <button className="primary-btn" onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Скасувати' : 'Редагувати'}
            </button>
            {isAdmin && (
              <button className="primary-btn" onClick={() => navigate('/campaigns/create')}>
                Створити кампанію
              </button>
            )}
            <button className="nav-btn" onClick={logout}>Вийти</button>
          </div>
        </section>

        {editMode && (
          <section className="profile__edit">
            <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
              <label>
                Про себе
                <input type="text" {...register('bio')} maxLength={200} />
                {errors.bio && <span className="error">{errors.bio.message}</span>}
              </label>
              <label>
                Телефон
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      defaultCountry="UA"
                      placeholder="Введіть номер телефону"
                    />
                  )}
                />
                {errors.phone && <span className="error">{errors.phone.message}</span>}
              </label>
              <label>
                Адреса
                <input type="text" {...register('address')} maxLength={100} />
                {errors.address && <span className="error">{errors.address.message}</span>}
              </label>
              <label>
                Аватар
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </label>
              <button className="nav-btn" type="submit">Зберегти</button>
            </form>
          </section>
        )}

        <section className="profile__donations">
          <h2>Мої донати</h2>
          {loadingDonations
            ? <div>Завантаження донатів…</div>
            : <DonationTable donations={donations} />
          }
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
