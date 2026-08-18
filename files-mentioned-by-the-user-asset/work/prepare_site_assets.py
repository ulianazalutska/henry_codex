from pathlib import Path
from PIL import Image
import shutil
import sys

SOURCE = Path(r"C:\Users\ulana\Downloads\asset")
PUBLIC = Path(r"C:\Users\ulana\Documents\Codex\2026-08-17\files-mentioned-by-the-user-asset\outputs\henry-home-prototype\public\media")
PUBLIC.mkdir(parents=True, exist_ok=True)

images = {
    "atelier-solaris.webp": "wizulization and materials/10. Solaris solo-kolor Deep Caramel - skóra 1.png",
    "vesper-stone.webp": "wizulization and materials/15.Vesper solo Stone Beige 1.png",
    "vesper-graphite.webp": "wizulization and materials/8.Vesper solo Warm Graphite Pikowany 2 1.png",
    "lounge-evening.webp": "wizulization and materials/ChatGPT Image 10 lip 2026, 22_30_08 1.png",
    "lounge-evening-alt.webp": "wizulization and materials/ChatGPT Image 10 lip 2026, 22_33_07 1.png",
    "lounge-pair.webp": "wizulization and materials/ChatGPT Image 11 lip 2026, 23_08_30 1.png",
    "studio-black.webp": "wizulization and materials/ChatGPT Image 11 lip 2026, 23_11_53 1.png",
    "atelier-caramel-room.webp": "wizulization and materials/ChatGPT Image 11 lip 2026, 23_30_41 1.png",
    "atelier-caramel-study.webp": "wizulization and materials/ChatGPT Image 12 lip 2026, 10_06_09 1.png",
    "private-viewing.webp": "wizulization and materials/ChatGPT Image 12 lip 2026, 11_21_01 1.png",
    "lounge-ivory-pair.webp": "wizulization and materials/ChatGPT Image 12 lip 2026, 11_34_30 1.png",
    "atelier-ivory.webp": "wizulization and materials/ChatGPT Image 13 lip 2026, 08_23_34 1.png",
    "atelier-ivory-portrait.webp": "wizulization and materials/ChatGPT Image 13 lip 2026, 10_56_06 1.png",
    "cinema-coast.webp": "wizulization and materials/ChatGPT Image 9 lip 2026, 09_14_33 2.png",
    "material-ebony.webp": "wizulization and materials/kolorystyka drewna Smoked Ebony Gloss  1.png",
    "material-palette.webp": "wizulization and materials/Kolorystyka Lounge Collection 1.png",
    "studio-cinema-wide.webp": "wizulization and materials/Nova - kolekcja Studio 1.png",
    "studio-cinema-front.webp": "wizulization and materials/Nova - Kolekcja Studio png 1.png",
    "studio-cinema-bespoke.webp": "wizulization and materials/Nova - Kolekcja Studio. Skóra + alcantara png 2.png",
}

for target_name, relative in images.items():
    with Image.open(SOURCE / relative) as image:
        image = image.convert("RGB")
        if max(image.size) > 1800:
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        image.save(PUBLIC / target_name, "WEBP", quality=88, method=6)

shutil.copy2(SOURCE / "logo" / "logo.png", PUBLIC / "henry-logo-gold.png")
shutil.copy2(SOURCE / "logo" / "Mask group.png", PUBLIC / "henry-logo-white.png")
shutil.copy2(SOURCE / "video-scroll" / "0817(1).mp4", PUBLIC / "henry-entrance.mp4")
shutil.copy2(
    Path(r"C:\Users\ulana\Documents\Codex\2026-08-17\files-mentioned-by-the-user-asset\work\video-frames\frame-00-00.00s.jpg"),
    PUBLIC / "henry-entrance-poster.jpg",
)
