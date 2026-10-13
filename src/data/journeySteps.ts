// Storyboard scenes that follow the order confirmation and seller packing in the hero.
// The original marketing sections, integrations, FAQ and contact content remain below the journey.
import step02Packed from '@/assets/journey/step-02-packed.png';
import step03Handover from '@/assets/journey/step-03-handover.png';
import step04Warehouse from '@/assets/journey/step-04-warehouse.png';
import step05Air from '@/assets/journey/step-05-air.png';
import step06Destination from '@/assets/journey/step-06-destination.png';
import step07Delivery from '@/assets/journey/step-07-delivery.png';
import step08Delivered from '@/assets/journey/step-08-customer-delivered.jpg';

export interface JourneyStep {
  stepNumber: string;
  category: string;
  headlineWhite: string;
  headlineOrange: string;
  description: string;
  backgroundImage: string;
  direction: 'right-to-left' | 'left-to-right';
  badgeText: string;
  subLocation: string;
}

export const journeySteps: JourneyStep[] = [
  { stepNumber: '01', category: 'QUICK COMMERCE', headlineWhite: 'Powering', headlineOrange: 'Quick Commerce', description: 'From dark stores to doorsteps, Jiffy makes quick commerce logistics effortless—delivering products to your customers in record time.', backgroundImage: step02Packed, direction: 'right-to-left', badgeText: 'Need it now? Get it in a Jiffy.', subLocation: 'My Jiffy World' },
  { stepNumber: '02', category: 'DELIVERY CREW', headlineWhite: 'Astronaut Leo,', headlineOrange: 'on the move.', description: 'Leo carries each parcel through a quick zigzag run before handing it to the delivery crew.', backgroundImage: step02Packed, direction: 'left-to-right', badgeText: 'Astronaut Leo · On the move', subLocation: 'Jiffy Express Route' },
  { stepNumber: '03', category: 'DELIVERY CREW', headlineWhite: 'Astronaut Leo,', headlineOrange: 'hands up!', description: 'Leo raises both arms to celebrate the next stage of the delivery journey.', backgroundImage: step02Packed, direction: 'left-to-right', badgeText: 'Hands up · Let’s go!', subLocation: 'Jiffy Express Route' },
  { stepNumber: '04', category: 'LOGISTICS CREW', headlineWhite: 'Your Logistics Crew,', headlineOrange: 'Always On Duty.', description: "From scanning to shipping, Jiffy's smart team works round the clock to make logistics effortless.", backgroundImage: step03Handover, direction: 'right-to-left', badgeText: 'From scanning to shipping', subLocation: 'Always On Duty' },
  { stepNumber: '05', category: 'HOW TO JIFFY', headlineWhite: 'Step 3: Dark Store', headlineOrange: 'Stockup', description: 'Stock up your Dark Stores.', backgroundImage: step04Warehouse, direction: 'left-to-right', badgeText: 'Step 3: Dark Store Stockup', subLocation: 'How to Jiffy' },
  { stepNumber: '06', category: 'INTEGRATIONS', headlineWhite: 'Integrates with', headlineOrange: 'your favorite tools.', description: 'Streamline business processes by bringing your favorite tools and AI helpers together. AI for business makes working with integrations easier than ever.', backgroundImage: step06Destination, direction: 'left-to-right', badgeText: 'Your favorite tools', subLocation: 'Integrations' },
  { stepNumber: '07', category: 'HOW TO JIFFY', headlineWhite: 'Step 4: Shipment', headlineOrange: 'is Ready', description: 'Get Started with Shipping.', backgroundImage: step05Air, direction: 'right-to-left', badgeText: 'Step 4: Shipment is Ready', subLocation: 'How to Jiffy' },
  { stepNumber: '08', category: 'HOW TO JIFFY', headlineWhite: 'Getting started', headlineOrange: 'with Jiffy.', description: "Getting started with Jiffy is as easy as placing your first order. Here's how it works.", backgroundImage: step02Packed, direction: 'right-to-left', badgeText: 'How to Jiffy', subLocation: 'Track & Scale' },
  { stepNumber: '09', category: 'QUICK COMMERCE', headlineWhite: 'From dark stores', headlineOrange: 'to doorsteps.', description: 'Jiffy makes quick commerce logistics effortless—delivering products to your customers in record time.', backgroundImage: step07Delivery, direction: 'left-to-right', badgeText: 'Delivering in record time', subLocation: 'Powering Quick Commerce' },
  { stepNumber: '10', category: 'DELIVERED', headlineWhite: 'Need it now?', headlineOrange: 'Get it in a Jiffy.', description: 'Jiffy makes quick commerce logistics effortless—delivering products to your customers in record time.', backgroundImage: step08Delivered, direction: 'right-to-left', badgeText: 'Get it in a Jiffy.', subLocation: 'Jiffy World' },
];
