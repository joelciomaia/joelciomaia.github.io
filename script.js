const EMAILJS_PUBLIC_KEY = "WNWYjZIAts5Z6rjBo";
const EMAILJS_SERVICE_ID = "service_ra40jsa";
const EMAILJS_TEMPLATE_ID = "template_7ae59gy";

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
  setupCurrentYear();
  setupContactForm();
});
