export type ShoppingIntent = 'BOUGHT' | 'TRIED_ON' | 'BROWSED' | 'EXPLORE';

export type ApparelCategory = 'ALL' | 'OUTERWEAR' | 'TOPS' | 'BOTTOMS' | 'GIRLS';

export interface ApparelItem {
  id: string;
  name: string;
  category: ApparelCategory;
  icon: string;
  defaultPicked?: boolean;
}

export interface HighlightGroup {
  title: string;
  icon: string;
  highlights: string[];
}

export type ReviewLength = 'SHORT' | 'BALANCED' | 'DETAILED';
export type ReviewLanguage = 'ENGLISH' | 'HINGLISH';

export interface Testimonial {
  name: string;
  text: string;
  stars: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface StoreConfig {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  categorySubtitle: string;
  address: string;
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    mapsUrl: string;
  };
  whatsappCatalogueStatus: string;
  whatsappCatalogueUrl: string;
  reviews: {
    writeReviewUrl: string;
    placeId: string;
    cid: string;
    rating: number;
    count: string;
  };
  links: {
    googleReviewUrl: string;
    googleMapsUrl: string;
    instagramUrl: string;
  };
}

