import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  // honeypot — bots fill this, humans never see it
  company?: string;
};

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Hibás kérés." }, { status: 400 });
  }

  const { name, email, phone, topic, message, company } = data;

  // spam honeypot
  if (company) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Kérjük, töltse ki a kötelező mezőket." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Érvénytelen e-mail cím." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  // Not configured yet -> accept but don't send (keeps local/dev working)
  if (!SMTP_HOST || !SMTP_USER) {
    console.log("[contact] SMTP not configured — message received:", {
      name,
      email,
      phone,
      topic,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text = [
    `Név: ${name}`,
    `E-mail: ${email}`,
    `Telefon: ${phone ?? "-"}`,
    `Téma: ${topic ?? "-"}`,
    "",
    message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `Weboldal űrlap <${SMTP_USER}>`,
      to: CONTACT_TO ?? SMTP_USER,
      replyTo: email,
      subject: `Új üzenet a weboldalról — ${topic ?? "Kapcsolat"}`,
      text,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ error: "Az üzenetet nem sikerült elküldeni." }, { status: 502 });
  }
}
