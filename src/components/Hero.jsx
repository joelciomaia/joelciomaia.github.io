import './Hero.css';
import TypingLoop from './TypingLoop';

const Hero = () => {
  return (
    <section className="hero container" id="home">
      <div className="hero-content">
        {/* SEU NOME */}
        <h1 className="hero-title">
          Olá, eu sou <span className="highlight">Joelcio Maia</span>
        </h1>

        {/* SEU CARGO */}

        <TypingLoop className="hero-subtitle" />

        {/* DESCRIÇÃO GENÉRICA (você ajusta depois) */}
        <p className="hero-desc">
          Com formação em <strong>Sistemas de Informação</strong> e experiência em
          <strong> infraestrutura de TI</strong>, busco unir conhecimento técnico,
          docência e desenvolvimento para criar soluções inovadoras.
        </p>

        {/* BOTÕES */}
        <div className="hero-buttons">
          <a href="#timeline" className="btn btn-primary">Minha Jornada</a>
          <a href="#portfolio" className="btn btn-secondary">Meus Projetos</a>
        </div>

        {/* REDES SOCIAIS COM SEUS LINKS */}
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/joelcio-maia-ba7501136/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/joelciomaia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>

        </div>
      </div>

      {/* PLACEHOLDER ANIMADO */}
      <div className="hero-image">
        <div className="image-placeholder">
          <img
            src="/images/emoji-animado3.png"
            alt="Animação"
            className="hero-gif"
          />
        </div>
      </div>


    </section>
  );
};


export default Hero;