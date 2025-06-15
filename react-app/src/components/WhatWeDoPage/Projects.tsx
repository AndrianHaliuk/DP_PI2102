const Projects = () => {
  return (
    <section className="container">
      <div className="project-container-what-we-do project-container">
        <div className="line-container">
          <div className="line"></div>
          <span>Проєкти, які ми реалізували</span>
        </div>
        <h2>Ми втілюємо ініціативи, що змінюють життя людей на краще</h2>
        <div className="projects">
          {[
            {
              title: "Центр підтримки для ветеранів",
              description:
                "Облаштовано простір для психологічної допомоги та соціальної адаптації учасників бойових дій.",
            },
            {
              title: "Мобільні медичні бригади",
              description:
                "Організовано виїзні медичні огляди у віддалених громадах, де відсутній доступ до лікарів.",
            },
            {
              title: "Тимчасове житло для постраждалих від війни",
              description:
                "Збудовано модульні будинки для родин, які втратили домівки внаслідок бойових дій.",
            },
          ].map((project, i) => (
            <div
              className={`project ${i === 1 ? 'img2' : i === 2 ? 'img3' : ''}`}
              key={i}
            >
              <div className="project-wrapper">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="#" className="sec-btn">Дізнатися більше</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
