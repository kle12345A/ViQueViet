import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

SOURCE = Path(os.environ["VIQUEVIET_ASSET_SOURCE"])
OUTPUT = Path(__file__).resolve().parents[1] / ".asset-review"
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}


def make_sheet(folder: Path, recursive: bool = False) -> None:
    candidates = folder.rglob("*") if recursive else folder.iterdir()
    files = sorted(p for p in candidates if p.is_file() and p.suffix.lower() in EXTENSIONS)
    if not files:
        return
    cell_w, cell_h, cols = 240, 210, 4
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new("RGB", (cell_w * cols, cell_h * rows), "#f4efe5")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()
    for index, path in enumerate(files):
        x = (index % cols) * cell_w
        y = (index // cols) * cell_h
        try:
            with Image.open(path) as image:
                image = ImageOps.exif_transpose(image).convert("RGB")
                thumb = ImageOps.contain(image, (cell_w - 16, 164))
                sheet.paste(thumb, (x + (cell_w - thumb.width) // 2, y + 6))
                label = f"{index + 1}. {path.name}"[:38]
                draw.text((x + 7, y + 174), label, fill="#20251e", font=font)
                draw.text((x + 7, y + 190), f"{image.width}x{image.height}", fill="#625b50", font=font)
        except Exception as exc:
            draw.text((x + 7, y + 20), f"ERROR: {exc}"[:35], fill="#a00000", font=font)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    safe_name = folder.name.replace(" ", "-").lower()
    sheet.save(OUTPUT / f"{safe_name}.jpg", quality=88)


make_sheet(SOURCE / "Nhà máy sản xuất", recursive=True)
