import React from 'react';

const DonationsDiagram: React.FC = () => {
  const data = [
    { color: 'diagram-color1', label: 'Закупівля медикаментів та медичного обладнання — для лікарень, військових шпиталів або потребуючих громадян.' },
    { color: 'diagram-color2', label: 'Підтримка дітей-сиріт та інтернатів — забезпечення одягом, шкільним приладдям, іграшками, проведення дозвілля.' },
    { color: 'diagram-color3', label: 'Допомога внутрішньо переміщеним особам (ВПО) — оренда житла, продукти, гігієна, базові побутові потреби.' },
    { color: 'diagram-color4', label: 'Фінансування реабілітаційних програм для військових та постраждалих — психологічна підтримка, протези, лікування.' },
    { color: 'diagram-color5', label: 'Освітні та культурні ініціативи — безкоштовні курси, табори, майстер-класи для дітей та молоді з уразливих груп.' },
  ];

  return (
    <section className="diagram-section">
      <div className="container">
        <div className="diagram-section-wrapper">
          <h2>Як ми витрачаємо ваші пожертви та куди вони йдуть</h2>
          <p className="diagram-paragraph">
            Ми глибоко усвідомлюємо, що кожна пожертва є виявом довіри, тому кожен донор має право знати, як саме використовуються надані кошти. 
          </p>
          <p className="diagram-paragraph">
            Наша організація зобов’язується дотримуватися принципів прозорості та відкритості, забезпечуючи чіткий облік надходжень і звітність щодо напрямків їх використання.
          </p>
        </div>
          <div className="diagram-description">
            {data.map((item, index) => (
              <div className="diagram-description-child" key={index}>
                <div className={`color-container ${item.color}`}></div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default DonationsDiagram;