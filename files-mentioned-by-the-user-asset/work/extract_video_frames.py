from pathlib import Path
import sys

sys.path.insert(0, r"C:\Users\ulana\Documents\Codex\2026-08-17\files-mentioned-by-the-user-asset\work\pydeps")
import cv2
from PIL import Image, ImageDraw, ImageFont

VIDEO = Path(r"C:\Users\ulana\Downloads\asset\video-scroll\0817(1).mp4")
OUT = Path(r"C:\Users\ulana\Documents\Codex\2026-08-17\files-mentioned-by-the-user-asset\work\video-frames")
OUT.mkdir(parents=True, exist_ok=True)

cap = cv2.VideoCapture(str(VIDEO))
fps = cap.get(cv2.CAP_PROP_FPS)
frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
duration = frames / fps if fps else 0
print(f"{width}x{height} | {fps:.3f} fps | {frames} frames | {duration:.3f} s")

times = [duration * i / 8 for i in range(9)]
thumbs = []
for index, timestamp in enumerate(times):
    cap.set(cv2.CAP_PROP_POS_MSEC, timestamp * 1000)
    ok, frame = cap.read()
    if not ok:
        continue
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image = Image.fromarray(rgb)
    image.save(OUT / f"frame-{index:02d}-{timestamp:05.2f}s.jpg", quality=94)
    scale = min(600 / image.width, 338 / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (600, 380), "#171615")
    canvas.paste(resized, ((600 - resized.width) // 2, 0))
    draw = ImageDraw.Draw(canvas)
    draw.text((16, 350), f"{timestamp:05.2f}s", fill="white", font=ImageFont.load_default(size=18))
    thumbs.append(canvas)
cap.release()

sheet = Image.new("RGB", (1800, 1140), "#efede7")
for i, thumb in enumerate(thumbs):
    sheet.paste(thumb, ((i % 3) * 600, (i // 3) * 380))
sheet.save(OUT / "video-contact-sheet.jpg", quality=92)
