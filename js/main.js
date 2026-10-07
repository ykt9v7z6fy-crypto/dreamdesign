const site = {
  name: "DreamDesign",
  email: "ddreamdesign@icloud.com",
};

const translations = {
  fi: {
    metaTitle: "DreamDesign — Verkkosivut pienyrityksille",
    metaDescription: "Sivut, jotka jäävät mieleen. DreamDesign tekee verkkosivut pienyrityksille.",
    skip: "Siirry sisältöön",
    navLabel: "Päävalikko",
    langLabel: "Kieli",
    langChanged: "Sivu on nyt suomeksi.",
    menuOpen: "Avaa valikko",
    menuClose: "Sulje valikko",
    navPortfolio: "Portfolio",
    navDemo: "Demo sivut",
    navClients: "Asiakkaiden sivut",
    navContact: "Yhteys",
    demoOpen: "Avaa demo",
    newTab: "Avautuu uuteen välilehteen.",
    auroraText: "Hotellisivusto järvenrantaan Savonlinnaan.",
    leivonenText: "Kahvilasivusto Punavuoreen Helsinkiin.",
    soleText: "Ravintolasivusto italialaiseen trattoriaan Bulevardille.",
    kieloText: "Kauneushoitolan sivusto Punavuoreen Helsinkiin.",
    heroTitleA: "Sivut, jotka",
    heroTitleB: "jäävät mieleen.",
    ctaPrimary: "Ottakaa yhteyttä",
    whyText:
      "Yritykselle on ensisijaisen tärkeää, että verkkosivut ovat nykyaikaiset ja selkeät. Ne ovat usein ensimmäinen kohtaaminen asiakkaan kanssa, ja sitä varten me olemme täällä auttamassa.",
    promise: "Te päätätte. Me toteutamme.",
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
    metaTitle: "DreamDesign — Websites for small businesses",
    metaDescription: "Sites that stay in mind. DreamDesign makes websites for small businesses.",
    skip: "Skip to content",
    navLabel: "Main menu",
    langLabel: "Language",
    langChanged: "The page is now in English.",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    navPortfolio: "Portfolio",
    navDemo: "Demo sites",
    navClients: "Client sites",
    navContact: "Contact",
    demoOpen: "Open demo",
    newTab: "Opens in a new tab.",
    auroraText: "A hotel website for a lakeside stay in Savonlinna.",
    leivonenText: "A café website for a bakery in Punavuori, Helsinki.",
    soleText: "A restaurant website for an Italian trattoria on Bulevardi.",
    kieloText: "A beauty salon website for a studio in Punavuori, Helsinki.",
    heroTitleA: "Sites that",
    heroTitleB: "stay in mind.",
    ctaPrimary: "Get in touch",
    whyText:
      "A modern, clear website is essential for a business. It is often the first meeting with a customer, and that is why we are here to help.",
    promise: "You decide. We deliver.",
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
  const titleKey = document.body.dataset.titleKey;
  document.title = titleKey && dict[titleKey] ? `${dict[titleKey]} — ${site.name}` : dict.metaTitle;

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

const portfolio = document.querySelector(".nav-drop");
const portfolioButton = portfolio?.querySelector(".nav-toggle");
const portfolioMenu = document.querySelector("#portfolio-menu");

function setPortfolio(open) {
  if (!portfolio || !portfolioButton || !portfolioMenu) return;
  portfolio.classList.toggle("open", open);
  portfolioButton.setAttribute("aria-expanded", open ? "true" : "false");
  portfolioMenu.hidden = !open;
}

function closeMobileNav() {
  header.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", translations[currentLang()].menuOpen);
}

portfolioButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  setPortfolio(portfolioButton.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("click", (event) => {
  if (!portfolio?.contains(event.target)) setPortfolio(false);
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    setPortfolio(false);
    closeMobileNav();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (portfolio?.classList.contains("open")) {
    setPortfolio(false);
    portfolioButton?.focus();
    return;
  }
  if (!header.classList.contains("open")) return;
  closeMobileNav();
  menuToggle?.focus();
});

const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
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

function fitDemoPreviews() {
  document.querySelectorAll(".demo-preview").forEach((frame) => {
    const iframe = frame.querySelector("iframe");
    if (!iframe || !frame.clientWidth || !frame.clientHeight) return;
    const baseWidth = 1280;
    const scale = frame.clientWidth / baseWidth;
    iframe.style.width = `${baseWidth}px`;
    iframe.style.height = `${frame.clientHeight / scale}px`;
    iframe.style.transform = `scale(${scale})`;
  });
}

if (document.querySelector(".demo-preview")) {
  fitDemoPreviews();
  window.addEventListener("resize", fitDemoPreviews);
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
