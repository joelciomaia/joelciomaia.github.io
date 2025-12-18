import { useEffect, useRef } from 'react';
import './SkillBubbles.css';

const SkillBubbles = () => {
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef(null);
  
  // MAIS POSIÇÕES para cobrir melhor
  const fixedPositions = [
    // Linha 1 - mais acima
    { left: '5%', top: '10%' },
    { left: '20%', top: '8%' },
    { left: '35%', top: '12%' },
    { left: '50%', top: '9%' },
    { left: '65%', top: '11%' },
    { left: '80%', top: '7%' },
    { left: '95%', top: '10%' },
    
    // Linha 2
    { left: '10%', top: '30%' },
    { left: '25%', top: '28%' },
    { left: '40%', top: '32%' },
    { left: '55%', top: '29%' },
    { left: '70%', top: '31%' },
    { left: '85%', top: '27%' },
    
    // Linha 3
    { left: '15%', top: '50%' },
    { left: '30%', top: '48%' },
    { left: '45%', top: '52%' },
    { left: '60%', top: '49%' },
    { left: '75%', top: '51%' },
    { left: '90%', top: '47%' },
    
    // Linha 4
    { left: '8%', top: '70%' },
    { left: '23%', top: '68%' },
    { left: '38%', top: '72%' },
    { left: '53%', top: '69%' },
    { left: '68%', top: '71%' },
    { left: '83%', top: '67%' },
    
    // Linha 5 - mais abaixo
    { left: '12%', top: '85%' },
    { left: '28%', top: '83%' },
    { left: '44%', top: '87%' },
    { left: '60%', top: '84%' },
    { left: '76%', top: '86%' },
    { left: '92%', top: '82%' },
  ];

  // TODAS as tecnologias que você mencionou
  const technologies = [
    { name: 'Java', icon: 'fab fa-java', color: '#007396' },
    { name: 'Angular', icon: 'fab fa-angular', color: '#DD0031' },
    { name: 'Ionic', icon: 'fas fa-mobile-alt', color: '#3880FF' },
    { name: 'VMware', icon: 'fas fa-server', color: '#607078' },
    { name: 'Veeam', icon: 'fas fa-database', color: '#00B8F5' },
    { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26' },
    { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6' },
    { name: 'Scrum', icon: 'fas fa-tasks', color: '#009DDC' },
    { name: 'C', icon: 'fas fa-c', color: '#A8B9CC' },
    { name: 'SQL', icon: 'fas fa-database', color: '#4479A1' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
    { name: 'Linux', icon: 'fab fa-linux', color: '#FCC624' },
    { name: 'Windows', icon: 'fab fa-windows', color: '#0078D6' },
    { name: 'Spring', icon: 'fas fa-leaf', color: '#6DB33F' },
    { name: 'MongoDB', icon: 'fas fa-database', color: '#47A248' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F1502F' },
    { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED' },
    { name: 'TypeScript', icon: 'fas fa-code', color: '#3178C6' },
    { name: 'Redux', icon: 'fas fa-box', color: '#764ABC' },
    { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E' },
    { name: 'Adobe', icon: 'fab fa-adobe', color: '#FF0000' },
    { name: 'Photoshop', icon: 'fas fa-image', color: '#31A8FF' },
    { name: 'Vegas', icon: 'fas fa-video', color: '#0D98BA' },
    { name: 'PfSense', icon: 'fas fa-shield-alt', color: '#212121' },
    { name: 'Sophos', icon: 'fas fa-shield-virus', color: '#00B2FF' },
    { name: 'Bitdefender', icon: 'fas fa-shield-alt', color: '#ED1C24' },
  ];

  const initBubbles = () => {
    bubblesRef.current.forEach((bubble, index) => {
      if (bubble && fixedPositions[index]) {
        const pos = fixedPositions[index];
        
        bubble.style.left = pos.left;
        bubble.style.top = pos.top;
        bubble.style.transform = 'scale(1)';
        bubble.style.opacity = '0.6'; // MAIS VISÍVEL
        
        bubble.dataset.originalLeft = pos.left;
        bubble.dataset.originalTop = pos.top;
        bubble.dataset.originalScale = '1';
        bubble.dataset.originalOpacity = '0.6'; // MAIS VISÍVEL
      }
    });
  };

  const updateBubbles = () => {
    const mouseX = mousePosRef.current.x;
    const mouseY = mousePosRef.current.y;
    
    bubblesRef.current.forEach((bubble) => {
      if (!bubble) return;
      
      const rect = bubble.getBoundingClientRect();
      const bubbleCenterX = rect.left + rect.width / 2;
      const bubbleCenterY = rect.top + rect.height / 2;
      
      const dx = mouseX - bubbleCenterX;
      const dy = mouseY - bubbleCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const originalScale = parseFloat(bubble.dataset.originalScale || '1');
      const originalOpacity = parseFloat(bubble.dataset.originalOpacity || '0.6');
      
      // ZOOM MAIS DRAMÁTICO
      if (distance < 80) {
        // MUITO PERTO: zoom máximo
        const zoom = 1 + (1.5 - distance / 80 * 1.5); // Até 2.5x
        bubble.style.transform = `scale(${originalScale * zoom})`;
        bubble.style.opacity = '1'; // MÁXIMA OPACIDADE
        
        const tooltip = bubble.querySelector('.bubble-tooltip');
        if (tooltip) tooltip.style.opacity = '1';
        
      } else if (distance < 250) {
        // ZONA DE PROXIMIDADE
        const proximity = 1 - (distance - 80) / 170;
        const zoom = 1 + proximity * 1.0; // Até 2x
        bubble.style.transform = `scale(${originalScale * zoom})`;
        bubble.style.opacity = (originalOpacity * (1 + proximity * 0.5)).toString();
        
        const tooltip = bubble.querySelector('.bubble-tooltip');
        if (tooltip) {
          tooltip.style.opacity = proximity.toString();
        }
        
      } else {
        // LONGE: normal
        bubble.style.transform = `scale(${originalScale})`;
        bubble.style.opacity = originalOpacity.toString();
        
        const tooltip = bubble.querySelector('.bubble-tooltip');
        if (tooltip) tooltip.style.opacity = '0';
      }
      
      // MOVIMENTO MÍNIMO (2-3px) para efeito sutil
      if (distance < 120) {
        const moveX = (dx / distance) * (1 - distance / 120) * 3;
        const moveY = (dy / distance) * (1 - distance / 120) * 3;
        
        const originalLeft = parseFloat(bubble.dataset.originalLeft);
        const originalTop = parseFloat(bubble.dataset.originalTop);
        
        bubble.style.left = `calc(${originalLeft} + ${moveX}px)`;
        bubble.style.top = `calc(${originalTop} + ${moveY}px)`;
      } else {
        bubble.style.left = bubble.dataset.originalLeft;
        bubble.style.top = bubble.dataset.originalTop;
      }
    });
    
    animationIdRef.current = requestAnimationFrame(updateBubbles);
  };

  useEffect(() => {
    initBubbles();
    
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    animationIdRef.current = requestAnimationFrame(updateBubbles);
    
    const handleResize = () => {
      initBubbles();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <div className="skill-bubbles-container" ref={containerRef}>
      {technologies.slice(0, fixedPositions.length).map((tech, index) => (
        <div
          key={index}
          ref={el => bubblesRef.current[index] = el}
          className="skill-bubble"
          data-tech={tech.name}
          style={{ '--bubble-color': tech.color }}
        >
          <i className={`${tech.icon} bubble-icon`}></i>
          <span className="bubble-tooltip">{tech.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SkillBubbles;