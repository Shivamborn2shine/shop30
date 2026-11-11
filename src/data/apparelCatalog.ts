import { ApparelItem, HighlightGroup } from '../types';

export const APPAREL_CATALOG: ApparelItem[] = [
  // Outerwear & Jackets
  { id: 'leather_biker_jacket', name: "Leather Biker Jacket", category: "OUTERWEAR", icon: "🧥", defaultPicked: true },
  { id: 'monogram_puffer_jacket', name: "Monogram Puffer Jacket", category: "OUTERWEAR", icon: "🧥", defaultPicked: true },
  { id: 'distressed_zip_jacket', name: "Distressed Zip Jacket", category: "OUTERWEAR", icon: "🧥" },
  { id: 'checkered_fleece_zip_up', name: "Checkered Fleece Zip-Up", category: "OUTERWEAR", icon: "🧥" },
  { id: 'corduroy_overshirt', name: "Corduroy Overshirt", category: "OUTERWEAR", icon: "🧥" },
  { id: 'toggle_closure_jacket', name: "Toggle Closure Jacket", category: "OUTERWEAR", icon: "🧥" },

  // Tops & Sweatshirts
  { id: 'pink_graphic_sweatshirt', name: "Pink Graphic Sweatshirt", category: "TOPS", icon: "👕", defaultPicked: true },
  { id: 'export_surplus_tee', name: "Export Surplus Branded Tee", category: "TOPS", icon: "👕" },
  { id: 'acid_wash_street_tee', name: "Acid Wash Street Tee", category: "TOPS", icon: "👕" },
  { id: 'heavyweight_hoodie', name: "Heavyweight Boxy Hoodie", category: "TOPS", icon: "👕" },
  { id: 'drop_shoulder_tee', name: "Drop-Shoulder Street Tee", category: "TOPS", icon: "👕" },

  // Bottoms & Denims
  { id: 'international_jeans', name: "International Brand Jeans", category: "BOTTOMS", icon: "👖", defaultPicked: true },
  { id: 'baggy_cargos', name: "Baggy Utility Cargos", category: "BOTTOMS", icon: "👖" },
  { id: 'relaxed_track_pants', name: "Relaxed Track Pants", category: "BOTTOMS", icon: "👖" },
  { id: 'stacked_denims', name: "Stacked Denim Jeans", category: "BOTTOMS", icon: "👖" },

  // Girls Wear
  { id: 'girls_hoodies', name: "Girls Streetwear Hoodies", category: "GIRLS", icon: "✨" },
  { id: 'girls_oversized_tops', name: "Girls Oversized Tops", category: "GIRLS", icon: "✨" },
  { id: 'girls_flared_denims', name: "Girls Flared Denims", category: "GIRLS", icon: "✨" },
  { id: 'girls_winter_jackets', name: "Girls Winter Crop Jackets", category: "GIRLS", icon: "✨" }
];

export const APPAREL_HIGHLIGHT_LIBRARY: Record<string, HighlightGroup> = {
  "Leather Biker Jacket": {
    title: "Leather Jacket Highlights",
    icon: "🧥",
    highlights: [
      "Solid Hardware & Heavy Zippers",
      "Authentic Textured Leather Feel",
      "Structured Shoulder Cut",
      "Warm Inner Lining",
      "Great Value Compared to Retail",
      "Timeless Biker Aesthetic"
    ]
  },
  "Monogram Puffer Jacket": {
    title: "Monogram Puffer Highlights",
    icon: "🧥",
    highlights: [
      "Super Warm & Insulated",
      "Luxury Monogram Pattern",
      "Comfortable High Collar",
      "High Quality Outer Shell",
      "Perfect for Dehradun Winters"
    ]
  },
  "Distressed Zip Jacket": {
    title: "Distressed Jacket Highlights",
    icon: "🧥",
    highlights: [
      "Heavyweight Fabric",
      "Authentic Distressed Wash",
      "Sturdy Metal Zipper",
      "Trendy Streetwear Fit"
    ]
  },
  "Corduroy Overshirt": {
    title: "Corduroy Shacket Highlights",
    icon: "🧥",
    highlights: [
      "Soft Ribbed Corduroy",
      "Versatile Layering Piece",
      "Durable Buttons",
      "Clean Stitching & Cut"
    ]
  },
  "Pink Graphic Sweatshirt": {
    title: "Graphic Sweatshirt Highlights",
    icon: "👕",
    highlights: [
      "Cozy Fleece Interior",
      "Vibrant Streetwear Print",
      "Relaxed Drop Shoulder",
      "Durable Ribbed Hem & Cuffs",
      "Great for Both Boys & Girls"
    ]
  },
  "Export Surplus Branded Tee": {
    title: "Export Surplus Tee Highlights",
    icon: "👕",
    highlights: [
      "100% Combed Heavy Cotton",
      "Original International Brand Tagging",
      "Color Doesn't Fade After Wash",
      "Comfortable Collar Fit",
      "Fraction of Original Showroom Price"
    ]
  },
  "International Brand Jeans": {
    title: "Denims Highlights",
    icon: "👖",
    highlights: [
      "Substantial Denim Weight",
      "Authentic Brand Wash",
      "Comfortable Waist Fit",
      "Durable Rivets & Stitching",
      "Great Baggy / Straight Cut"
    ]
  },
  "Baggy Utility Cargos": {
    title: "Utility Cargos Highlights",
    icon: "👖",
    highlights: [
      "Functional Deep Pockets",
      "Perfect Ankle Stacking",
      "Heavy Cotton Twill",
      "Comfortable All-Day Wear"
    ]
  }
};

export const UNIVERSAL_STORE_HIGHLIGHTS: string[] = [
  "Chill & Helpful Staff",
  "Zero Pushy Sales Pressure",
  "Huge Variety of International Brands",
  "Best Surplus Rates in Indira Market",
  "Clean Garment Racks",
  "Spacious Trial Room Facility",
  "Both Boys & Girls Wear Available",
  "Will Definitely Shop Again"
];

