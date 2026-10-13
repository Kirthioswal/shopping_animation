// All words on the story stage. Copy marked "live" is taken from jiffy.world
// (including the text baked into its feature/step images); the rest is sample
// advertising copy written in the same voice.

export const SIGNUP_URL = "https://my.jiffy.world/signup";
export const LOGIN_URL = "https://my.jiffy.world/login";

export interface CopyBlockData {
  id: string;
  eyebrow: string;
  title: [string, string]; // second line is highlighted in orange
  body?: string;
  chips?: string[];
  cta?: boolean;
}

// Center-column blocks that scroll up while the side lanes animate.
export const COPY: Record<string, CopyBlockData> = {
  crew: {
    id: "crew",
    eyebrow: "Order confirmed",
    title: ["Your Logistics Crew,", "Always On Duty."], // live
    body: "From scanning to shipping, Jiffy's smart team works round the clock to make logistics effortless.", // live
    chips: ["Scan", "Pack", "Ship"],
  },
  packed: {
    id: "packed",
    eyebrow: "At the dark store",
    title: ["Packed with care.", "Sealed for speed."],
    body: "Every order is picked, packed and labelled at the dark store nearest your customer, minutes after it's placed.",
    chips: ["Picked", "Packed", "Labelled"],
  },
  pickup: {
    id: "pickup",
    eyebrow: "Courier assigned",
    title: ["Picked up", "in minutes."],
    body: "Jiffy auto-assigns the fastest courier or delivery partner to get your products to the doorstep in record time.", // live (step 4)
    chips: ["Auto-assigned", "Live GPS"],
  },
  darkstores: {
    id: "darkstores",
    eyebrow: "Smart dark stores",
    title: ["Inventory that lives", "next door."],
    body: "Keep your inventory close to customers. Jiffy's network of smart dark stores ensures products are always available nearby.", // live (step 3)
    chips: ["30-min delivery", "24/7 operations", "Always stocked"],
  },
  air: {
    id: "air",
    eyebrow: "Express air lanes",
    title: ["City to city,", "without the wait."],
    body: "When your next drop needs to cross the country, express air cargo gets it to the destination hub before your customers even ask.",
    chips: ["Cross-region", "No bottlenecks"],
  },
  lastmile: {
    id: "lastmile",
    eyebrow: "Out for delivery",
    title: ["The final mile,", "handled."],
    body: "Local partners verify every address and sprint to the doorstep while you and your customer watch it live.",
    chips: ["Verified drop", "Live tracking"],
  },
  cta: {
    id: "cta",
    eyebrow: "Delivered in a Jiffy",
    title: ["Start delivering", "in a Jiffy."],
    body: "Sign up, connect your store, choose your preferred courier partners, and start shipping instantly with Jiffy.", // live (FAQ)
    cta: true,
  },
};

export type ArtKey =
  | "stopwatch"
  | "city"
  | "growth"
  | "crew"
  | "integrations"
  | "dashboard"
  | "couriers"
  | "tracking"
  | "rates"
  | "signup"
  | "connect"
  | "darkstore"
  | "van"
  | "monitor";

export interface FeatureCardData {
  eyebrow: string;
  title: string;
  sub?: string;
  body: string;
  art: ArtKey;
  tone: "violet" | "blue" | "amber" | "orange" | "teal" | "pink";
}

export const SHOWCASES: { id: string; label: string; cards: FeatureCardData[] }[] = [
  {
    id: "why",
    label: "Why Jiffy",
    cards: [
      {
        eyebrow: "Why Jiffy · 01",
        title: "Jiffy, schedule 30-minute deliveries for me", // live
        sub: "Blink and it's there", // live
        body: "Why wait days when your customers want it now? Jiffy ensures 30-minute doorstep deliveries so your brand never misses a beat.", // live
        art: "stopwatch",
        tone: "violet",
      },
      {
        eyebrow: "Why Jiffy · 02",
        title: "Closer than you think.", // live
        body: "With a network of smart dark stores in major cities, we keep your products stocked near your customers, making instant commerce truly instant.", // live
        art: "city",
        tone: "blue",
      },
      {
        eyebrow: "Why Jiffy · 03",
        title: "From 10 orders to 10,000, we got you.", // live
        body: "Whether you're a growing D2C brand or already a household name, Jiffy flexes with your business so you can ship more, stress less.", // live
        art: "growth",
        tone: "amber",
      },
      {
        eyebrow: "Why Jiffy · 04",
        title: "Your logistics crew, always on duty.", // live
        body: "From scanning to shipping, Jiffy's smart team works round the clock to make logistics effortless.", // live
        art: "crew",
        tone: "orange",
      },
    ],
  },
  {
    id: "platform",
    label: "The platform",
    cards: [
      {
        eyebrow: "Platform · 01",
        title: "Integrates with your favorite tools.", // live
        body: "Streamline business processes by bringing your favorite tools and AI helpers together. Amazon, Flipkart, Shopify, Myntra, Meesho and more.", // live
        art: "integrations",
        tone: "violet",
      },
      {
        eyebrow: "Platform · 02",
        title: "Everything in one dashboard.",
        body: "Manage orders, inventory and deliveries from a single dashboard, whichever channel the order came from.", // live (FAQ)
        art: "dashboard",
        tone: "blue",
      },
      {
        eyebrow: "Platform · 03",
        title: "Pick your courier partners.",
        body: "Choose your preferred courier partners, or let Jiffy auto-assign the fastest one for every order.", // live (FAQ, step 4)
        art: "couriers",
        tone: "teal",
      },
      {
        eyebrow: "Platform · 04",
        title: "Track every parcel, live.",
        body: "Monitor deliveries, manage returns, and analyze insights, all in one place.", // live (step 5)
        art: "tracking",
        tone: "pink",
      },
      {
        eyebrow: "Platform · 05",
        title: "Faster deliveries. Better rates.",
        body: "Whether you're shipping 10 or 10,000 orders, we ensure faster deliveries, better rates, and stress-free logistics.", // live (FAQ)
        art: "rates",
        tone: "amber",
      },
    ],
  },
  {
    id: "how",
    label: "How to Jiffy",
    cards: [
      {
        eyebrow: "How to Jiffy · Step 1",
        title: "Sign up",
        body: "Create your Jiffy account in just a few clicks. No lengthy forms, no hassle. Just you and your business, ready to move.", // live
        art: "signup",
        tone: "violet",
      },
      {
        eyebrow: "How to Jiffy · Step 2",
        title: "Connect your store",
        body: "Seamlessly integrate Jiffy with Shopify, Amazon, Myntra, WooCommerce, or your preferred platform. Products, orders and customers sync instantly.", // live
        art: "connect",
        tone: "pink",
      },
      {
        eyebrow: "How to Jiffy · Step 3",
        title: "Stock up with dark stores",
        body: "Keep your inventory close to customers. Jiffy's network of smart dark stores ensures products are always available nearby.", // live
        art: "darkstore",
        tone: "orange",
      },
      {
        eyebrow: "How to Jiffy · Step 4",
        title: "Start shipping",
        body: "From 10 orders to 10,000, Jiffy auto-assigns the fastest courier or delivery partner to get your products to the doorstep in record time.", // live
        art: "van",
        tone: "blue",
      },
      {
        eyebrow: "How to Jiffy · Step 5",
        title: "Track & scale effortlessly",
        body: "Monitor deliveries, manage returns, and analyze insights, all in one dashboard. As your brand grows, Jiffy flexes with you.", // live
        art: "monitor",
        tone: "teal",
      },
    ],
  },
];

export const TONES: Record<FeatureCardData["tone"], string> = {
  violet: "linear-gradient(135deg, #8b6cff 0%, #6d4df2 55%, #5636d8 100%)",
  blue: "linear-gradient(135deg, #4f95ff 0%, #2f6ef0 55%, #1f55d0 100%)",
  amber: "linear-gradient(135deg, #f9a825 0%, #e98a0c 55%, #c96f06 100%)",
  orange: "linear-gradient(135deg, #fb8a3c 0%, #f26a12 55%, #d4520a 100%)",
  teal: "linear-gradient(135deg, #2cc9a5 0%, #129e86 55%, #0b7c6c 100%)",
  pink: "linear-gradient(135deg, #f472b6 0%, #db4f9a 55%, #b8337d 100%)",
};

// Journey milestones shown in the bottom tracker. `at` is in timeline units.
export const MILESTONES = [
  { label: "Ordered", at: 0 },
  { label: "Packed", at: 3.15 },
  { label: "Picked up", at: 8.4 },
  { label: "Dark store", at: 10.4 },
  { label: "In flight", at: 17.0 },
  { label: "Out for delivery", at: 23.45 },
  { label: "Delivered", at: 25.15 },
];
