import { MarkdownContent } from "@/components/ui/MarkdownContent";

type ProductSection = { title: string; content: string; icon: "leaf" | "bowl" | "storage" | "file" };

const iconForTitle = (title: string): ProductSection["icon"] => {
  const normalized = title.toLocaleLowerCase("vi");
  if (normalized.includes("hướng dẫn")) return "bowl";
  if (normalized.includes("bảo quản")) return "storage";
  if (normalized.includes("thông tin")) return "file";
  return "leaf";
};

function parseSections(body: string): ProductSection[] {
  const matches = Array.from(body.matchAll(/^##\s+(.+)$/gm));
  return matches.map((match, index) => ({
    title: match[1].trim(),
    content: body.slice((match.index ?? 0) + match[0].length, matches[index + 1]?.index ?? body.length).trim(),
    icon: iconForTitle(match[1]),
  })).filter((section) => section.content);
}

export function ProductDetailsAccordion({ body }: { body: string }) {
  const sections = parseSections(body);
  if (!sections.length) return null;

  return <div className="product-accordion">
    {sections.map((section, index) => <details key={section.title} open={index === 0}>
      <summary><DetailIcon name={section.icon} /><span>{section.title}</span><b aria-hidden="true">⌄</b></summary>
      <div className="product-accordion-content"><MarkdownContent source={section.content} /></div>
    </details>)}
  </div>;
}

function DetailIcon({ name }: { name: ProductSection["icon"] }) {
  return <span className="product-accordion-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{name === "leaf" ? <><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c3-6 7-9 12-12"/></> : name === "bowl" ? <><path d="M4 11h16c0 5-3 8-8 8s-8-3-8-8Z"/><path d="M8 7c-1-2 1-3 0-5m4 5c-1-2 1-3 0-5m4 5c-1-2 1-3 0-5M7 21h10"/></> : name === "storage" ? <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 10h14M8 6v2m0 5v3"/></> : <><path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v5h5M9 13h6m-6 4h4"/><path d="m15 17 1 1 3-3"/></>}</svg></span>;
}
