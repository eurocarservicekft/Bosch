// Replaces the placeholder services with Euro Car Service's REAL price list,
// and sets the hourly labour rate.
//
//   Windows PowerShell, from the studio folder:
//     $env:SANITY_API_WRITE_TOKEN="sk..."
//     node update-services.mjs
//
// Safe: it only touches "service" documents and the hourly rate field.
// Everything else (hero, about, testimonials, gallery, photos) is left alone.

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

// price helper: fixed, net price
const P = (huf) =>
  L(`${huf.toLocaleString("hu-HU").replace(/\u00A0/g, " ")} Ft + ÁFA`,
    `${huf.toLocaleString("en-US")} HUF + VAT`);

const services = [
  {
    id: "hibatarolo-kiolvasas",
    order: 1,
    featured: true,
    icon: "diagnostics",
    category: "diagnosztika",
    title: L("Hibatároló kiolvasás, törlés", "Fault code reading & clearing"),
    description: L(
      "A jármű elektronikai rendszereinek kiolvasása, a hibakódok értelmezése és törlése.",
      "Reading the vehicle's electronic systems, interpreting the fault codes and clearing them."
    ),
    price: P(10000),
  },
  {
    id: "futomu-beallitas",
    order: 2,
    featured: true,
    icon: "wheel",
    category: "javitas",
    title: L("Futómű műszeres beállítása", "Computerised wheel alignment"),
    description: L(
      "Számítógépes futómű-geometria beállítás a pontos kormányzásért és az egyenletes gumikopásért.",
      "Computerised wheel alignment for precise steering and even tyre wear."
    ),
    price: P(40000),
  },
  {
    id: "klima-nyomasproba",
    order: 3,
    featured: true,
    icon: "climate",
    category: "karbantartas",
    title: L("Klímarendszer nyomáspróba, feltöltés", "A/C pressure test & refill"),
    description: L(
      "A klímarendszer tömítettségének ellenőrzése és szakszerű feltöltése.",
      "Checking the air-conditioning system for leaks and refilling it properly."
    ),
    price: P(40000),
  },
  {
    id: "muszaki-vizsga-elotti",
    order: 4,
    featured: false,
    icon: "gauge",
    category: "karbantartas",
    title: L("Műszaki vizsga előtti átvizsgálás", "Pre-inspection check"),
    description: L(
      "Teljes körű átnézés a műszaki vizsga előtt, hogy ne érje meglepetés a vizsgán.",
      "A full check before the official technical inspection, so there are no surprises."
    ),
    price: P(40000),
  },
  {
    id: "gepi-valto-olajcsere",
    order: 5,
    featured: false,
    icon: "engine",
    category: "karbantartas",
    title: L("Gépi váltóolaj-csere, átmosással", "Automatic transmission oil change with flush"),
    description: L(
      "Automata váltó olajcseréje géppel, a rendszer átmosásával — nem csak leeresztés.",
      "Machine oil change for automatic gearboxes, flushing the system rather than just draining it."
    ),
    price: P(50000),
  },
  {
    id: "also-atvizsgalas",
    order: 6,
    featured: false,
    icon: "gauge",
    category: "diagnosztika",
    title: L("Megbontás nélküli alsó átvizsgálás", "Underbody inspection without dismantling"),
    description: L(
      "Az alváz és a futómű állapotának ellenőrzése bontás nélkül, emelőn.",
      "Inspecting the underbody and suspension on a lift, without dismantling anything."
    ),
    price: P(20000),
  },
  {
    id: "vetel-elotti-atvizsgalas",
    order: 7,
    featured: true,
    icon: "diagnostics",
    category: "diagnosztika",
    title: L("Vétel előtti átvizsgálás", "Pre-purchase inspection"),
    description: L(
      "Használt autó vásárlása előtt átnézzük a járművet, hogy tudja, mit vesz.",
      "We inspect the car before you buy it, so you know exactly what you're getting."
    ),
    price: P(40000),
  },
  {
    id: "fekhatasmeres",
    order: 8,
    featured: false,
    icon: "brake",
    category: "javitas",
    title: L("Fékhatásmérés", "Brake efficiency test"),
    description: L(
      "A fékrendszer hatásfokának műszeres mérése — a biztonság nem alku tárgya.",
      "Instrument-based measurement of braking efficiency — safety is not up for negotiation."
    ),
    price: P(10000),
  },
  {
    id: "tpms-programozas",
    order: 9,
    featured: false,
    icon: "tire",
    category: "gumi",
    title: L("TPMS programozás / tanítás", "TPMS programming"),
    description: L(
      "Abroncsnyomás-ellenőrző szenzorok programozása és betanítása a járműhöz.",
      "Programming and pairing tyre-pressure monitoring sensors to the vehicle."
    ),
    price: P(4000),
  },
];

async function run() {
  // 1. remove the old placeholder services
  const oldIds = await client.fetch(`*[_type=="service"]._id`);
  if (oldIds.length) {
    const del = client.transaction();
    oldIds.forEach((id) => del.delete(id));
    await del.commit();
    console.log(`Removed ${oldIds.length} old service(s).`);
  }

  // 2. create the real ones
  const tx = client.transaction();
  for (const s of services) {
    tx.createOrReplace({
      _id: `service-${s.id}`,
      _type: "service",
      title: s.title,
      description: s.description,
      priceText: s.price,
      icon: s.icon,
      category: s.category,
      order: s.order,
      featured: s.featured,
      body: L("", ""),
    });
  }
  await tx.commit();
  console.log(`Added ${services.length} real services.`);

  // 3. hourly labour rate
  await client
    .patch("siteSettings")
    .set({
      hourlyRate: L("20 000 Ft/óra + ÁFA", "20,000 HUF/hour + VAT"),
    })
    .commit();
  console.log("Hourly rate set: 20 000 Ft/óra + ÁFA");
  console.log("\nDone. Check it at https://eurocarservice.sanity.studio");
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
