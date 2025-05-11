import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Місія "Посмішка 1тис.: Благодійність назовні"',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
    },
    {
      title: 'Щотижневі екскурсії',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
    },
    {
      title: 'Щомісячна громадська просвіта',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
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