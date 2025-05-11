const Projects = () => {
    return (
      <section className="container">
        <div className="project-container-what-we-do project-container">
          <div className="line-container">
            <div className="line"></div>
            <span>Проєкти, які ми реалізували</span>
          </div>
          <h2>Ми створюємо місце, де діти з особливими потребами можуть розквітати</h2>
          <div className="projects">
            {[1, 2, 3].map((_, i) => (
              <div className={`project ${i === 1 ? 'img2' : i === 2 ? 'img3' : ''}`} key={i}>
                <div className="project-wrapper">
                  <h3>Назва проєкту</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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