import React, { useState, useEffect, ChangeEvent } from 'react';
import { UpdateUserProfileDto } from '../types';
import { useProfile, useUpdateProfile, useMyDonations, useDonationSummary } from '../hooks/useProfile';
import Footer from '../components/Footer';

const ProfilePage: React.FC = () => {
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: donations, isLoading: loadingDonations } = useMyDonations();
  const { data: total = 0 } = useDonationSummary();
  const updateMutation = useUpdateProfile();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<UpdateUserProfileDto>({ bio: '', avatarUrl: '', phone: '', address: '' });
  const [, setAvatarFile] = useState<File | null>(null);

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

  if (loadingProfile) return <div className="text-center mt-5">Завантаження профілю…</div>;
  if (!profile) return <div className="text-center mt-5">Профіль не знайдено.</div>;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setForm(prev => ({ ...prev, avatarUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    updateMutation.mutate(form, { onSuccess: () => setEditMode(false) });
  };

  return (
    <>
      <main className="profile-container">
        <h1>Мій профіль</h1>

        <div className="profile-header">
          {form.avatarUrl && <img src={form.avatarUrl} alt="Avatar" className="avatar" />}
          <div>
            <p><strong>User ID:</strong> {profile.userId}</p>
            <p><strong>Загалом пожертвовано:</strong> {total} грн</p>
          </div>
        </div>

        {editMode ? (
          <div className="profile-edit-form">
            <label>
              Про себе
              <input type="text" value={form.bio} onChange={e => setForm(prev => ({ ...prev, bio: e.target.value }))} />
            </label>
            <label>
              Телефон
              <input type="text" value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} />
            </label>
            <label>
              Адреса
              <input type="text" value={form.address} onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))} />
            </label>
            <label>
              Аватар
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
            <div className="button-group">
              <button onClick={handleSave}>Зберегти</button>
              <button onClick={() => setEditMode(false)}>Скасувати</button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <p><strong>Про себе:</strong> {profile.bio || 'Немає інформації'}</p>
            <p><strong>Телефон:</strong> {profile.phone || '-'}</p>
            <p><strong>Адреса:</strong> {profile.address || '-'}</p>
            <button className='primary-btn' onClick={() => setEditMode(true)}>Редагувати профіль</button>
          </div>
        )}

        <section className="donations">
          <h2>Мої пожертви</h2>
          {loadingDonations ? (
            <div>Завантаження донатів…</div>
          ) : donations && donations.length ? (
            <ul>
              {donations.map(d => (
                <li key={d.id}>
                  <span>{d.campaign.title}</span>
                  <span><b>{d.amount} грн</b></span>
                  <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Ще немає донейтів</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;