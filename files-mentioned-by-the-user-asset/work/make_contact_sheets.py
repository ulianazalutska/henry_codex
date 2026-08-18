from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(r"C:\Users\ulana\Downloads\asset")
OUT = Path(r"C:\Users\ulana\Documents\Codex\2026-08-17\files-mentioned-by-the-user-asset\work\contact-sheets")
OUT.mkdir(parents=True, exist_ok=True)


def cover(im: Image.Image, size: tuple[int, int]) -> Image.Image:
    im = im.convert("RGB")
    scale = max(size[0] / im.width, size[1] / im.height)
    resized = im.resize((round(im.width * scale), round(im.height * scale)), Image.Resampling.LANCZOS)
    x = (resized.width - size[0]) // 2
    y = (resized.height - size[1]) // 2
    return resized.crop((x, y, x + size[0], y + size[1]))


def sheet(files: list[Path], name: str, cols: int, cell=(520, 390)) -> None:
    label_h = 62
    rows = (len(files) + cols - 1) // cols
    canvas = Image.new("RGB", (cols * cell[0], rows * (cell[1] + label_h)), "#efede7")
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default(size=18)
    for i, path in enumerate(files):
        x = (i % cols) * cell[0]
        y = (i // cols) * (cell[1] + label_h)
        with Image.open(path) as im:
            canvas.paste(cover(im, cell), (x, y))
        label = str(path.relative_to(ROOT))
        draw.rectangle((x, y + cell[1], x + cell[0], y + cell[1] + label_h), fill="#171615")
        draw.text((x + 14, y + cell[1] + 12), label[:55], fill="white", font=font)
    canvas.save(OUT / name, quality=92)


reference = [ROOT / "Header_.png", ROOT / "po scroll normal site sekction 1.png"] + sorted((ROOT / "reference").glob("*.png")) + sorted((ROOT / "logo").glob("*.png"))
products = sorted((ROOT / "wizulization and materials").glob("*.png"))
sheet(reference, "references-and-logo.jpg", 2, (640, 480))
sheet(products, "products-and-materials.jpg", 3, (520, 390))
