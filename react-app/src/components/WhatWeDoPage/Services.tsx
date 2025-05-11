const services = [
  { icon: 'building', title: 'Підтримка сімей' },
  { icon: 'wave', title: 'Медичні переваги' },
  { icon: 'hand', title: 'Освіта' },
  { icon: 'water', title: 'Базові зручності' },
  { icon: 'dog', title: 'Терапія' },
  { icon: 'plant', title: 'Громадська діяльність' },
];

const Services = () => {
  return (
    <section className="what-we-do-second-section">
      <div className="container">
        <h2>Що ми робимо для дітей з особливими потребами</h2>
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
                <p>Lorem ipsum dolor sit amet...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;