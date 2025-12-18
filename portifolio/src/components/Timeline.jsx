import { useState, useRef, useEffect } from 'react';
import './Timeline.css';

const Timeline = () => {
  const [filters, setFilters] = useState({
    professional: true,
    academic: true
  });

  const [visibleItems, setVisibleItems] = useState({});
  const itemRefs = useRef([]);
  const sectionRef = useRef(null);

  const timelineData = [
    {
      id: 1,
      type: 'academic',
      year: "2012",
      title: "Técnico em Agropecuária",
      company: "Colégio Agrícola",
      description: "Formação técnica em agropecuária com ênfase em agroecologia e tecnologia agrícola.",
      tags: ["Agropecuária", "Técnico", "Formação"],
      shortYear: 2012
    },
    {
      id: 2,
      type: 'professional',
      year: "2013 - 2014",
      title: "Praça do Exército - Técnico de Informática",
      company: "15ª CIA de Engenharia de Combate Mecanizada",
      description: "Suporte técnico em TI, manutenção de equipamentos, infraestrutura de rede e suporte aos sistemas da unidade militar.",
      tags: ["TI Militar", "Suporte", "Infraestrutura", "Redes"],
      shortYear: 2013
    },
    {
      id: 3,
      type: 'professional',
      year: "2014 - 2015",
      title: "Cinegrafista e Editor",
      company: "EG Produtora",
      description: "Produção audiovisual, captação de imagens, edição  e tratamento de imagem.",
      tags: ["Edição", "Photoshop", "Sony Vegas"],
      shortYear: 2014
    },
    {
      id: 4,
      type: 'professional',
      year: "2015",
      title: "Laboratorista de Informática",
      company: "Prefeitura de Abelardo Luz",
      description: "Gestão de laboratório de informática, manutenção de equipamentos, suporte a usuários e professores.",
      tags: ["Laboratório", "Suporte", "Gestão"],
      shortYear: 2015
    },
    
    {
      id: 6,
      type: 'professional',
      year: "2019 - 2022",
      title: "Administrador de Redes",
      company: "Associação Senhor Bom Jesus da Coluna",
      description: "Administração de redes, segurança da informação, gestão de servidores, firewalls, antivírus, virtualização, backup.",
      tags: ["Redes", "Segurança", "VMware", "PfSense", "Veeam", "Sophos"],
      shortYear: 2019
    },{
      id: 5,
      type: 'professional',
      year: "2019",
      title: "Estagiário admistrativo",
      company: "Instituto Federal de Educação, Ciência e Tecnologia do Paraná",
      description: "Estagio na área administrativa, apoio em gerenciamento de contratos",
      tags: ["Estágio", "IFPR", "Administrativo", "Gestão"],
      shortYear: 2019
    },
    {
      id: 7,
      type: 'professional',
      year: "2022",
      title: "Analista de Suporte",
      company: "Viasoft",
      description: "Suporte técnico especializado, atendimento a clientes, resolução de incidentes e gestão de tickets.",
      tags: ["Suporte", "Atendimento", "Viasoft", "Help Desk"],
      shortYear: 2022
    },
    {
      id: 8,
      type: 'professional',
      year: "2023",
      title: "Professor de Ensino Técnico",
      company: "Secretaria de Estado de Educação de SC",
      description: "Docência em cursos técnicos integrados ao ensino médio, desenvolvimento de materiais didáticos, orientação pedagógica.",
      tags: ["Docência", "Ensino Técnico", "Educação"],
      shortYear: 2023
    },
    {
      id: 9,
      type: 'professional',
      year: "2024",
      title: "Professor e Orientador de Curso",
      company: "Secretaria de Estado de Educação de SC",
      description: "Docência + orientação de cursos técnicos, coordenação pedagógica, desenvolvimento de projetos educacionais.",
      tags: ["Docência", "Orientação", "Coordenação"],
      shortYear: 2024
    },
    {
      id: 10,
      type: 'professional',
      year: "2025",
      title: "Professor",
      company: "Secretaria de Estado de Educação de SC",
      description: "Docência em tempo integral, foco em metodologias ativas e integração tecnologia-educação.",
      tags: ["Docência", "Educação", "Tecnologia"],
      shortYear: 2025
    },
    {
      id: 11,
      type: 'academic',
      year: "2025",
      title: "Conclusão da Graduação em Sistemas de Informação",
      company: "Faculdade de SistemasInstituto Federal de Educação, Ciência e Tecnologia do Paraná",
      description: "Conclusão da formação em Sistemas de Informação/Computação após trajetória de aprendizado contínuo.",
      tags: ["Graduação", "Formação", "Sistemas de Informação"],
      shortYear: 2025
    }
  ];

  // Observer para animação ao scrollar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const itemId = entry.target.dataset.id;
            if (itemId) {
              setVisibleItems(prev => ({ ...prev, [itemId]: true }));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      itemRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Filtrar e ordenar
  const filteredData = timelineData
    .filter(item => filters[item.type])
    .sort((a, b) => b.shortYear - a.shortYear);

  const handleCheckboxChange = (type) => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <section className="section" id="timeline" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">EXPERIÊNCIA</h2>
        
        <div className="timeline-filters">
          <p className="filter-instruction">
            Selecione pelo menos um tipo de experiência para conhecer minha trajetória
          </p>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={filters.professional}
                onChange={() => handleCheckboxChange('professional')}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Profissional</span>
            </label>
            
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={filters.academic}
                onChange={() => handleCheckboxChange('academic')}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Acadêmica</span>
            </label>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="no-selection-message">
            <i className="fas fa-info-circle"></i>
            <p>Selecione pelo menos um tipo de experiência acima.</p>
          </div>
        ) : (
          <div className="timeline-wrapper">
            <div className="timeline">
              <div className="timeline-line"></div>
              
              {filteredData.map((item, index) => {
                const isLeft = index % 2 === 0;
                const sideClass = isLeft ? 'left' : 'right';
                const isVisible = visibleItems[item.id];

                return (
                  <div
                    key={item.id}
                    ref={el => {
                      if (el && !itemRefs.current[item.id]) {
                        itemRefs.current[item.id] = el;
                      }
                    }}
                    data-id={item.id}
                    className={`timeline-item ${sideClass} ${item.type} ${isVisible ? 'visible' : ''}`}
                    style={{ '--item-index': index }}
                  >
                    <div className="timeline-dot"></div>
                    
                    <div className="timeline-card">
                      <div className="card-year">{item.year}</div>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-company">{item.company}</p>
                      <p className="card-description">{item.description}</p>
                      <div className="card-tags">
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className={`tag ${item.type}-tag`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="card-type">
                        {item.type === 'professional' ? 'Profissional' : 'Acadêmico'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;