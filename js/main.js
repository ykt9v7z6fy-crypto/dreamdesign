const site = {
  name: "Dream Design",
  email: "ddreamdesign@icloud.com",
};

const translations = {
  fi: {
    metaTitle: "Dream Design — Verkkosivut pienyrityksille",
    metaDescription: "Sivut, jotka jäävät mieleen. Dream Design tekee verkkosivut pienyrityksille.",
    skip: "Siirry sisältöön",
    navLabel: "Päävalikko",
    langLabel: "Kieli",
    langChanged: "Sivu on nyt suomeksi.",
    menuOpen: "Avaa valikko",
    menuClose: "Sulje valikko",
    navSteps: "Työ",
    navContact: "Yhteys",
    heroTitleA: "Sivut, jotka",
    heroTitleB: "jäävät mieleen.",
    ctaPrimary: "Ottakaa yhteyttä",
    stepsTitle: "Työ",
    step1: "Ottakaa yhteyttä",
    step2: "Käymme yhdessä läpi, millainen sivusto sopii yrityksellenne",
    step3: "Toteutan sivut valmiiksi",
    step4: "Julkaisemme sivuston",
    step5: "Teemme tarvittavat korjaukset",
    step6: "Ylläpito sovitaan toiveidenne mukaan",
    contactKicker: "Yhteys",
    contactTitle: "Ottakaa yhteyttä.",
    contactLead: "Kertokaa lyhyesti, millaisen sivuston yrityksenne tarvitsee.",
    contactEmailLabel: "Tai suoraan sähköpostilla",
    formName: "Nimi",
    formEmail: "Sähköposti",
    formCompany: "Yritys",
    formMessage: "Millaisen sivuston tarvitsette?",
    formSend: "Lähetä viesti",
    formNote: "Viesti avautuu sähköpostiohjelmaan.",
    formError: "Tarkista nimi, sähköposti ja viesti.",
    formSuccess: "Sähköpostiohjelman pitäisi aueta. Jos mitään ei tapahtunut, kirjoita osoitteeseen {email}.",
    footerBlurb: "Sivut, jotka jäävät mieleen.",
    footerRights: "Kaikki oikeudet pidätetään.",
    mailSubject: "Tarjouspyyntö",
    mailName: "Nimi",
    mailEmail: "Sähköposti",
    mailCompany: "Yritys",
  },
  en: {
    metaTitle: "Dream Design — Websites for small businesses",
    metaDescription: "Sites that stay in mind. Dream Design makes websites for small businesses.",
    skip: "Skip to content",
    navLabel: "Main menu",
    langLabel: "Language",
    langChanged: "The page is now in English.",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    navSteps: "Work",
    navContact: "Contact",
    heroTitleA: "Sites that",
    heroTitleB: "stay in mind.",
    ctaPrimary: "Get in touch",
    stepsTitle: "Work",
    step1: "Get in touch",
    step2: "We define the site that fits your business",
    step3: "I deliver the finished site",
    step4: "We publish the site",
    step5: "We make any needed revisions",
    step6: "Maintenance follows your preferences",
    contactKicker: "Contact",
    contactTitle: "Get in touch.",
    contactLead: "A short description of the site your business needs is enough.",
    contactEmailLabel: "Or email directly",
    formName: "Name",
    formEmail: "Email",
    formCompany: "Company",
    formMessage: "What kind of site does your business need?",
    formSend: "Send message",
    formNote: "This opens your email app.",
    formError: "Check the name, email, and message.",
    formSuccess: "Your email app should have opened. If nothing happened, write to {email}.",
    footerBlurb: "Sites that stay in mind.",
    footerRights: "All rights reserved.",
    mailSubject: "Website inquiry",
    mailName: "Name",
    mailEmail: "Email",
    mailCompany: "Company",
  },
};

const STORAGE_KEY = "kajo-lang";

function currentLang() {
  return document.documentElement.lang === "en" ? "en" : "fi";
}

function applyLanguage(lang, announce) {
  const dict = translations[lang];
  document.documentElement.lang = lang;
  document.title = dict.metaTitle;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", dict.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = dict[el.getAttribute("data-i18n")];
    if (value != null) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const value = dict[el.getAttribute("data-i18n-aria")];
    if (value != null) el.setAttribute("aria-label", value);
  });

  document.querySelectorAll("[data-brand]").forEach((el) => {
    el.textContent = site.name;
  });

  document.querySelectorAll("[data-email]").forEach((el) => {
    el.textContent = site.email;
    el.setAttribute("href", `mailto:${site.email}`);
  });

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", button.getAttribute("data-lang") === lang ? "true" : "false");
  });

  const menu = document.querySelector(".menu-toggle");
  const header = document.querySelector(".site-header");
  if (menu && header) {
    menu.setAttribute("aria-label", header.classList.contains("open") ? dict.menuClose : dict.menuOpen);
  }

  const status = document.querySelector("#form-status");
  if (status?.dataset.state === "error") status.textContent = dict.formError;
  if (status?.dataset.state === "ok") {
    status.textContent = dict.formSuccess.replace("{email}", site.email);
  }

  if (announce) {
    const live = document.querySelector("#lang-status");
    if (live) live.textContent = dict.langChanged;
  }

  localStorage.setItem(STORAGE_KEY, lang);

  const url = new URL(location.href);
  if (lang === "fi") url.searchParams.delete("lang");
  else url.searchParams.set("lang", "en");
  history.replaceState(null, "", url);
}

function initialLang() {
  const query = new URLSearchParams(location.search).get("lang");
  if (query === "fi" || query === "en") return query;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fi" || stored === "en") return stored;
  } catch {
    /* private mode */
  }
  return "fi";
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.getAttribute("data-lang"), true);
  });
});

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle?.addEventListener("click", () => {
  const open = header.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  const dict = translations[currentLang()];
  menuToggle.setAttribute("aria-label", open ? dict.menuClose : dict.menuOpen);
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", translations[currentLang()].menuOpen);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !header.classList.contains("open")) return;
  header.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", translations[currentLang()].menuOpen);
  menuToggle?.focus();
});

const navLinks = [...document.querySelectorAll(".nav a")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

const form = document.querySelector("#contact-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const dict = translations[currentLang()];
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const company = String(data.get("company") || "").trim();
  const message = String(data.get("message") || "").trim();
  const status = document.querySelector("#form-status");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    status.dataset.state = "error";
    status.textContent = dict.formError;
    return;
  }

  const body = [
    `${dict.mailName}: ${name}`,
    `${dict.mailEmail}: ${email}`,
    company ? `${dict.mailCompany}: ${company}` : "",
    "",
    message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  status.dataset.state = "ok";
  status.textContent = dict.formSuccess.replace("{email}", site.email);
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${dict.mailSubject}: ${name}`)}&body=${encodeURIComponent(body)}`;
});

applyLanguage(initialLang(), false);
