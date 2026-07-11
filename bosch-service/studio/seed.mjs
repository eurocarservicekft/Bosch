// Seeds the Sanity dataset with initial Hungarian + English content.
//
//   Run once:  SANITY_API_WRITE_TOKEN=your-token node seed.mjs
//   (or put the token in .env.local and: node --env-file=.env.local seed.mjs)
//
// Idempotent: uses createOrReplace, so re-running updates the same documents.
// The token is read from the environment only — never hard-code it here.

import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Aborting.");
  process.exit(1);
}

const client = createClient({
  projectId: "2x8l1i27",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const L = (hu, en) => ({ hu, en });

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "Euro Car Service",
    phone: "+36 20 414 0234",
    phoneHref: "+36204140234",
    whatsapp: "+36 20 414 0244",
    whatsappHref: "36204140244",
    email: "eurocarservicekft@gmail.com",
    address: "Táncsics Mihály út 2/G, Tatabánya, 2800",
    mapsUrl:
      "https://www.google.com/maps?q=T%C3%A1ncsics%20Mih%C3%A1ly%20%C3%BAt%202%2FG%2C%20Tatab%C3%A1nya%2C%202800&output=embed",
    hours: [
      { _key: "h1", _type: "openingHour", day: L("Hétfő – Péntek", "Monday – Friday"), time: L("8:00 – 17:00", "8:00 – 17:00") },
      { _key: "h2", _type: "openingHour", day: L("Szombat", "Saturday"), time: L("Előzetes egyeztetéssel", "By appointment") },
      { _key: "h3", _type: "openingHour", day: L("Vasárnap", "Sunday"), time: L("Zárva", "Closed") },
    ],
    facebook: "https://www.facebook.com/profile.php?id=61558441253125",
    instagram: "",
  },
  {
    _id: "hero",
    _type: "hero",
    overline: L("Hivatalos Bosch Partner", "Official Bosch Partner"),
    headline: L("Szakértő kezekben az autód.", "Your car in expert hands."),
    subhead: L(
      "20+ év tapasztalat, modern Bosch diagnosztika, és igazi szakmai gondoskodás. Ahogy egy autószerviznek lennie kell.",
      "20+ years of experience, modern Bosch diagnostics, and genuine professional care — the way a car service should be."
    ),
  },
  {
    _id: "about",
    _type: "about",
    overline: L("Rólunk", "About us"),
    title: L("Egy csapat, egy műhely", "One team, one workshop"),
    subhead: L(
      "Nálunk nincs sztárszerelő és nincs háttérben dolgozó. Minden autón együtt dolgozunk — közös tudással, közös felelősséggel.",
      "There's no star mechanic and no one hidden in the back here. We work on every car together — shared knowledge, shared responsibility."
    ),
    intro: L(
      "Több mint 20 éve nyitjuk ki minden reggel ugyanazzal a meggyőződéssel a műhelyt: az embereknek olyan szervizre van szükségük, amiben megbízhatnak. Nem alkatrészeket cserélünk — problémákat oldunk meg, és elmagyarázzuk, miért. Ezt pedig csapatként tesszük: mindenki ugyanazt a mércét tartja.",
      "For over 20 years we've opened the workshop every morning with the same conviction: people need a service they can trust. We don't just replace parts — we solve problems, and we explain why. And we do it as a team: everyone holds the same standard."
    ),
    stats: [
      { _key: "s1", _type: "stat", num: "20+", label: L("év tapasztalat", "years of experience") },
      { _key: "s2", _type: "stat", num: "12 000+", label: L("elégedett ügyfél", "happy customers") },
      { _key: "s3", _type: "stat", num: "40+", label: L("autótípus", "car makes") },
      { _key: "s4", _type: "stat", num: "100%", label: L("Bosch hivatalos partner", "official Bosch partner") },
    ],
    certs: [
      { _key: "c1", _type: "cert", label: L("Hivatalos Bosch Partner", "Official Bosch Partner") },
      { _key: "c2", _type: "cert", label: L("ISO 9001", "ISO 9001") },
      { _key: "c3", _type: "cert", label: L("Bosch Diagnostics", "Bosch Diagnostics") },
      { _key: "c4", _type: "cert", label: L("Klímagáz kezelői engedély", "Refrigerant handling licence") },
    ],
    closing: L(
      "A bizalmat nem lehet megvenni. Minden egyes autóval, minden egyes ügyféllel újra kiérdemeljük — együtt.",
      "Trust can't be bought. We earn it again with every car and every customer — together."
    ),
  },
  // --- services ---
  svc("idoszakos-szerviz", 1, true, "gauge", "karbantartas",
    L("Időszakos szerviz", "Scheduled service"),
    L("Olajcsere, szűrők, folyadékszintek és átfogó átvizsgálás a gyári szervizkönyv szerint.",
      "Oil change, filters, fluid levels and a full inspection according to the manufacturer's service book."),
    L("Ár: 14 900 Ft-tól", "From: 14,900 HUF")),
  svc("bosch-diagnosztika", 2, true, "diagnostics", "diagnosztika",
    L("Bosch diagnosztika", "Bosch diagnostics"),
    L("Teljes elektronikai hibakód-olvasás és pontos diagnózis a legmodernebb Bosch műszerekkel.",
      "Full electronic fault-code reading and precise diagnosis with the latest Bosch equipment."),
    L("Ár: 9 900 Ft-tól", "From: 9,900 HUF")),
  svc("fekrendszer", 3, false, "brake", "javitas",
    L("Fékrendszer javítás", "Brake system repair"),
    L("Féktárcsa, fékbetét és fékfolyadék ellenőrzés és csere — a biztonság nem alku tárgya.",
      "Brake disc, pad and fluid inspection and replacement — safety is not up for negotiation."),
    L("Ár: 18 000 Ft-tól", "From: 18,000 HUF")),
  svc("futomu", 4, false, "wheel", "javitas",
    L("Futómű és geometria", "Suspension & wheel alignment"),
    L("Számítógépes futóműbeállítás a pontos kormányzásért és az egyenletes gumikopásért.",
      "Computerised wheel alignment for precise steering and even tyre wear."),
    L("Ár: 12 000 Ft-tól", "From: 12,000 HUF")),
  svc("gumiszerviz", 5, false, "tire", "gumi",
    L("Gumiszerviz", "Tyre service"),
    L("Szezonális gumicsere, centírozás, javítás és tárolás — gyorsan, előjegyzéssel.",
      "Seasonal tyre change, balancing, repair and storage — fast, by appointment."),
    L("Ár: 8 000 Ft-tól", "From: 8,000 HUF")),
  svc("klimaszerviz", 6, false, "climate", "karbantartas",
    L("Klímaszerviz", "Air-conditioning service"),
    L("Klíma töltés, tisztítás és fertőtlenítés a tiszta, hűvös és szagmentes utastérért.",
      "A/C recharge, cleaning and disinfection for a clean, cool and odour-free cabin."),
    L("Ár: 11 000 Ft-tól", "From: 11,000 HUF")),
  svc("akkumulator", 7, false, "battery", "diagnosztika",
    L("Akkumulátor teszt", "Battery test"),
    L("Akkumulátor- és töltésrendszer-vizsgálat, csere — hogy az autó mindig elinduljon.",
      "Battery and charging-system check and replacement — so your car always starts."),
    L("Ár: 4 500 Ft-tól", "From: 4,500 HUF")),
  svc("motorjavitas", 8, false, "engine", "javitas",
    L("Motorjavítás", "Engine repair"),
    L("Motorhiba feltárása és szakszerű javítása, vezérlés és szíjcsere gyári alkatrészekkel.",
      "Diagnosis and professional repair of engine faults, timing and belt replacement with OEM parts."),
    L("Egyedi árajánlat", "Custom quote")),
  // --- testimonials ---
  {
    _id: "testimonial-1", _type: "testimonial", name: "Nagy Péter", city: "Budapest", order: 1,
    quote: L(
      "Évek óta ide hozom az autóimat. Mindig pontosak, korrektek, és elmagyarázzák, mi a probléma. Ritka az ilyen szerviz.",
      "I've been bringing my cars here for years. Always on time, always fair, and they explain what the problem is. A service like this is rare."
    ),
  },
  {
    _id: "testimonial-2", _type: "testimonial", name: "Kovács Anna", city: "Érd", order: 2,
    quote: L(
      "A diagnosztika pillanatok alatt megtalálta a hibát, amit máshol két hétig kerestek. Profi munka, tisztességes ár.",
      "The diagnostics found in minutes a fault others had been searching for two weeks. Professional work, fair price."
    ),
  },
];

function svc(id, order, featured, icon, category, title, description, priceText) {
  return {
    _id: `service-${id}`,
    _type: "service",
    title, category, description, priceText, icon, order, featured,
    body: L("", ""),
  };
}

async function run() {
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();
  console.log(`Seeded ${docs.length} documents into "production". Gallery is left empty — add real photos in the Studio.`);
}

run().catch((e) => {
  console.error("Seed failed:", e.message);
  process.exit(1);
});
