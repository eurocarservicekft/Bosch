"use client";
import { useState, useEffect, useCallback } from "react";

export type GalleryPhoto = { id: string; title: string; url: string };

export default function Gallery({ items }: { items: GalleryPhoto[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const show = useCallback((i: number) => setIdx((i + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, idx, show]);

  return (
    <>
      <div className="masonry">
        {items.map((it, i) => (
          <div className="tile" key={it.id} onClick={() => { setIdx(i); setOpen(true); }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.url} alt={it.title} loading="lazy" />
            {it.title && <div className="cap">{it.title}</div>}
          </div>
        ))}
      </div>

      {open && items[idx] && (
        <div className="lightbox open" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <span className="lb-close" onClick={() => setOpen(false)}>&times;</span>
          <span className="lb-nav lb-prev" onClick={() => show(idx - 1)}>&#8249;</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={items[idx].url} alt={items[idx].title} />
          <span className="lb-nav lb-next" onClick={() => show(idx + 1)}>&#8250;</span>
        </div>
      )}
    </>
  );
}
