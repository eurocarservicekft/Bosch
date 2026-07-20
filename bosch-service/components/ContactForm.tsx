"use client";
import { useState } from "react";
import { ArrowRight } from "./Icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm({
  locale,
  tr,
  topics: incoming,
}: {
  locale: Locale;
  tr: any;
  topics?: string[];
}) {
  // Options come from the services in the CMS, so the form always matches
  // the real price list. "Egyéb" / "Other" is always the last option.
  const topics =
    incoming && incoming.length
      ? [...incoming, tr.contact.otherTopic]
      : [tr.contact.otherTopic];
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState(topics[0]);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      topic,
      message: String(fd.get("message") ?? ""),
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
        setTopic(topics[0]);
      } else {
        const j = await res.json().catch(() => ({}));
        setError(j.error ?? tr.contact.error);
        setStatus("error");
      }
    } catch {
      setError(tr.contact.error);
      setStatus("error");
    }
  }

  return (
    <div className="form-card">
      <h2 className="serif">{tr.contact.formTitle}</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        />

        <div className="field">
          <Label htmlFor="cName">{tr.contact.name}</Label>
          <Input id="cName" name="name" placeholder={tr.contact.namePlaceholder} required />
        </div>
        <div className="field">
          <Label htmlFor="cEmail">{tr.contact.email}</Label>
          <Input id="cEmail" name="email" type="email" placeholder="pelda@email.hu" required />
        </div>
        <div className="field">
          <Label htmlFor="cPhone">{tr.contact.phone}</Label>
          <Input id="cPhone" name="phone" type="tel" placeholder="+36 ..." />
        </div>
        <div className="field">
          <Label>{tr.contact.topic}</Label>
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {topics.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="field">
          <Label htmlFor="cMsg">{tr.contact.messageLabel}</Label>
          <Textarea id="cMsg" name="message" placeholder={tr.contact.messagePlaceholder} />
        </div>

        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? tr.contact.sending : tr.contact.submit} <ArrowRight />
        </Button>

        {status === "ok" && (
          <p style={{ marginTop: 14, fontSize: 14, color: "var(--teal)" }}>{tr.contact.success}</p>
        )}
        {status === "error" && (
          <p style={{ marginTop: 14, fontSize: 14, color: "var(--red)" }}>{error}</p>
        )}
      </form>
    </div>
  );
}
