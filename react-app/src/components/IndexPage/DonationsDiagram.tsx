import React from 'react';

const DonationsDiagram: React.FC = () => {
  const data = [
    { color: 'diagram-color1', label: '40% - дитячий будинок' },
    { color: 'diagram-color2', label: '35% - програма чистоти' },
    { color: 'diagram-color3', label: '10% - допомога людям' },
    { color: 'diagram-color4', label: '10% - екскурсії' },
    { color: 'diagram-color5', label: '5% - годування бідних' },
  ];

  return (
    <section className="diagram-section">
      <div className="container">
        <div className="diagram-section-wrapper">
          <h2>Як ми витрачаємо ваші пожертви та куди вони йдуть</h2>
          <p className="diagram-paragraph">
            Ми розуміємо, що коли ви робите пожертву, ви хочете знати, куди йдуть ваші гроші, і ми зобов'язуємося бути прозорими.
          </p>
          <div className="diagram-description">
            {data.map((item, index) => (
              <div className="diagram-description-child" key={index}>
                <div className={`color-container ${item.color}`}></div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ring-chart"></div>
      </div>
    </section>
  );
};

export default DonationsDiagram;