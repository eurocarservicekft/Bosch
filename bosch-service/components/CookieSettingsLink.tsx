"use client";

export default function CookieSettingsLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event("open-cookie-settings"));
      }}
    >
      {label}
    </a>
  );
}
