import { Leaf, Award, Truck, Heart } from 'lucide-react';

export interface Flavor {
  id: string;
  name: string;
  description: string;
  color: string;
  bg: string;
  icon: string;
  price: string;
  category: string;
}

export const flavors: Flavor[] = [
  {
    id: 'belgian-chocolate',
    name: 'Belgian Chocolate',
    description: 'Rich, velvety chocolate made from premium Belgian cocoa beans',
    color: 'from-chocolate to-caramel',
    bg: 'bg-amber-50',
    icon: '🍫',
    price: '$4.99',
    category: 'Chocolate'
  },
  {
    id: 'strawberry-bliss',
    name: 'Strawberry Bliss',
    description: 'Fresh strawberries blended into a creamy, dreamy delight',
    color: 'from-strawberry to-warm-pink',
    bg: 'bg-pink-50',
    icon: '🍓',
    price: '$4.99',
    category: 'Fruity'
  },
  {
    id: 'vanilla-dream',
    name: 'Vanilla Dream',
    description: 'Madagascar vanilla beans in the smoothest base imaginable',
    color: 'from-caramel to-lemon',
    bg: 'bg-yellow-50',
    icon: '🍦',
    price: '$4.49',
    category: 'Classic'
  },
  {
    id: 'mint-choco-chip',
    name: 'Mint Choco Chip',
    description: 'Cool peppermint with dark chocolate chips throughout',
    color: 'from-mint to-pistachio',
    bg: 'bg-emerald-50',
    icon: '🌿',
    price: '$5.49',
    category: 'Chocolate'
  },
  {
    id: 'blueberry-swirl',
    name: 'Blueberry Swirl',
    description: 'Wild blueberries swirled into a luscious cream base',
    color: 'from-blueberry to-sky-light',
    bg: 'bg-blue-50',
    icon: '🫐',
    price: '$5.49',
    category: 'Fruity'
  },
  {
    id: 'pistachio-royale',
    name: 'Pistachio Royale',
    description: 'Authentic Sicilian pistachios ground into nutty perfection',
    color: 'from-pistachio to-mint',
    bg: 'bg-green-50',
    icon: '🥜',
    price: '$5.99',
    category: 'Nutty'
  },
  {
    id: 'mango-sorbet',
    name: 'Mango Sorbet',
    description: 'Alphonso mangoes turned into a refreshing tropical sorbet',
    color: 'from-caramel to-peach',
    bg: 'bg-orange-50',
    icon: '🥭',
    price: '$4.99',
    category: 'Fruity'
  },
  {
    id: 'salted-caramel',
    name: 'Salted Caramel',
    description: 'Buttery caramel with a hint of sea salt, utterly addictive',
    color: 'from-caramel to-chocolate',
    bg: 'bg-amber-50',
    icon: '🧂',
    price: '$5.49',
    category: 'Classic'
  },
];

export const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'The best ice cream I have ever tasted! The Belgian Chocolate is absolutely divine. My family visits every weekend now.',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Rahul Verma',
    text: 'Fresh ingredients, amazing flavors, and the staff is so friendly. The Mango Sorbet reminds me of my childhood summers.',
    rating: 5,
    avatar: 'RV',
  },
  {
    name: 'Ananya Patel',
    text: 'I am obsessed with their Salted Caramel. Perfectly balanced sweetness with that hint of salt. Pure genius!',
    rating: 5,
    avatar: 'AP',
  },
];

export const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'No artificial colors, flavors, or preservatives. Just pure, wholesome ingredients.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized as the best artisan ice cream three years running.',
  },
  {
    icon: Truck,
    title: 'Fresh Daily',
    description: 'Small-batch production ensures every scoop is fresh and flavorful.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every flavor is crafted with passion by our master ice cream makers.',
  },
];
