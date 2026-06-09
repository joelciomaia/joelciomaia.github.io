type MarqueeVariant = 'development' | 'infrastructure';

type MarqueeItem = {
  icon: string;
  color: string;
  name: string;
};

const marqueeItems: Record<MarqueeVariant, MarqueeItem[]> = {
  development: [
    { icon: 'fa-brands fa-html5', color: 'text-orange-300', name: 'HTML' },
    { icon: 'fa-brands fa-css3-alt', color: 'text-sky-300', name: 'CSS' },
    { icon: 'fa-brands fa-js', color: 'text-yellow-300', name: 'JavaScript' },
    { icon: 'fa-brands fa-react', color: 'text-cyan-300', name: 'React' },
    { icon: 'fa-brands fa-angular', color: 'text-red-300', name: 'Angular' },
    { icon: 'fa-brands fa-node-js', color: 'text-green-300', name: 'Node.js' },
    { icon: 'fa-solid fa-mobile-screen', color: 'text-purple-300', name: 'Ionic' },
    { icon: 'fa-solid fa-database', color: 'text-blue-300', name: 'MySQL' },
    { icon: 'fa-brands fa-git-alt', color: 'text-orange-300', name: 'Git' },
    { icon: 'fa-solid fa-bolt', color: 'text-yellow-200', name: 'Vite' },
  ],
  infrastructure: [
    { icon: 'fa-solid fa-headset', color: 'text-emerald-300', name: 'Suporte Técnico' },
    { icon: 'fa-solid fa-screwdriver-wrench', color: 'text-cyan-300', name: 'Help Desk' },
    { icon: 'fa-solid fa-network-wired', color: 'text-blue-300', name: 'Redes' },
    { icon: 'fa-solid fa-route', color: 'text-emerald-300', name: 'TCP/IP' },
    { icon: 'fa-solid fa-globe', color: 'text-cyan-300', name: 'DNS' },
    { icon: 'fa-solid fa-diagram-project', color: 'text-blue-300', name: 'DHCP' },
    { icon: 'fa-solid fa-shield-halved', color: 'text-emerald-300', name: 'Firewall' },
    { icon: 'fa-solid fa-server', color: 'text-cyan-300', name: 'Servidores' },
    { icon: 'fa-solid fa-desktop', color: 'text-blue-300', name: 'Laboratórios' },
    { icon: 'fa-solid fa-book', color: 'text-emerald-300', name: 'Documentação' },
    { icon: 'fa-solid fa-chart-line', color: 'text-cyan-300', name: 'Monitoramento' },
  ],
};

const repetitions = Array.from({ length: 8 }, (_, index) => index);

function MarqueeGroup({ items }: { items: MarqueeItem[] }) {
  return (
    <div className="tech-marquee-group">
      {items.map((item) => (
        <div key={item.name} className="tech-marquee-item">
          <i className={`${item.icon} ${item.color}`}></i>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

type TechMarqueeProps = {
  variant?: MarqueeVariant;
  reverse?: boolean;
};

export default function TechMarquee({ variant = 'development', reverse = false }: TechMarqueeProps) {
  const items = marqueeItems[variant];
  const directionClass = reverse ? 'tech-marquee-track-reverse' : '';
  const dividerDirectionClass = reverse ? 'tech-marquee-divider-reverse' : '';

  return (
    <div className={`tech-marquee-divider ${dividerDirectionClass}`} aria-hidden="true">
      <style>
        {`
          @keyframes techMarqueeScroll {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-12.5%, 0, 0);
            }
          }

          @keyframes techMarqueeGlow {
            0% {
              background-position: -45vw 50%, 0 0;
            }
            100% {
              background-position: 145vw 50%, 0 0;
            }
          }

          .tech-marquee-divider {
            position: relative;
            overflow: hidden;
            border-block: 1px solid rgb(255 255 255 / 0.04);
            background:
              radial-gradient(circle at 50% 50%, rgb(34 211 238 / 0.08), transparent 18rem),
              #070a12;
            background-repeat: no-repeat;
            background-size: 34rem 12rem, auto;
            animation: techMarqueeGlow 18s linear infinite;
            padding-block: 0.95rem;
          }

          .tech-marquee-divider-reverse {
            animation-direction: reverse;
          }

          .tech-marquee-divider::before,
          .tech-marquee-divider::after {
            content: '';
            position: absolute;
            z-index: 2;
            top: 0;
            bottom: 0;
            width: min(9rem, 24vw);
            pointer-events: none;
          }

          .tech-marquee-divider::before {
            left: 0;
            background: linear-gradient(90deg, #070a12, transparent);
          }

          .tech-marquee-divider::after {
            right: 0;
            background: linear-gradient(270deg, #070a12, transparent);
          }

          .tech-marquee-track {
            display: flex;
            width: max-content;
            animation: techMarqueeScroll 48s linear infinite;
            will-change: transform;
          }

          .tech-marquee-track-reverse {
            animation-direction: reverse;
            animation-duration: 54s;
          }

          .tech-marquee-divider:hover .tech-marquee-track {
            animation-play-state: paused;
          }

          .tech-marquee-group {
            display: flex;
            flex-shrink: 0;
            gap: 0.75rem;
            padding-right: 0.75rem;
          }

          .tech-marquee-item {
            display: flex;
            align-items: center;
            gap: 0.55rem;
            flex-shrink: 0;
            border-radius: 999px;
            padding: 0.45rem 0.7rem;
            color: rgb(212 212 216);
            font-size: 0.84rem;
            font-weight: 700;
            letter-spacing: -0.01em;
            opacity: 0.82;
          }

          .tech-marquee-item i {
            font-size: 1rem;
          }

          @media (prefers-reduced-motion: reduce) {
            .tech-marquee-divider {
              animation: none;
              background-position: 50% 50%, 0 0;
            }

            .tech-marquee-track {
              animation: none;
              transform: translate3d(0, 0, 0);
            }
          }
        `}
      </style>

      <div className={`tech-marquee-track ${directionClass}`}>
        {repetitions.map((index) => (
          <MarqueeGroup key={index} items={items} />
        ))}
      </div>
    </div>
  );
}
