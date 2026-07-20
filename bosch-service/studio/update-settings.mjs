// Updates opening hours + WhatsApp number in Sanity.
//
//   cd studio
//   $env:SANITY_API_WRITE_TOKEN="sk..."
//   node update-settings.mjs
//
// Only touches the hours and WhatsApp fields. Nothing else is changed.

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

const hours = [
  {
    _key: "h1",
    _type: "openingHour",
    day: L("Hétfő – Péntek", "Monday – Friday"),
    time: L("7:00 – 16:00", "7:00 – 16:00"),
  },
  {
    _key: "h2",
    _type: "openingHour",
    day: L("Szombat", "Saturday"),
    time: L("Zárva", "Closed"),
  },
  {
    _key: "h3",
    _type: "openingHour",
    day: L("Vasárnap", "Sunday"),
    time: L("Zárva", "Closed"),
  },
];

async function run() {
  await client
    .patch("siteSettings")
    .set({
      hours,
      whatsapp: "+36 20 414 0234",
      whatsappHref: "36204140234",
    })
    .commit();

  console.log("Updated:");
  console.log("  Hétfő – Péntek : 7:00 – 16:00");
  console.log("  Szombat        : Zárva");
  console.log("  Vasárnap       : Zárva");
  console.log("  WhatsApp       : +36 20 414 0234");
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
