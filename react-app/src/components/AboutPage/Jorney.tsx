import React from 'react';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '12М+', label: 'Зібрано гривень' },
  { value: '400+', label: 'Залучено волонтерів' },
  { value: '20+', label: 'Підтриманих закладів' },
];

const Journey: React.FC = () => (
  <section className="jorney-section">
    <div className="container">
      <div className="jorney-wrapper">
        <p className="jorney-sub-title">наш шлях</p>
        <h2>Як ми зібрали 12М</h2>
        <p className="about-us-sub-text">
          За роки діяльності ми об’єднали сотні небайдужих людей, провели десятки кампаній і надали
          допомогу тисячам українців. Наш шлях — це про довіру, прозорість і щоденну роботу задля тих, хто потребує підтримки найбільше.
        </p>
        <div className="jorney-stats">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="title-stat">{value}</p>
              <p className="sub-title-stat">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <img className="jorney-image" src="img/peoples.webp" alt="наш колектив" />
    </div>
  </section>
);

export default Journey;
