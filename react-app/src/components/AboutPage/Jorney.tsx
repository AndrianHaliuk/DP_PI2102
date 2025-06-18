import React, { useState, useEffect } from 'react';
import client from '../../api/client';

interface StatsData {
  donationsCount: number;
  completedCollections: number;
  totalAmount: number;
}

export const Journey: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get<StatsData>('/statistics')
      .then(res => setStats(res.data))
      .catch(err => {
        console.error('Failed to load stats:', err);
      })
      .finally(() => setLoading(false));
  }, []);


  const displayValue = (value: number, suffix = '') =>
    loading ? '...' : `${value.toLocaleString('uk-UA')}${suffix}`;

  return (
    <section className="jorney-section">
      <div className="container">
        <div className="jorney-wrapper">
          <p className="jorney-sub-title">наш шлях</p>
          <h2>
            {loading
              ? 'Завантаження…'
              : `Як ми зібрали ${(stats!.totalAmount / 1_000).toFixed(1)} тисяч`}
          </h2>
          <p className="about-us-sub-text">
            За роки діяльності ми об’єднали сотні небайдужих людей, провели десятки кампаній і надали
            допомогу тисячам українців. Наш шлях — це про довіру, прозорість і щоденну роботу задля тих, хто потребує підтримки найбільше.
          </p>
          <div className="jorney-stats">
            <div>
              <p className="title-stat">
                {stats
                  ? `${stats.totalAmount.toLocaleString('uk-UA')} грн`
                  : displayValue(0, ' грн')}
              </p>
              <p className="sub-title-stat">Зібрано гривень</p>
            </div>
            <div>
              <p className="title-stat">
                {displayValue(stats?.donationsCount ?? 0)}
              </p>
              <p className="sub-title-stat">Кількість донатів</p>
            </div>
            <div>
              <p className="title-stat">
                {displayValue(stats?.completedCollections ?? 0)}
              </p>
              <p className="sub-title-stat">Завершених зборів</p>
            </div>
          </div>
        </div>
        <img className="jorney-image" src="img/peoples.webp" alt="наш колектив" />
      </div>
    </section>
  );
};

export default Journey;
