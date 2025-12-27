import { useEffect, useMemo, useRef, useState } from "react";

const TypingLoop = ({
  phrases,
  className = "hero-subtitle",
  typingSpeed = 55,
  deletingSpeed = 35,
  pauseAfterType = 1200,
  pauseAfterDelete = 250,
  cursor = true
}) => {
  const defaultPhrases = useMemo(
    () => [
      "Docência técnica em tecnologia da informação",
      "Análise e desenvolvimento de sistemas",
      "Administração de infraestrutura e redes corporativas",
      "Suporte técnico e gestão de ambientes de TI"
    ],
    []
  );

  const texts = phrases?.length ? phrases : defaultPhrases;

  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentPhrase = texts[phraseIndex % texts.length];

    const tick = () => {
      const nextText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(nextText);

      if (!isDeleting && nextText === currentPhrase) {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseAfterType);
        return;
      }

      if (isDeleting && nextText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % texts.length);
        timeoutRef.current = setTimeout(() => {}, pauseAfterDelete);
        return;
      }

      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeoutRef.current = setTimeout(tick, speed);
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [texts, phraseIndex, text, isDeleting, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

  return (
    <p className={className}>
      <span>{text}</span>
      {cursor ? <span className="typing-cursor">|</span> : null}

      <style>{`
        .typing-cursor{
          display:inline-block;
          margin-left:2px;
          animation: typingBlink 1s steps(1) infinite;
        }
        @keyframes typingBlink { 50% { opacity: 0; } }
      `}</style>
    </p>
  );
};

export default TypingLoop;
