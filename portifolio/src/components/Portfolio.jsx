import { portfolioData } from '../data/portfolioData';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="section dark" id="portfolio">
      <div className="container">
        <h2 className="section-title portfolio-main-title">Projetos Recentes</h2>
        <div className="portfolio-container">
          {portfolioData.map(project => (
            <div className="project-card" key={project.id}>
              {/* IMAGEM DO PROJETO */}
              <div className="project-image">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    onError={(e) => {
                      e.target.onerror = null; // Previne loop
                      e.target.src = "/images/projects/default.png"; // Fallback
                    }}
                  />
                ) : (
                  <i className={project.icon}></i> // Fallback para ícone
                )}
              </div>
              
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span className="project-tag" key={index}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;