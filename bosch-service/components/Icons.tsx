import * as React from "react";

type P = React.SVGProps<SVGSVGElement>;
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PhoneIcon = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
export const MailIcon = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);
export const PinIcon = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
export const ShieldIcon = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
export const UsersIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* why-us icons */
const Diagnostics = (p: P) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </svg>
);
export const Wrench = (p: P) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const Receipt = (p: P) => (
  <svg {...base} strokeWidth={1.5} {...p}>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 17.5v-11" />
  </svg>
);

/* service icons */
const Gauge = (p: P) => (
  <svg {...base} {...p}><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>
);
const Brake = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></svg>
);
const Wheel = (p: P) => (
  <svg {...base} {...p}><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /><circle cx="12" cy="12" r="4" /></svg>
);
const Tire = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg>
);
const Climate = (p: P) => (
  <svg {...base} {...p}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
);
const Battery = (p: P) => (
  <svg {...base} {...p}><rect x="2" y="8" width="20" height="10" rx="2" /><path d="M6 8V6M18 8V6M8 13h3M16 12v2" /></svg>
);
const Engine = (p: P) => (
  <svg {...base} {...p}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);

export const whyIcons = { Diagnostics, Wrench, Receipt };

const serviceIconMap: Record<string, (p: P) => React.JSX.Element> = {
  gauge: Gauge,
  diagnostics: Diagnostics,
  brake: Brake,
  wheel: Wheel,
  tire: Tire,
  climate: Climate,
  battery: Battery,
  engine: Engine,
};

export function ServiceIcon({ name, ...p }: { name?: string } & P) {
  const C = serviceIconMap[name ?? ""] ?? Gauge;
  return <C {...p} />;
}
