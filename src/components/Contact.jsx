import './Contact.css';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') || 'Usuário';
    alert(`Obrigado, ${name}! Sua mensagem foi enviada. Entrarei em contato em breve.`);
    e.target.reset();
  };

  return (
    <section className="section" id="contato">
      <div className="container">
        <h2 className="section-title">Entre em Contato</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Vamos Conversar!</h3>
            <p>Será um grande prazer discutir ideias, projetos ou oportunidades.</p>
            <div className="contact-details">
              <p><i className="fas fa-envelope"></i> joelcio.maia@sed.sc.gov.br</p>
              
              <p><i className="fas fa-map-marker-alt"></i> Abelardo Luz, Brasil</p>
            </div>
            
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Seu nome" required />
            <input type="email" name="email" placeholder="Seu e-mail" required />
            <textarea name="message" placeholder="Sua mensagem..." rows="5" required></textarea>
            <button type="submit" className="btn btn-primary">Enviar Mensagem</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
