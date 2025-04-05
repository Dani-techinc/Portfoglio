/* === script.js === */

console.log("Benvenuto nel mio sito! 👋");

document.addEventListener("DOMContentLoaded", () => {
  // Modalità Dark/Light
  const modeToggle = document.getElementById("mode-toggle");
  const currentMode = localStorage.getItem("mode") || "light";
  document.body.classList.add(`${currentMode}-mode`);

  // Cambia l'icona del toggle
  if (currentMode === "dark") {
    modeToggle.textContent = "🌞";
  } else {
    modeToggle.textContent = "🌙";
  }

  // Gestione del cambio modalità
  modeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("dark-mode");
    document.body.classList.toggle("dark-mode", !isDarkMode);
    document.body.classList.toggle("light-mode", isDarkMode);
    localStorage.setItem("mode", isDarkMode ? "light" : "dark");
    modeToggle.textContent = isDarkMode ? "🌙" : "🌞";
  });

  // Animazioni di entrata delle sezioni
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Gestione del form contatti
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/meoarblv", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        status.textContent = "Messaggio inviato con successo! ✅";
        form.reset();

        // Dopo 3.5s inizia la dissolvenza
        setTimeout(() => {
          status.classList.add("fade-out");
        }, 3500);

        // Dopo 4s svuota e resetta lo stile
        setTimeout(() => {
          status.textContent = "";
          status.classList.remove("fade-out");
        }, 4000);
      } else {
        status.textContent = "Errore nell'invio. Riprova!";
      }
    } catch (error) {
      status.textContent = "Errore di connessione 😕";
    }
  });
});
