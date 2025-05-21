import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Місія "Посмішка 1000: Благодійність у дії"',
      description: 'Наш проєкт об’єднує волонтерів і спонсорів, щоб подарувати 1000 дітям з особливими потребами радість через подарунки, розваги та турботу.',
    },
    {
      title: 'Щотижневі освітні екскурсії',
      description: 'Ми організовуємо інтерактивні екскурсії до музеїв, театрів та на природу, що сприяють розвитку та соціалізації дітей з особливими потребами.',
    },
    {
      title: 'Щомісячна громадська просвіта',
      description: 'Ми проводимо відкриті зустрічі для батьків, педагогів і громадськості, щоб розвивати інклюзію та розуміння потреб особливих дітей.',
    }
  ];

  return (
    <section className="container">
      <div className="project-container">
        <div className="line-container">
          <div className="line"></div>
          <span>Проєкти, які ми реалізували</span>
        </div>
        <h2>Ми створюємо місце, де діти з особливими потребами можуть процвітати</h2>
        <div className="projects">
          {projects.map((project, index) => (
            <div className={`project img${index + 1}`} key={index}>
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