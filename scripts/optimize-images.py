from pathlib import Path
from PIL import Image, ImageOps


ASSET_DIR = Path(__file__).resolve().parents[1] / "src" / "assets"
PUBLIC_DIR = Path(__file__).resolve().parents[1] / "public"
SOURCE_NAMES = [
    "mep-inspection.jpg",
    "water-meter.jpg",
    "hong-kong-village-water-supply.png",
    "saltwater-toilet.jpg",
    "water-safety.png",
    "safety-environmental-documents.png",
    "safety-environmental-consultation.png",
    "fiou-safety-audit.png",
    "mobile-aluminium-scaffold-inspection.png",
    "confined-space-service.png",
    "wr1-electrical-inspection.png",
    "environmental-permit-application.png",
    "hong-kong-professional-home-inspection.png",
    "hong-kong-part-time-safety-environmental-officer.png",
]


for source_name in SOURCE_NAMES:
    source = ASSET_DIR / source_name
    destination = source.with_suffix(".webp")
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if image.width > 1600:
            height = round(image.height * 1600 / image.width)
            image = image.resize((1600, height), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=82, method=6)
    print(f"{source.name} -> {destination.name} ({destination.stat().st_size:,} bytes)")


logo_source = ASSET_DIR / "company-logo.jpeg"
with Image.open(logo_source) as opened:
    logo = ImageOps.exif_transpose(opened).convert("RGB")
    square_logo = ImageOps.fit(logo, (512, 512), Image.Resampling.LANCZOS)
    for filename, size in [
        ("favicon-16x16.png", 16),
        ("favicon-32x32.png", 32),
        ("apple-touch-icon.png", 180),
        ("android-chrome-192x192.png", 192),
        ("android-chrome-512x512.png", 512),
    ]:
        icon = square_logo.resize((size, size), Image.Resampling.LANCZOS)
        icon.save(PUBLIC_DIR / filename, "PNG", optimize=True)
    square_logo.save(
        PUBLIC_DIR / "favicon.ico",
        "ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    logo.save(PUBLIC_DIR / "company-logo.jpeg", "JPEG", quality=90, optimize=True)


social_source = ASSET_DIR / "hong-kong-professional-home-inspection.webp"
with Image.open(social_source) as opened:
    social_image = ImageOps.fit(
        ImageOps.exif_transpose(opened).convert("RGB"),
        (1200, 630),
        Image.Resampling.LANCZOS,
        centering=(0.5, 0.5),
    )
    social_image.save(PUBLIC_DIR / "og-image.webp", "WEBP", quality=84, method=6)
