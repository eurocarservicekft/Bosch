import type { ReactNode, CSSProperties } from "react";

// Pure-CSS scroll/entrance reveal (see .reveal in globals.css).
// No JavaScript: content can never be left hidden.
export default function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`reveal ${className}`.trim()} data-delay={delay || undefined} style={style}>
      {children}
    </div>
  );
}
