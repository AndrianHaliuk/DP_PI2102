import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Допомога там, де це потрібно',
      description: 'Ми організовуємо цільові збори для підтримки людей у складних життєвих обставинах: від надання гуманітарної допомоги до фінансування лікування.',
    },
    {
      title: 'Збір на розвиток громад',
      description: 'Підтримуємо освітні, культурні та соціальні ініціативи, що сприяють розвитку локальних громад та покращенню якості життя.',
    },
    {
      title: 'Реакція на надзвичайні ситуації',
      description: 'Швидко реагуємо на кризові події – від стихійних лих до воєн – через збори коштів і організацію допомоги постраждалим.',
    }
  ];

  return (
    <section className="container">
      <div className="project-container">
        <div className="line-container">
          <div className="line"></div>
          <span>Проєкти, які ми реалізували</span>
        </div>
        <h2>Ми створюємо можливості допомагати там, де це справді важливо</h2>
        <div className="projects">
          {projects.map((project, index) => (
            <div className={`project img${index + 1}`} key={index}>
              <div className="project-wrapper">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="/about-us" className="sec-btn">Дізнатися більше</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
