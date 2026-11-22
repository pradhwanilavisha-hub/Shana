export type GarmentCategory =
  | 'Crop Tops'
  | 'Garara'
  | 'Sharara'
  | 'Gowns'
  | 'Ready-Made Garments';

export interface BoutiqueItem {
  id: string;
  category: GarmentCategory;
  image: string;
  alt: string;
}

export const BUSINESS_INFO = {
  name: "Shana's Boutique",
  category: "Women's Ready-Made Clothing Boutique",
  city: 'Siliguri',
  address:
    '1st Floor, Sree Bhawan, Market Complex, Hill Cart Road, Siliguri, West Bengal 734001, India',
  shortAddress: 'Hill Cart Road, Siliguri',
  phoneDisplay: '+91 98324 99488',
  phoneHref: 'tel:+919832499488',
  whatsappHref: 'https://wa.me/919832499488',
} as const;

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_boutique_siliguri_1795332821299.jpg',
  alt: "Women's ready-made fashion ensemble at Shana's Boutique in Siliguri",
} as const;

export const ATELIER_IMAGE = {
  src: '/src/assets/images/boutique_atelier_editorial_1795332823089.jpg',
  alt: "Interior garment display at Shana's Boutique, Siliguri",
} as const;

export const CATEGORIES: readonly ('All' | GarmentCategory)[] = [
  'All',
  'Crop Tops',
  'Garara',
  'Sharara',
  'Gowns',
  'Ready-Made Garments',
] as const;

export const CATALOG_ITEMS: readonly BoutiqueItem[] = [
  {
    id: 'item-crop-tops',
    category: 'Crop Tops',
    image: '/src/assets/images/garment_crop_top_1795332821261.jpg',
    alt: "Women's ready-made crop top ensemble at Shana's Boutique",
  },
  {
    id: 'item-garara',
    category: 'Garara',
    image: '/src/assets/images/garment_garara_1795332823434.jpg',
    alt: "Women's ready-made garara ensemble at Shana's Boutique",
  },
  {
    id: 'item-sharara',
    category: 'Sharara',
    image: '/src/assets/images/garment_sharara_1795332823077.jpg',
    alt: "Women's ready-made sharara ensemble at Shana's Boutique",
  },
  {
    id: 'item-gowns',
    category: 'Gowns',
    image: '/src/assets/images/garment_gown_1795332823190.jpg',
    alt: "Women's ready-made gown at Shana's Boutique",
  },
  {
    id: 'item-ready-made-1',
    category: 'Ready-Made Garments',
    image: '/src/assets/images/hero_boutique_siliguri_1795332821299.jpg',
    alt: "Women's ready-made fashion clothing at Shana's Boutique",
  },
  {
    id: 'item-ready-made-2',
    category: 'Ready-Made Garments',
    image: '/src/assets/images/boutique_atelier_editorial_1795332823089.jpg',
    alt: "Ready-made women's garments showcase at Shana's Boutique",
  },
] as const;

export const FEATURED_COLLECTIONS: readonly {
  category: GarmentCategory;
  image: string;
  alt: string;
}[] = [
  {
    category: 'Garara',
    image: '/src/assets/images/garment_garara_1795332823434.jpg',
    alt: "Garara collection at Shana's Boutique",
  },
  {
    category: 'Sharara',
    image: '/src/assets/images/garment_sharara_1795332823077.jpg',
    alt: "Sharara collection at Shana's Boutique",
  },
  {
    category: 'Gowns',
    image: '/src/assets/images/garment_gown_1795332823190.jpg',
    alt: "Gowns collection at Shana's Boutique",
  },
  {
    category: 'Crop Tops',
    image: '/src/assets/images/garment_crop_top_1795332821261.jpg',
    alt: "Crop Tops collection at Shana's Boutique",
  },
] as const;
