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
  { stepNumber: '01', category: 'FEATURES', headlineWhite: 'Quick commerce,', headlineOrange: 'in a Jiffy.', description: 'Fast local delivery with a logistics team that scales with your orders.', backgroundImage: step02Packed, direction: 'right-to-left', badgeText: 'Closer than you think', subLocation: 'Jiffy delivery network' },
  { stepNumber: '02', category: 'COURIER HAND-OFF', headlineWhite: 'Every order,', headlineOrange: 'tracked live.', description: 'The parcel travels from the seller to a courier who catches and loads it for dispatch.', backgroundImage: step03Handover, direction: 'right-to-left', badgeText: 'Shipment accepted', subLocation: 'Courier transfer station' },
  { stepNumber: '03', category: 'DARK STORE', headlineWhite: 'Near your', headlineOrange: 'customers.', description: 'A local logistics hub receives each parcel and routes it toward its destination.', backgroundImage: step04Warehouse, direction: 'left-to-right', badgeText: 'Inbound sorting active', subLocation: 'Jiffy logistics hub' },
  { stepNumber: '04', category: 'INTEGRATIONS', headlineWhite: 'Works with', headlineOrange: 'your tools.', description: 'Connect your sales channels and manage the delivery journey from one place.', backgroundImage: step06Destination, direction: 'left-to-right', badgeText: 'One connected dashboard', subLocation: 'Connected commerce' },
  { stepNumber: '05', category: 'AIR CARGO', headlineWhite: 'Across cities,', headlineOrange: 'without the wait.', description: 'Longer routes connect through air cargo and regional delivery hubs.', backgroundImage: step05Air, direction: 'right-to-left', badgeText: 'Cargo loaded', subLocation: 'Air freight terminal' },
  { stepNumber: '06', category: 'HOW TO JIFFY', headlineWhite: 'From setup to', headlineOrange: 'scale.', description: 'Set up your store, prepare shipments, and follow each order as it moves.', backgroundImage: step02Packed, direction: 'right-to-left', badgeText: 'Track and scale', subLocation: 'Jiffy platform' },
  { stepNumber: '07', category: 'FINAL MILE', headlineWhite: 'The final mile,', headlineOrange: 'handled.', description: 'The local courier takes the shipment onward for its last delivery leg.', backgroundImage: step07Delivery, direction: 'left-to-right', badgeText: 'Out for delivery', subLocation: 'Local dispatch' },
  { stepNumber: '08', category: 'DELIVERED', headlineWhite: 'At your door,', headlineOrange: 'in a Jiffy.', description: 'The courier hands the parcel to the customer and completes the order.', backgroundImage: step08Delivered, direction: 'right-to-left', badgeText: 'Package delivered ✓', subLocation: 'Customer doorstep' },
];
