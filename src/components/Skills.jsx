import { skillsData } from '../data/portfolioData';
import './Skills.css';

const Skills = () => {
  return (
    <section className="section skills-section" id="competencias">
      <div className="container">
        <h2 className="section-title">Competências e Habilidades</h2>
        <div className="skills-container">
          {skillsData.map(skill => (
            <div className="skill-card" key={skill.id}>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <div className="skill-tags">
                {skill.tags.map((tag, index) => (
                  <span className="tag" key={index}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;