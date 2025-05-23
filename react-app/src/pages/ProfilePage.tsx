import React, { useState, useEffect, ChangeEvent } from 'react';
import { useProfile, useUpdateProfile, useMyDonations, useDonationSummary } from '../hooks/useProfile';
import Footer from '../components/Footer';
import DonationTable from '../components/DonationTable';
import '../assets/styles/_profile-page.scss'; 
import client from '../api/client';

const ProfilePage: React.FC = () => {
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: donations = [], isLoading: loadingDonations } = useMyDonations();
  const { data: total = 0 } = useDonationSummary();
  const updateMutation = useUpdateProfile();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ bio: '', avatarUrl: '', phone: '', address: '' });

  useEffect(() => {
    if (profile) {
      setForm({
        bio: profile.bio || '',
        avatarUrl: profile.avatarUrl || '',
        phone: profile.phone || '',
        address: profile.address || ''
      });
    }
  }, [profile]);

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.[0]) return;
  const file = e.target.files[0];
  const data = new FormData();
  data.append('file', file);

  try {
    const res = await client.post('/upload/avatar', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setForm(f => ({ ...f, avatarUrl: res.data.url }));
  } catch (error) {
    console.error('Помилка завантаження аватару:', error);
  }
};

  const handleSave = () => updateMutation.mutate(form, { onSuccess: () => setEditMode(false) });

  if (loadingProfile) return <div className="profile--loading">Завантаження…</div>;
  if (!profile) return <div className="profile--loading">Профіль не знайдено.</div>;

  return (
    <>
      <main className="profile">
        <section className="profile__header">
          <div className="profile__avatar">
            {form.avatarUrl
              ? <img src={form.avatarUrl} alt="avatar" />
              : <div className="avatar--placeholder">?</div>
            }
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{profile.user.name || 'User'}</h1>
            <p className="profile__total">Загалом пожертвовано: <span>{total.toLocaleString()} ₴</span></p>
            <div className="profile__details">
              <p><strong>Про себе:</strong> {profile.bio || 'Немає інформації'}</p>
              <p><strong>Телефон:</strong> {profile.phone || '-'}</p>
              <p><strong>Адреса:</strong> {profile.address || '-'}</p>
              <p>ID: {profile.userId}</p>
          </div>
          </div>
          <button className="primary-btn" onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Скасувати' : 'Редагувати'}
          </button>
           <button className="logout-btn" onClick={handleLogout}>Вийти</button>
        </section>

        {editMode && (
          <section className="profile__edit">
            <div className="form-grid">
              <label>
                Про себе
                <input type="text" value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
              </label>
              <label>
                Телефон
                <input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </label>
              <label>
                Адреса
                <input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
              </label>
              <label>
                Аватар
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
            <button className="nav-btn" onClick={handleSave}>Зберегти</button>
          </section>
        )}

        <section className="profile__donations">
          <h2>Мої пожертви</h2>
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
