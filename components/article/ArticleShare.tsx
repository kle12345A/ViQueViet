"use client";

import { useState } from "react";

export function ArticleShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function share(network: "facebook" | "zalo") {
    const url = encodeURIComponent(window.location.href);
    const target = network === "facebook"
      ? `https://www.facebook.com/sharer/sharer.php?u=${url}`
      : `https://zalo.me/share?url=${url}`;
    window.open(target, "_blank", "noopener,noreferrer,width=720,height=560");
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="article-share">
      <strong>Chia sẻ bài viết:</strong>
      <div>
        <button type="button" onClick={() => share("facebook")} aria-label={`Chia sẻ ${title} lên Facebook`}>f</button>
        <button type="button" onClick={() => share("zalo")} aria-label={`Chia sẻ ${title} qua Zalo`}>Z</button>
        <button type="button" onClick={copyLink} aria-label="Sao chép liên kết bài viết">↗</button>
      </div>
      <span role="status" aria-live="polite">{copied ? "Đã sao chép liên kết" : ""}</span>
    </div>
  );
}
