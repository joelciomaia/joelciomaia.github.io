const EMAILJS_PUBLIC_KEY = "WNWYjZIAts5Z6rjBo";
const EMAILJS_SERVICE_ID = "service_ra40jsa";
const EMAILJS_TEMPLATE_ID = "template_7ae59gy";

function setupBrandVisuals() {
  document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach((link) => {
    link.href = "./assets/favicon-tech.png?v=20260807-1";
    if (link.rel === "icon") link.type = "image/png";
  });

  const heroImage = document.querySelector(".hero-visual img");
  if (heroImage) {
    heroImage.src = "./assets/hero-tech-profile.webp?v=20260807-1";
    heroImage.alt = "Perfil masculino voltado para a esquerda com cérebro digital, circuitos, programação, redes e tecnologia conectada";
    heroImage.width = 560;
    heroImage.height = 315;
    heroImage.style.borderRadius = "0";
  }
}

function setupVisualOverrides() {
  const existing = document.querySelector('link[data-visual-overrides="true"]');
  if (existing) return;

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "./icon-lines.css?v=20260806-5";
  stylesheet.dataset.visualOverrides = "true";
  document.head.appendChild(stylesheet);
}

function setupButtonPulses() {
  const svgNamespace = "http://www.w3.org/2000/svg";
  const targets = document.querySelectorAll(
    ".button:not(.button-dark), .contact-links a",
  );

  targets.forEach((target) => {
    if (target.querySelector(":scope > .button-pulse-border")) return;

    const svg = document.createElementNS(svgNamespace, "svg");
    const rect = document.createElementNS(svgNamespace, "rect");

    svg.classList.add("button-pulse-border");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    rect.setAttribute("pathLength", "100");
    svg.appendChild(rect);
    target.appendChild(svg);

    const updateGeometry = () => {
      const width = Math.max(1, target.offsetWidth);
      const height = Math.max(1, target.offsetHeight);
      const computedRadius = Number.parseFloat(
        window.getComputedStyle(target).borderRadius,
      );
      const radius = Number.isFinite(computedRadius)
        ? Math.min(computedRadius, height / 2)
        : height / 2;
      const inset = 1;

      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      rect.setAttribute("x", String(inset));
      rect.setAttribute("y", String(inset));
      rect.setAttribute("width", String(Math.max(0, width - inset * 2)));
      rect.setAttribute("height", String(Math.max(0, height - inset * 2)));
      rect.setAttribute("rx", String(Math.max(0, radius - inset)));
      rect.setAttribute("ry", String(Math.max(0, radius - inset)));
    };

    const runPulse = () => {
      updateGeometry();
      svg.classList.remove("is-running");
      void svg.getBoundingClientRect();
      svg.classList.add("is-running");
    };

    target.addEventListener("mouseenter", runPulse);
    target.addEventListener("focus", runPulse);

    rect.addEventListener("animationend", () => {
      svg.classList.remove("is-running");
    });
  });
}

function showNotification(message, isSuccess = true) {
  const previous = document.querySelector(".contact-notification");
  if (previous) previous.remove();

  const notification = document.createElement("div");
  notification.className = `contact-notification ${isSuccess ? "is-success" : "is-error"}`;
  notification.setAttribute("role", "status");

  const title = document.createElement("strong");
  title.textContent = isSuccess ? "Mensagem enviada" : "Erro ao enviar";

  const text = document.createElement("p");
  text.textContent = message;

  notification.append(title, text);

  document.body.appendChild(notification);

  window.setTimeout(() => {
    notification.remove();
  }, 5000);
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  if (window.emailjs) window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!window.emailjs) {
      showNotification(
        "O envio automatico nao carregou. Envie um e-mail diretamente para joelcio.maia@sed.sc.gov.br.",
        false,
      );
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const name = formData.get("from_name") || "Usuario";
    const originalLabel = button.textContent;

    button.disabled = true;
    button.textContent = "Enviando...";

    try {
      await window.emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
      );

      showNotification(`Obrigado, ${name}! Retornarei em ate 48 horas.`);
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar:", error);
      showNotification("Tente novamente ou envie e-mail diretamente.", false);
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });
}

function setupCurrentYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

window.addEventListener("DOMContentLoaded", () => {
  setupBrandVisuals();
  setupVisualOverrides();
  setupButtonPulses();
  setupCurrentYear();
  setupContactForm();
});
