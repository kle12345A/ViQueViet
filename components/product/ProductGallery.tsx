"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const uniqueImages = Array.from(new Set(images));
  const [selected, setSelected] = useState(uniqueImages[0]);
  return (
    <div className="gallery">
      <div className="gallery-main"><Image src={selected} alt={name} fill priority sizes="(max-width: 768px) 100vw, 52vw" /></div>
      {uniqueImages.length > 1 && <div className="gallery-thumbs">{uniqueImages.map((image, index) => <button className={selected === image ? "active" : ""} type="button" key={image} onClick={() => setSelected(image)} aria-label={`Xem ảnh ${index + 1} của ${name}`}><Image src={image} alt="" fill sizes="96px" /></button>)}</div>}
    </div>
  );
}
