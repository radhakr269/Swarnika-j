#!/usr/bin/env python3
"""
Consolidates all website images into public/assist/image and public-assist-image,
organized by product, model, category, banner, avatar, community, and brand.
"""

import os
import sys
import urllib.request
import urllib.error
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_ASSIST_IMAGE = os.path.join(BASE_DIR, 'public', 'assist', 'image')
PUBLIC_ASSIST_IMAGE_ROOT = os.path.join(BASE_DIR, 'public-assist-image')

# Define subdirectories
DIRS = [
    os.path.join(PUBLIC_ASSIST_IMAGE, 'products'),
    os.path.join(PUBLIC_ASSIST_IMAGE, 'models'),
    os.path.join(PUBLIC_ASSIST_IMAGE, 'closeups'),
    os.path.join(PUBLIC_ASSIST_IMAGE, 'categories'),
    os.path.join(PUBLIC_ASSIST_IMAGE, 'banners'),
    os.path.join(PUBLIC_ASSIST_IMAGE, 'avatars'),
    os.path.join(PUBLIC_ASSIST_IMAGE, 'community'),
    os.path.join(PUBLIC_ASSIST_IMAGE, 'brand'),
]

for d in DIRS:
    os.makedirs(d, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 1000:
        print(f"Already exists: {target_path}")
        return True
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            if len(data) > 500:
                with open(target_path, 'wb') as f:
                    f.write(data)
                print(f"Downloaded: {target_path} ({len(data)} bytes)")
                return True
    except Exception as e:
        print(f"Download failed for {url}: {e}")
        return False

# Comprehensive Image Manifest
IMAGES = [
    # --- WOMEN'S JEWELLERY PRODUCTS ---
    # P06 Aafreen Chandbali
    ("products/P06_Aafreen_Chandbali_Product.jpg", "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"),
    ("models/P06_Aafreen_Chandbali_Model.jpg", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"),
    ("closeups/P06_Aafreen_Chandbali_Closeup.jpg", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"),

    # P07 Noor Jhumka
    ("products/P07_Noor_Jhumka_Product.jpg", "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80"),
    ("models/P07_Noor_Jhumka_Model.jpg", "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"),
    ("closeups/P07_Noor_Jhumka_Closeup.jpg", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"),

    # P08 Tara Emerald Drop
    ("products/P08_Tara_Emerald_Drop_Product.jpg", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"),
    ("models/P08_Tara_Emerald_Drop_Model.jpg", "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"),
    ("closeups/P08_Tara_Emerald_Drop_Closeup.jpg", "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80"),

    # P09 Sitara Stud
    ("products/P09_Sitara_Stud_Product.jpg", "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=800&q=80"),
    ("models/P09_Sitara_Stud_Model.jpg", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"),
    ("closeups/P09_Sitara_Stud_Closeup.jpg", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"),

    # P10 Gulnaar Hoop
    ("products/P10_Gulnaar_Hoop_Product.jpg", "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"),
    ("models/P10_Gulnaar_Hoop_Model.jpg", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"),
    ("closeups/P10_Gulnaar_Hoop_Closeup.jpg", "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80"),

    # P11 Celeste Ring
    ("products/P11_Celeste_Halo_Ring_Product.jpg", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"),
    ("models/P11_Celeste_Halo_Ring_Model.jpg", "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"),

    # P12 Aarohi Ring
    ("products/P12_Aarohi_Floral_Ring_Product.jpg", "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"),
    ("models/P12_Aarohi_Floral_Ring_Model.jpg", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"),

    # P13 Meera Bangle
    ("products/P13_Meera_Twisted_Bangle_Product.jpg", "https://images.unsplash.com/photo-1611591475103-4fa1b7765a7f?auto=format&fit=crop&w=800&q=80"),
    ("models/P13_Meera_Twisted_Bangle_Model.jpg", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"),

    # P14 Ziva Tennis Bracelet
    ("products/P14_Ziva_Tennis_Bracelet_Product.jpg", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"),
    ("models/P14_Ziva_Tennis_Bracelet_Model.jpg", "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"),

    # P15 Roshni Cuff
    ("products/P15_Roshni_Cuff_Bracelet_Product.jpg", "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80"),
    ("models/P15_Roshni_Cuff_Bracelet_Model.jpg", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"),

    # P16 Suhana Mangalsutra
    ("products/P16_Suhana_Mangalsutra_Product.jpg", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"),
    ("models/P16_Suhana_Mangalsutra_Model.jpg", "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"),

    # P17 Rajnandini Bridal Choker
    ("products/P17_Rajnandini_Bridal_Set_Product.jpg", "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"),
    ("models/P17_Rajnandini_Bridal_Set_Model.jpg", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"),

    # P18 Kashi Temple Bangles
    ("products/P18_Kashi_Temple_Bangles_Product.jpg", "https://images.unsplash.com/photo-1611591475103-4fa1b7765a7f?auto=format&fit=crop&w=800&q=80"),
    ("models/P18_Kashi_Temple_Bangles_Model.jpg", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"),

    # --- MEN'S COLLECTION PRODUCTS ---
    # P19 Veer Cuban Chain
    ("products/P19_Veer_Classic_Chain_Product.jpg", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"),
    ("models/P19_Veer_Classic_Chain_Model.jpg", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"),

    # P20 Arjun Rope Chain
    ("products/P20_Arjun_Rope_Chain_Product.jpg", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"),
    ("models/P20_Arjun_Rope_Chain_Model.jpg", "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"),

    # P21 Kabir Link Bracelet
    ("products/P21_Kabir_Link_Bracelet_Product.jpg", "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"),
    ("models/P21_Kabir_Link_Bracelet_Model.jpg", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"),

    # P22 Rudra Signet Ring
    ("products/P22_Rudra_Signet_Ring_Product.jpg", "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"),
    ("models/P22_Rudra_Signet_Ring_Model.jpg", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"),

    # P23 Samar Pendant Chain
    ("products/P23_Samar_Pendant_Chain_Product.jpg", "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80"),
    ("models/P23_Samar_Pendant_Chain_Model.jpg", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"),

    # P24 Ishan Cuff
    ("products/P24_Ishan_Cuff_Bracelet_Product.jpg", "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"),
    ("models/P24_Ishan_Cuff_Bracelet_Model.jpg", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"),

    # P25 Advay Band
    ("products/P25_Advay_Band_Ring_Product.jpg", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"),
    ("models/P25_Advay_Band_Ring_Model.jpg", "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"),

    # Gift Packaging
    ("products/03_Cart_Gift_Packaging.jpg", "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"),

    # --- CATEGORIES ---
    ("categories/women.jpg", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"),
    ("categories/men.jpg", "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"),
    ("categories/necklaces.jpg", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"),
    ("categories/earrings.jpg", "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"),
    ("categories/rings.jpg", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"),
    ("categories/bracelets.jpg", "https://images.unsplash.com/photo-1611591475103-4fa1b7765a7f?auto=format&fit=crop&w=800&q=80"),
    ("categories/pendants.jpg", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80"),
    ("categories/watches.jpg", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80"),
    ("categories/engagement.jpg", "https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=400&q=80"),

    # --- BANNERS ---
    ("banners/hero_banner.jpg", "https://images.unsplash.com/photo-1617059063772-34532796cdb5?auto=format&fit=crop&w=1200&q=85"),
    ("banners/hero_model_portrait.jpg", "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85"),
    ("banners/promo_bridal.jpg", "https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=1000&q=80"),
    ("banners/promo_everyday.jpg", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"),
    ("banners/story_craftsmanship.jpg", "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"),
    ("banners/newsletter_gift.jpg", "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"),

    # --- AVATARS (Testimonials) ---
    ("avatars/ananya_sharma.jpg", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"),
    ("avatars/vikramaditya_singh.jpg", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"),
    ("avatars/priya_mehta.jpg", "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"),
    ("avatars/rohan_kapoor.jpg", "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"),

    # --- COMMUNITY / INSTAGRAM ---
    ("community/post_1.jpg", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"),
    ("community/post_2.jpg", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"),
    ("community/post_3.jpg", "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"),
    ("community/post_4.jpg", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80"),
    ("community/post_5.jpg", "https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=600&q=80"),
    ("community/post_6.jpg", "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80"),
]

# Download all manifest files
for rel_path, url in IMAGES:
    dest = os.path.join(PUBLIC_ASSIST_IMAGE, rel_path)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    download_file(url, dest)

# Create Brand Assets (SVG)
BRAND_LOGO_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <circle cx="50" cy="50" r="48" stroke="#D4AF37" stroke-width="2" fill="#1C1814" />
  <path d="M50 14 L53 38 L77 41 L55 52 L62 76 L50 60 L38 76 L45 52 L23 41 L47 38 Z" fill="url(#goldGrad)" stroke="#B38B22" stroke-width="1"/>
  <circle cx="50" cy="50" r="10" stroke="#FFF8DC" stroke-width="1.5" fill="#2A2219" />
  <circle cx="50" cy="50" r="4" fill="#D4AF37" />
  <defs>
    <linearGradient id="goldGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FBF0B9"/>
      <stop offset="0.5" stop-color="#D4AF37"/>
      <stop offset="1" stop-color="#AA771C"/>
    </linearGradient>
  </defs>
</svg>"""

with open(os.path.join(PUBLIC_ASSIST_IMAGE, 'brand', 'swarnika_logo.svg'), 'w') as f:
    f.write(BRAND_LOGO_SVG)

# Exact Picture Name Aliases (Mapping user's exact filenames to product/model shots)
EXACT_FILENAME_MAPPINGS = [
    ("P06_Aafreen_Chandbali_Main_Preview.jpg", "products/P06_Aafreen_Chandbali_Product.jpg"),
    ("P06_Aafreen_Chandbali_Lifestyle_PREVIEW.jpg", "models/P06_Aafreen_Chandbali_Model.jpg"),
    ("P06_Aafreen_Chandbali_Closeup_PREVIEW.jpg", "closeups/P06_Aafreen_Chandbali_Closeup.jpg"),

    ("P07_Noor_Jhumka_Main_Preview.jpg", "products/P07_Noor_Jhumka_Product.jpg"),
    ("P07_Noor_Jhumka_Lifestyle_PREVIEW.jpg", "models/P07_Noor_Jhumka_Model.jpg"),
    ("P07_Noor_Jhumka_Closeup_PREVIEW.jpg", "closeups/P07_Noor_Jhumka_Closeup.jpg"),

    ("P08_Tara_Emerald_Drop_Main_Preview.jpg", "products/P08_Tara_Emerald_Drop_Product.jpg"),
    ("P08_Tara_Emerald_Drop_Lifestyle_PREVIEW.jpg", "models/P08_Tara_Emerald_Drop_Model.jpg"),
    ("P08_Tara_Emerald_Drop_Closeup_PREVIEW.jpg", "closeups/P08_Tara_Emerald_Drop_Closeup.jpg"),

    ("P09_Sitara_Stud_Main_Preview.jpg", "products/P09_Sitara_Stud_Product.jpg"),
    ("P09_Sitara_Stud_Lifestyle_PREVIEW.jpg", "models/P09_Sitara_Stud_Model.jpg"),
    ("P09_Sitara_Stud_Closeup_PREVIEW.jpg", "closeups/P09_Sitara_Stud_Closeup.jpg"),

    ("P10_Gulnaar_Hoop_Main_Preview.jpg", "products/P10_Gulnaar_Hoop_Product.jpg"),
    ("P10_Gulnaar_Hoop_Lifestyle_PREVIEW.jpg", "models/P10_Gulnaar_Hoop_Model.jpg"),
    ("P10_Gulnaar_Hoop_Closeup_PREVIEW.jpg", "closeups/P10_Gulnaar_Hoop_Closeup.jpg"),

    ("P11_Celeste_Halo_Ring_Main_PREVIEW.jpg", "products/P11_Celeste_Halo_Ring_Product.jpg"),
    ("P11_Celeste_Halo_Ring_Lifestyle_NOT_Alternate_PREVIEW.jpg", "models/P11_Celeste_Halo_Ring_Model.jpg"),

    ("P12_Aarohi_Floral_Ring_Main_PREVIEW.jpg", "products/P12_Aarohi_Floral_Ring_Product.jpg"),
    ("P12_Aarohi_Floral_Ring_Lifestyle_NOT_Alternate_PREVIEW.jpg", "models/P12_Aarohi_Floral_Ring_Model.jpg"),

    ("P13_Meera_Twisted_Bangle_Main_PREVIEW.jpg", "products/P13_Meera_Twisted_Bangle_Product.jpg"),
    ("P13_Meera_Twisted_Bangle_Lifestyle_NOT_Alternate_PREVIEW.jpg", "models/P13_Meera_Twisted_Bangle_Model.jpg"),

    ("P14_Ziva_Tennis_Bracelet_Main_PREVIEW.jpg", "products/P14_Ziva_Tennis_Bracelet_Product.jpg"),
    ("P14_Ziva_Tennis_Bracelet_Lifestyle_NOT_Alternate_PREVIEW.jpg", "models/P14_Ziva_Tennis_Bracelet_Model.jpg"),

    ("P15_Roshni_Cuff_Bracelet_Main_PREVIEW.jpg", "products/P15_Roshni_Cuff_Bracelet_Product.jpg"),
    ("P15_Roshni_Cuff_Bracelet_Lifestyle_NOT_Alternate_PREVIEW.jpg", "models/P15_Roshni_Cuff_Bracelet_Model.jpg"),

    ("P16_Suhana_Mangalsutra_Closeup_PREVIEW.jpg", "products/P16_Suhana_Mangalsutra_Product.jpg"),
    ("P16_Suhana_Mangalsutra_Wearing_PREVIEW.jpg", "models/P16_Suhana_Mangalsutra_Model.jpg"),

    ("P17_Rajnandini_Bridal_Set_Closeup_PREVIEW.jpg", "products/P17_Rajnandini_Bridal_Set_Product.jpg"),
    ("P17_Rajnandini_Bridal_Set_Wearing_PREVIEW.jpg", "models/P17_Rajnandini_Bridal_Set_Model.jpg"),

    ("P18_Kashi_Temple_Bangles_Closeup_PREVIEW.jpg", "products/P18_Kashi_Temple_Bangles_Product.jpg"),
    ("P18_Kashi_Temple_Bangles_Wearing_PREVIEW.jpg", "models/P18_Kashi_Temple_Bangles_Model.jpg"),

    ("P19_Veer_Classic_Chain_Closeup_PREVIEW.jpg", "products/P19_Veer_Classic_Chain_Product.jpg"),
    ("P19_Veer_Classic_Chain_Wearing_PREVIEW.jpg", "models/P19_Veer_Classic_Chain_Model.jpg"),

    ("P20_Arjun_Rope_Chain_Closeup_PREVIEW.jpg", "products/P20_Arjun_Rope_Chain_Product.jpg"),
    ("P20_Arjun_Rope_Chain_Wearing_PREVIEW.jpg", "models/P20_Arjun_Rope_Chain_Model.jpg"),

    ("P21_Kabir_Link_Bracelet_Product_Preview.jpg", "products/P21_Kabir_Link_Bracelet_Product.jpg"),
    ("P21_Kabir_Link_Bracelet_Wearing_Preview.jpg", "models/P21_Kabir_Link_Bracelet_Model.jpg"),

    ("P22_Rudra_Signet_Ring_Product_Preview.jpg", "products/P22_Rudra_Signet_Ring_Product.jpg"),
    ("P22_Rudra_Signet_Ring_Wearing_Preview.jpg", "models/P22_Rudra_Signet_Ring_Model.jpg"),

    ("P23_Samar_Pendant_Chain_Product_Preview.jpg", "products/P23_Samar_Pendant_Chain_Product.jpg"),
    ("P23_Samar_Pendant_Chain_Wearing_Preview.jpg", "models/P23_Samar_Pendant_Chain_Model.jpg"),

    ("P24_Ishan_Cuff_Bracelet_Product_Preview.jpg", "products/P24_Ishan_Cuff_Bracelet_Product.jpg"),
    ("P24_Ishan_Cuff_Bracelet_Wearing_Preview.jpg", "models/P24_Ishan_Cuff_Bracelet_Model.jpg"),

    ("P25_Advay_Band_Ring_Product_Preview.jpg", "products/P25_Advay_Band_Ring_Product.jpg"),
    ("P25_Advay_Band_Ring_Wearing_Preview.jpg", "models/P25_Advay_Band_Ring_Model.jpg"),

    ("03_Cart_Gift_Packaging.jpg", "products/03_Cart_Gift_Packaging.jpg"),
]

# Create hardlinks or copies so that /assist/image/<exact_picture_name> ALSO resolves directly
for flat_name, target_rel in EXACT_FILENAME_MAPPINGS:
    source_full = os.path.join(PUBLIC_ASSIST_IMAGE, target_rel)
    flat_full = os.path.join(PUBLIC_ASSIST_IMAGE, flat_name)
    if os.path.exists(source_full):
        shutil.copy2(source_full, flat_full)

# Also sync public-assist-image folder at project root!
if os.path.islink(PUBLIC_ASSIST_IMAGE_ROOT):
    os.unlink(PUBLIC_ASSIST_IMAGE_ROOT)
elif os.path.isdir(PUBLIC_ASSIST_IMAGE_ROOT):
    shutil.rmtree(PUBLIC_ASSIST_IMAGE_ROOT)

# Copy complete structure to public-assist-image
shutil.copytree(PUBLIC_ASSIST_IMAGE, PUBLIC_ASSIST_IMAGE_ROOT)

# Also ensure inside public/ we have symlinks for:
# 1. public/public/assist/image -> public/assist/image
# 2. public/public-assist-image -> assist/image
# 3. public/images -> assist/image
PUBLIC_DIR = os.path.join(BASE_DIR, 'public')
os.makedirs(os.path.join(PUBLIC_DIR, 'public', 'assist'), exist_ok=True)
public_nested_target = os.path.join(PUBLIC_DIR, 'public', 'assist', 'image')
if not os.path.exists(public_nested_target):
    os.symlink('../../assist/image', public_nested_target)

public_assist_in_public = os.path.join(PUBLIC_DIR, 'public-assist-image')
if not os.path.exists(public_assist_in_public):
    os.symlink('assist/image', public_assist_in_public)

images_in_public = os.path.join(PUBLIC_DIR, 'images')
if os.path.islink(images_in_public):
    os.unlink(images_in_public)
elif os.path.isdir(images_in_public):
    shutil.rmtree(images_in_public)
os.symlink('assist/image', images_in_public)

print("Consolidation and organization complete!")
