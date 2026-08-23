import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export function PageHero({ eyebrow, title, description, image, imageAlt, actions, compact = false, className = "" }: { eyebrow: string; title: string; description: string; image?: string; imageAlt?: string; actions?: ReactNode; compact?: boolean; className?: string }) {
  return (
    <section className={`page-hero watercolor-frame ${compact ? "compact" : ""} ${className}`.trim()}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          {actions ?? <div className="button-row"><Button href="/san-pham">Khám phá sản phẩm</Button><Button href="/lien-he" variant="secondary">Liên hệ tư vấn</Button></div>}
        </div>
        {image && <div className="hero-image"><Image src={image} alt={imageAlt ?? ""} fill loading="eager" fetchPriority="high" sizes="(max-width: 768px) 100vw, 48vw" /></div>}
      </div>
    </section>
  );
}
