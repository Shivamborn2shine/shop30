export interface CategoryDetail {
  id: string;
  title: string;
  singular: string;
  plural: string;
  keywords: string[];
}

export interface ReviewOptionGroup {
  id: string;
  label: string;
  vibePill: string;
}

export const REVIEW_STANDOUT_PILLS: string[] = [
  'Fabric quality',
  'Great prices',
  'Perfect fit',
  'Latest styles',
  'Polite & helpful staff',
  'Export surplus variety',
  'Trendy streetwear',
  'Value for money',
];

// Rich, nuanced review generators segmented by category, selected vibes, language, and tone variations
export const REVIEW_TEMPLATES = {
  // English Options
  EN: {
    // Specific to Jackets & Puffers
    jackets: [
      (v1: string, v2: string) => `Found an awesome jacket at Vice City in Indira Market. Loved the ${v1} and ${v2}. Truly the best spot for winter streetwear in Dehradun!`,
      (v1: string, v2: string) => `Picked up a heavy quality puffer and jacket from Vice City. The ${v1} is top tier and ${v2} is unmatched for surplus pricing.`,
      (v1: string, v2: string) => `Vice City has the best outerwear collection in Indira Market. Loved their jackets — especially the ${v1} and ${v2}. 10/10 recommendation!`,
      (v1: string, v2: string) => `Great shopping experience at Vice City! Checked out their winter jackets & puffers, and the ${v1} as well as ${v2} really stood out.`,
      (v1: string, v2: string) => `Super clean finish and premium leather/puffer jackets at Vice City. Impressed by the ${v1} and ${v2}. Will definitely visit again.`
    ],

    // Specific to Tees & Sweatshirts
    tees: [
      (v1: string, v2: string) => `Checked out tees and sweatshirts at Vice City, Shop 30 Indira Market. The ${v1} and ${v2} made it totally worth it!`,
      (v1: string, v2: string) => `Picked up oversized graphic tees & sweatshirts from Vice City. Loved the ${v1} and ${v2}. Solid streetwear vibes!`,
      (v1: string, v2: string) => `Vice City is easily the top export surplus store in Dehradun for branded tees. The ${v1} is unbeatable, plus ${v2}.`,
      (v1: string, v2: string) => `Really happy with the drop shoulder crewnecks and tees at Vice City. Appreciated the ${v1} and ${v2}. Highly recommended!`,
      (v1: string, v2: string) => `Fresh collection of international tees and fleeces at Vice City. The ${v1} and ${v2} are genuinely unmatched in Indira Market.`
    ],

    // Specific to Denims & Cargos
    denim: [
      (v1: string, v2: string) => `Got a pair of cargos and denims from Vice City. The ${v1} and ${v2} are fantastic. Sizing and trial was super easy!`,
      (v1: string, v2: string) => `Vice City has high-grade surplus denims & utility cargos. Loved the ${v1} and ${v2}. Genuine international brand quality.`,
      (v1: string, v2: string) => `Found the perfect fit baggy denims and cargos at Vice City in Indira Market. The ${v1} and ${v2} really impressed me!`,
      (v1: string, v2: string) => `Top destination for denim shopping in Dehradun. Checked out Vice City and their ${v1} combined with ${v2} made my day.`,
      (v1: string, v2: string) => `Great cut and stitch on their denim collection at Vice City. Special mention for the ${v1} and ${v2}. Worth every rupee!`
    ],

    // Specific to Girls Wear
    girls: [
      (v1: string, v2: string) => `Loved the girls streetwear & sweatshirt collection at Vice City! The ${v1} and ${v2} are top-notch.`,
      (v1: string, v2: string) => `Vice City in Indira Market has really cute and chic export surplus wear for girls. Loved the ${v1} and ${v2}!`,
      (v1: string, v2: string) => `Found amazing crop crewnecks and jackets at Vice City. The ${v1} stood out, and ${v2} made it a great shopping experience!`,
      (v1: string, v2: string) => `Must visit shop for girls streetwear in Dehradun. Picked up winter wear from Vice City — loved the ${v1} and ${v2}.`,
      (v1: string, v2: string) => `Super aesthetic apparel and cozy winter pieces at Vice City. The ${v1} and ${v2} were both 10/10!`
    ],

    // Multi-category or general combos
    multi: [
      (items: string, v1: string, v2: string) => `Visited Vice City in Indira Market and picked up ${items}. The ${v1} and ${v2} are simply outstanding!`,
      (items: string, v1: string, v2: string) => `Vice City is by far one of the best export surplus brand stores in Dehradun. Explored their ${items} — loved the ${v1} and ${v2}.`,
      (items: string, v1: string, v2: string) => `Great shopping haul from Vice City today! Found authentic ${items} with top ${v1} and ${v2}. Five stars!`,
      (items: string, v1: string, v2: string) => `If you want genuine international surplus in Dehradun, go to Vice City (Shop 30). Picked up ${items}, super happy with the ${v1} and ${v2}.`,
      (items: string, v1: string, v2: string) => `Loved exploring ${items} at Vice City. Spotless store, honest pricing, and the ${v1} alongside ${v2} made it worth visiting.`
    ]
  },

  // Hinglish Options
  HI: {
    jackets: [
      (v1: string, v2: string) => `Vice City (Indira Market) se winter jacket aur puffer liya. Inka ${v1} aur ${v2} sach me Dehradun me sabse best hai!`,
      (v1: string, v2: string) => `Heavy quality export surplus jacket mila Vice City pe. ${v1} ek number hai aur ${v2} bhi bilkul genuine. Must visit store!`,
      (v1: string, v2: string) => `Indira Market me jackets ke liye Vice City se best koi shop nahi hai. Loved the ${v1} & ${v2}. 10/10 recommendation!`,
      (v1: string, v2: string) => `Vice City ka jacket collection bohot fresh hai! Inka ${v1} aur ${v2} dekh ke maza aa gaya. Full paisa vasool shop.`,
      (v1: string, v2: string) => `Designer puffer aur leather jacket try kiya Vice City pe. Sizing perfect aayi aur ${v1} ke saath ${v2} bhi zabardast hai.`
    ],

    tees: [
      (v1: string, v2: string) => `Vice City Shop 30 se tees and sweatshirts shopping ki. Inka ${v1} aur ${v2} bohot badhiya laga!`,
      (v1: string, v2: string) => `Best streetwear collection in Indira Market! Branded oversized t-shirts aur sweats mile. Loved the ${v1} and ${v2}.`,
      (v1: string, v2: string) => `Indira Market Dehradun me genuine surplus tees chahiye toh Vice City jao. ${v1} top class hai aur ${v2} bhi sahi mila!`,
      (v1: string, v2: string) => `Vice City ke sweatshirts ka print aur fabric dono premium hain. Loved the ${v1} and ${v2}. Definitely coming back!`,
      (v1: string, v2: string) => `Acha experience raha Vice City me. Branded crewneck liya aur ${v1} ke saath ${v2} bhi bohot pasand aaya.`
    ],

    denim: [
      (v1: string, v2: string) => `Vice City se cargos aur baggy denims liye. Inka ${v1} aur ${v2} dono ekdum solid hain!`,
      (v1: string, v2: string) => `Dehradun me genuine branded denim & cargos dhoond rahe ho toh Vice City best jagah hai. Loved the ${v1} and ${v2}.`,
      (v1: string, v2: string) => `Vice City Indira Market me pants aur denim ki fit aur variety bohot sahi hai. ${v1} aur ${v2} dono 10/10!`,
      (v1: string, v2: string) => `Super comfortable fit and heavy stitch denims. Vice City ka ${v1} aur ${v2} sach me standout karta hai.`,
      (v1: string, v2: string) => `Cargos ki fitting aur pockets bohot stylish hain. Loved the ${v1} along with ${v2} at Vice City!`
    ],

    girls: [
      (v1: string, v2: string) => `Vice City pe girls streetwear aur winter collection bohot sundar hai! Loved the ${v1} and ${v2}.`,
      (v1: string, v2: string) => `Indira Market me girls wear ke liye Vice City must-visit hai. Cute crop sweatshirts mile, aur ${v1} ke saath ${v2} bhi mast tha!`,
      (v1: string, v2: string) => `Vice City ka collection bohot trendy hai. Girls outfits me ${v1} aur ${v2} dono kaafi accha laga. Highly recommended!`,
      (v1: string, v2: string) => `Shopping experience at Vice City was super smooth. Girls apparel me inka ${v1} aur ${v2} truly best hai!`,
      (v1: string, v2: string) => `Bohot fresh and unique export surplus options hain girls ke liye. Loved the ${v1} & ${v2} at Vice City.`
    ],

    multi: [
      (items: string, v1: string, v2: string) => `Vice City (Shop 30, Indira Market) se ${items} liya. Inka ${v1} aur ${v2} sach me lajawab hai!`,
      (items: string, v1: string, v2: string) => `Dehradun me best export surplus shop hai Vice City. ${items} ka collection aur inka ${v1} & ${v2} best laga!`,
      (items: string, v1: string, v2: string) => `Bohot sahi shopping rahi Vice City pe. ${items} ki quality zabardast hai, especially the ${v1} aur ${v2}. Highly recommended!`,
      (items: string, v1: string, v2: string) => `Indira Market Rajpur Road pe Vice City ek must-visit store hai. ${items} me inka ${v1} aur ${v2} dono top notch hai!`,
      (items: string, v1: string, v2: string) => `Genuine branded readymade garments for boys & girls. Picked up ${items} at Vice City, loved the ${v1} and ${v2}!`
    ]
  }
};
