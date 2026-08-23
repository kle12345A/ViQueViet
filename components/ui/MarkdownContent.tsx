import type { ReactNode } from "react";

export function MarkdownContent({ source, hideFirstHeading = false }: { source: string; hideFirstHeading?: boolean }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let firstHeadingSkipped = false;
  const flushList = () => {
    if (!list.length) return;
    blocks.push(<ul key={`list-${blocks.length}`}>{list.map((item) => <li key={item}>{item}</li>)}</ul>);
    list = [];
  };

  for (const line of source.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) { flushList(); continue; }
    if (trimmed.startsWith("## ")) {
      flushList();
      if (hideFirstHeading && !firstHeadingSkipped) { firstHeadingSkipped = true; continue; }
      firstHeadingSkipped = true;
      blocks.push(<h2 key={`h-${blocks.length}`}>{trimmed.slice(3)}</h2>);
    }
    else if (trimmed.startsWith("### ")) { flushList(); blocks.push(<h3 key={`h-${blocks.length}`}>{trimmed.slice(4)}</h3>); }
    else if (trimmed.startsWith("- ")) list.push(trimmed.slice(2));
    else { flushList(); blocks.push(<p key={`p-${blocks.length}`}>{trimmed}</p>); }
  }
  flushList();
  return <div className="prose-content">{blocks}</div>;
}
