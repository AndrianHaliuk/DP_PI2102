import React from 'react';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '34М+', label: 'Отримано пожертв' },
  { value: '400+', label: 'Волонтерів' },
  { value: '20+', label: 'Будинків догляду' },
];

const Journey: React.FC = () => (
  <section className="jorney-section">
    <div className="container">
      <div className="jorney-wrapper">
        <p className="jorney-sub-title">наш шлях</p>
        <h2>Як ми зібрали 34М</h2>
        <p className="about-us-sub-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
          elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
          commodo diam libero vitae erat. Aenean faucibus nibh.
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
