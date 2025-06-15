const services = [
  {
    icon: 'building',
    title: 'Підтримка сімей',
    description: 'Допомога малозабезпеченим та багатодітним родинам у вигляді продуктів, одягу й тимчасового житла.',
  },
  {
    icon: 'wave',
    title: 'Медична допомога',
    description: 'Забезпечення доступу до ліків, обстежень і реабілітаційних програм у кризових ситуаціях.',
  },
  {
    icon: 'hand',
    title: 'Освіта',
    description: 'Підтримка освітніх програм, навчання дітей та дорослих, забезпечення технікою та підручниками.',
  },
  {
    icon: 'water',
    title: 'Базові зручності',
    description: 'Постачання води, засобів гігієни та побутових речей у зони гуманітарної кризи.',
  },
  {
    icon: 'dog',
    title: 'Психосоціальна підтримка',
    description: 'Проведення терапій та консультацій для постраждалих від травматичних подій.',
  },
  {
    icon: 'plant',
    title: 'Громадська діяльність',
    description: 'Організація заходів, волонтерських ініціатив та проєктів для розвитку громад.',
  },
];

const Services = () => {
  return (
    <section className="what-we-do-second-section">
      <div className="container">
        <h2>Що ми робимо для підтримки суспільства</h2>
        <div className="what-we-do-bloks-container">
          {services.map((s, i) => (
            <div className="services" key={i}>
              <div className="ser-icon">
                <svg className="icon">
                  <use xlinkHref={`/img/sprite.svg#${s.icon}`} />
                </svg>
              </div>
              <div className="ser-text2">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
