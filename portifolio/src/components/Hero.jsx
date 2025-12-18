import './Hero.css';

const Hero = () => {
  return (
    <section className="hero container" id="home">
      <div className="hero-content">
        {/* SEU NOME */}
        <h1 className="hero-title">
          Olá, eu sou <span className="highlight">Joelcio Maia</span>
        </h1>
        
        {/* SEU CARGO */}
        <p className="hero-subtitle">
           DevOps • Administrador de Redes • Professor de Ciência da Computação
        </p>
        
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
          <a href="#contato">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
      
      {/* PLACEHOLDER ANIMADO (você mantém por enquanto) */}
      <div className="hero-image">
        <div className="image-placeholder">
          <i className="fas fa-user-tie"></i>
        </div>
      </div>
    </section>
  );
};

export default Hero;