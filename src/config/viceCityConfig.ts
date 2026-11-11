export const VICE_CITY_CONFIG = {
  businessName: 'VICE CITY',
  tagline: 'Export Surplus, International Brands Readymade Garments for boys & girls',
  shortTagline: 'Export Surplus • Boys & Girls',
  category: 'Clothing store',
  address: 'Shop no. 30, Rajpur Road, Indira Market, Dehradun, Uttarakhand 248001',
  shortAddress: 'Shop No. 30, Indira Market, Rajpur Road, Dehradun',
  phoneDisplay: '97604 41031',
  phoneRaw: '+919760441031',
  whatsappNumber: '919760441031',
  placeId: 'ChIJ_ejfCQApCTkRwxAknRh6aUU',
  cid: '5001663107305836739',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ_ejfCQApCTkRwxAknRh6aUU',
  mapsUrl: 'https://www.google.com/maps?cid=5001663107305836739',
};

export interface FeaturedDropItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  category: string;
}

export const FEATURED_DROPS: FeaturedDropItem[] = [
  {
    id: 'monogram-puffer',
    title: 'Designer Puffer Jacket',
    subtitle: 'Warm winter fill & luxury finish',
    tag: 'MONOGRAM PUFFER',
    image: 'assets/images/ViceCity/drop_02_monogram_puffer.jpg',
    category: 'jackets',
  },
  {
    id: 'leather-clasp-jacket',
    title: 'Clasp Leather Jacket',
    subtitle: 'Heavy grain finish & metal clasps',
    tag: 'CLASP LEATHER',
    image: 'assets/images/ViceCity/drop_03_leather_clasp_jacket.jpg',
    category: 'jackets',
  },
  {
    id: 'magenta-graphic-sweatshirt',
    title: 'Graphic Street Crewneck',
    subtitle: 'Heavy fleece cotton & drop shoulder',
    tag: 'GRAPHIC SWEAT',
    image: 'assets/images/ViceCity/drop_01_magenta_sweatshirt.jpg',
    category: 'girls',
  },
  {
    id: 'espresso-latch-jacket',
    title: 'Espresso Latch Jacket',
    subtitle: 'Structured collar & silver latches',
    tag: 'LUXURY LEATHER',
    image: 'assets/images/ViceCity/drop_04_espresso_latch_jacket.jpg',
    category: 'jackets',
  },
  {
    id: 'white-corduroy-overshirt',
    title: 'White Corduroy Shacket',
    subtitle: 'Textured overshirt for boys/girls',
    tag: 'CORDUROY',
    image: 'assets/images/ViceCity/05_White_Corduroy_Overshirt_Pink_Tee.jpg',
    category: 'tees',
  },
  {
    id: 'grey-distressed-zip',
    title: 'Grey Distressed Jacket',
    subtitle: 'Heavy zipper & acid wash tone',
    tag: 'DISTRESSED ZIP',
    image: 'assets/images/ViceCity/07_Grey_Distressed_Zip_Jacket.jpg',
    category: 'jackets',
  },
];

export interface GalleryPhoto {
  src: string;
  alt: string;
  label: string;
}

export const STORE_GALLERY: GalleryPhoto[] = [
  {
    src: 'assets/images/ViceCity/00_Storefront_Entrance.jpg',
    alt: 'Vice City Storefront at Indira Market',
    label: 'Storefront',
  },
  {
    src: 'assets/images/ViceCity/01_Store_Interior_Staircase.jpg',
    alt: 'Inside Vice City Store & Staircase',
    label: 'Inside Vice City',
  },
  {
    src: 'assets/images/ViceCity/02_Outerwear_Display.jpg',
    alt: 'Outerwear & Winter Jackets Display',
    label: 'Jackets Display',
  },
  {
    src: 'assets/images/ViceCity/03_Black_Zip_Jacket_Mannequin.jpg',
    alt: 'Black Zip Jacket on Mannequin',
    label: 'Streetwear Fit',
  },
  {
    src: 'assets/images/ViceCity/drop_01_magenta_sweatshirt.jpg',
    alt: 'Magenta Graphic Sweatshirt Drop',
    label: 'Graphic Crewneck',
  },
  {
    src: 'assets/images/ViceCity/05_White_Corduroy_Overshirt_Pink_Tee.jpg',
    alt: 'White Corduroy Shacket & Pink Tee',
    label: 'Corduroy Combo',
  },
  {
    src: 'assets/images/ViceCity/drop_02_monogram_puffer.jpg',
    alt: 'Brown Monogram Puffer Jacket',
    label: 'Monogram Puffer',
  },
  {
    src: 'assets/images/ViceCity/09_Store_Outerwear_Wall.jpg',
    alt: 'Full Wall of Export Surplus Racks',
    label: 'Surplus Wall',
  },
];
