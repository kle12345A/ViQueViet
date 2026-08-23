import Link from "next/link";

export function BrandMark({ linked = true }: { linked?: boolean }) {
  const mark = (
    <>
      <span className="brand-seal" aria-hidden="true"><b>V</b><i>Q</i></span>
      <span className="brand-words"><strong>Vị Quê Việt</strong><small>Đậm vị quê nhà</small></span>
    </>
  );
  return linked ? <Link className="brand-mark" href="/" aria-label="Vị Quê Việt - Trang chủ">{mark}</Link> : <div className="brand-mark">{mark}</div>;
}
