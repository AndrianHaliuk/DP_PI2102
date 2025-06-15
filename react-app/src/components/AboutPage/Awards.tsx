import React from 'react';

interface Award {
  year: string;
  name: string;
  geo: string;
  iconId: string;
}

const awardsData: Award[] = [
  { year: '2023', name: 'Відзнака за прозорість у благодійності', geo: 'Київ, Україна', iconId: 'Award badge-3' },
  { year: '2022', name: 'Премія "Сила Спільноти"', geo: 'Львів, Україна', iconId: 'Award badge' },
  { year: '2021', name: 'Найкраща волонтерська ініціатива року', geo: 'Дніпро, Україна', iconId: 'Award badge-1' },
  { year: '2020', name: 'Відзнака за підтримку медичних закладів', geo: 'Харків, Україна', iconId: 'Award badge-2' },
];

const Awards: React.FC = () => (
  <section className="awards-section">
    <div className="container">
      <h2>Нагороди та визнання</h2>
      <div className="awards">
        {awardsData.map(({ year, name, geo, iconId }) => (
          <div key={year} className="award">
            <svg className="gradeicon">
              <use xlinkHref={`img/gradesprite.svg#${iconId}`} />
            </svg>
            <p className="award-year">{year}</p>
            <p className="award-name">{name}</p>
            <p className="award-geo">{geo}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Awards;