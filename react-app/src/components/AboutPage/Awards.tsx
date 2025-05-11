import React from 'react';

interface Award {
  year: string;
  name: string;
  geo: string;
  iconId: string;
}

const awardsData: Award[] = [
  { year: '2021', name: 'Нагорода "Найкраща НУО"', geo: 'Берлін, Німеччина', iconId: 'Award badge-3' },
  { year: '2018', name: 'Глобальна нагорода', geo: 'Нью-Йорк, США', iconId: 'Award badge' },
  { year: '2014', name: 'Нагорода CSN', geo: 'Нью-Делі, Індія', iconId: 'Award badge-1' },
  { year: '2010', name: 'Нагорода "НУО року"', geo: 'Відень, Австрія', iconId: 'Award badge-2' },
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