import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>© {currentYear} Joelcio J. Maia. - Todos os direitos reservados.</p>
        <p>Infraestrutura e Redes • Tecnologia da Informação • Análise e Desenvolvimento de Sistemas</p>
      </div>
    </footer>
  );
};

export default Footer;
