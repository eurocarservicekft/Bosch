export type Locale = "hu" | "en";
export const locales: Locale[] = ["hu", "en"];
export const defaultLocale: Locale = "hu";

export const ui = {
  hu: {
    nav: {
      services: "Szolgáltatások",
      about: "Rólunk",
      gallery: "Galéria",
      contact: "Kapcsolat",
    },
    common: {
      callNow: "Hívjon most",
      sendMessage: "Küldjön üzenetet",
      scroll: "Görgessen",
      allServices: "Összes szolgáltatás megtekintése",
      pages: "Oldalak",
      contact: "Kapcsolat",
      openingHours: "Nyitvatartás",
      rightsReserved: "Minden jog fenntartva.",
      privacy: "Adatvédelem",
      cookiePolicy: "Cookie szabályzat",
      cookieSettings: "Cookie beállítások",
      madeBy: "Weboldal:",
      madeByName: "Kiss Lívia",
      message: "Üzenet",
      map: "Térkép",
      call: "Hívjon",
    },
    home: {
      servicesTitle: "Szolgáltatásaink",
      servicesIntro: "A teljes Bosch szolgáltatási spektrum egy helyen.",
      whyTitle: "Miért minket válasszanak?",
      why1Title: "Modern diagnosztika",
      why1Text:
        "A legújabb Bosch berendezésekkel pontosan beazonosítjuk a hibát — nincs találgatás, nincs felesleges alkatrészcsere.",
      why2Title: "Tapasztalt csapat",
      why2Text:
        "Képzett, hivatalosan minősített szakemberek, akik minden márkát ismernek és komolyan veszik a munkájukat.",
      why3Title: "Átlátható árazás",
      why3Text:
        "Előre tudja, mire számíthat. Tételes árajánlat a munka megkezdése előtt — meglepetések nélkül.",
      testimonials: "Vélemények",
      ctaTitle: "Készen áll a következő szervizre?",
      ctaText: "Hívjon minket, vagy küldjön üzenetet — gyorsan válaszolunk.",
      trust1: "Hivatalos Bosch Partner",
      trust2: "20+ év tapasztalat",
      trust3: "Modern Bosch diagnosztika",
    },
    services: {
      title: "A teljes Bosch spektrum",
      subtitle:
        "Karbantartástól a komplex diagnosztikáig — minden egy helyen, gyári minőségben.",
      notFound: "Nem találja amit keres? Hívjon minket:",
      hourlyLabel: "Rezsióradíj",
      hourlyNote: "Ha a hiba nem egyértelmű, előbb feltárjuk a problémát — ilyenkor rezsióradíjjal számolunk.",
      vatNote: "A feltüntetett árak nettó árak, az ÁFA-t nem tartalmazzák.",
    },
    gallery: {
      title: "A munkánk, közelről",
      subtitle: "Műhely, csapat, felszerelés és valódi eredmények.",
      empty: "Hamarosan képek érkeznek.",
    },
    about: {
      teamTitle: "A csapat",
      teamIntro: "Akik nap mint nap az autója mellett állnak.",
      teamPhotoPlaceholder: "Csoportkép helye",
      certsLabel: "Minősítések",
    },
    contact: {
      title: "Beszéljünk az autójáról",
      subtitle:
        "Hívjon, írjon, vagy jöjjön be személyesen — gyorsan és érthetően válaszolunk.",
      formTitle: "Küldjön üzenetet",
      name: "Név",
      namePlaceholder: "Az Ön neve",
      email: "E-mail",
      phone: "Telefonszám",
      topic: "Mivel segíthetünk?",
      messageLabel: "Üzenet",
      messagePlaceholder: "Írja le röviden, mire van szüksége...",
      submit: "Üzenet küldése",
      sending: "Küldés...",
      success: "Köszönjük! Hamarosan válaszolunk.",
      error: "Hiba történt a küldés során.",
      callUs: "Hívjon minket",
      address: "Cím",
      directionsTitle: "Hogyan talál meg minket",
      directions:
        "Szervizünk Tatabányán, könnyen megközelíthető helyen található. Parkolás az épület előtt.",
    },
    notFound: {
      title: "Ez az út zsákutca.",
      text:
        "A keresett oldal nem található — lehet, hogy elköltözött, vagy elírás csúszott a címbe.",
      home: "Vissza a főoldalra",
    },
    cookie: {
      title: "Sütiket használunk",
      text:
        "Az oldal működéséhez szükséges sütiket, valamint – az Ön hozzájárulásával – anonim analitikai sütiket (Google Analytics) használunk. Részletek a",
      policyLink: "Cookie szabályzatban",
      acceptAll: "Elfogadom",
      onlyNecessary: "Csak a szükségeseket",
    },
  },
  en: {
    nav: {
      services: "Services",
      about: "About us",
      gallery: "Gallery",
      contact: "Contact",
    },
    common: {
      callNow: "Call now",
      sendMessage: "Send a message",
      scroll: "Scroll",
      allServices: "View all services",
      pages: "Pages",
      contact: "Contact",
      openingHours: "Opening hours",
      rightsReserved: "All rights reserved.",
      privacy: "Privacy",
      cookiePolicy: "Cookie policy",
      cookieSettings: "Cookie settings",
      madeBy: "Website by",
      madeByName: "Lívia Kiss",
      message: "Message",
      map: "Map",
      call: "Call",
    },
    home: {
      servicesTitle: "Our services",
      servicesIntro: "The full Bosch service spectrum in one place.",
      whyTitle: "Why choose us?",
      why1Title: "Modern diagnostics",
      why1Text:
        "With the latest Bosch equipment we pinpoint the fault exactly — no guesswork, no unnecessary parts.",
      why2Title: "Experienced team",
      why2Text:
        "Trained, certified professionals who know every make and take their work seriously.",
      why3Title: "Transparent pricing",
      why3Text:
        "You know what to expect. An itemised quote before the work starts — no surprises.",
      testimonials: "Testimonials",
      ctaTitle: "Ready for your next service?",
      ctaText: "Call us or send a message — we reply quickly.",
      trust1: "Official Bosch Partner",
      trust2: "20+ years of experience",
      trust3: "Modern Bosch diagnostics",
    },
    services: {
      title: "The full Bosch spectrum",
      subtitle:
        "From maintenance to complex diagnostics — all in one place, at factory quality.",
      notFound: "Can't find what you're looking for? Call us:",
      hourlyLabel: "Hourly labour rate",
      hourlyNote: "If the fault isn't obvious, we diagnose the problem first — that work is billed at our hourly rate.",
      vatNote: "All prices shown are net prices and do not include VAT.",
    },
    gallery: {
      title: "Our work, up close",
      subtitle: "Workshop, team, equipment and real results.",
      empty: "Photos coming soon.",
    },
    about: {
      teamTitle: "The team",
      teamIntro: "The people looking after your car every day.",
      teamPhotoPlaceholder: "Group photo",
      certsLabel: "Certifications",
    },
    contact: {
      title: "Let's talk about your car",
      subtitle:
        "Call, write, or drop in — we'll answer quickly and in plain language.",
      formTitle: "Send a message",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      phone: "Phone number",
      topic: "How can we help?",
      messageLabel: "Message",
      messagePlaceholder: "Briefly describe what you need...",
      submit: "Send message",
      sending: "Sending...",
      success: "Thank you! We'll be in touch shortly.",
      error: "Something went wrong while sending.",
      callUs: "Call us",
      address: "Address",
      directionsTitle: "How to find us",
      directions:
        "Our workshop is in Tatabánya, easy to reach. Parking is available in front of the building.",
    },
    notFound: {
      title: "This road is a dead end.",
      text:
        "The page you're looking for can't be found — it may have moved, or the address has a typo.",
      home: "Back to home",
    },
    cookie: {
      title: "We use cookies",
      text:
        "We use cookies necessary for the site to work and — with your consent — anonymous analytics cookies (Google Analytics). Details in our",
      policyLink: "Cookie policy",
      acceptAll: "Accept",
      onlyNecessary: "Only necessary",
    },
  },
} as const;

export function getUi(locale: Locale) {
  return ui[locale] ?? ui.hu;
}

/** Narrow an incoming route param to a supported locale (defaults to hu). */
export function toLocale(value: string): Locale {
  return value === "en" ? "en" : "hu";
}
