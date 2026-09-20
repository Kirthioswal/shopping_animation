// Delivery journey step configuration — the 7 stages of package delivery
// Continues directly from the seller receiving the order

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
  {
    stepNumber: '01',
    category: 'SELLER → PACKAGE',
    headlineWhite: 'Your Order,',
    headlineOrange: 'Packed with Care.',
    description: 'The order is verified and carefully packed into the official Jiffy parcel box. Labeled, sealed with security tape, and prepared for instant dispatch.',
    backgroundImage: step02Packed,
    direction: 'right-to-left',
    badgeText: 'Order Packed & Sealed',
    subLocation: 'Dark Store #04 // Station Leo',
  },
  {
    stepNumber: '02',
    category: 'PACKAGE → COURIER',
    headlineWhite: 'Handed to Courier,',
    headlineOrange: 'Shipment Accepted.',
    description: 'Our dedicated courier partner arrives at the fulfillment hub, scans the barcode, and verifies custody. Real-time GPS tracking is officially active.',
    backgroundImage: step03Handover,
    direction: 'right-to-left',
    badgeText: 'Shipment Accepted ✓',
    subLocation: 'Hub Transfer Station',
  },
  {
    stepNumber: '03',
    category: 'COURIER → WAREHOUSE',
    headlineWhite: 'In Transit,',
    headlineOrange: 'To Logistics Hub.',
    description: 'The package speeds across the city logistics artery to the primary sorting terminal, routed through high-speed automated sorting conveyors.',
    backgroundImage: step04Warehouse,
    direction: 'left-to-right',
    badgeText: 'Inbound Sorting Active',
    subLocation: 'Metro Sortation Center',
  },
  {
    stepNumber: '04',
    category: 'WAREHOUSE → AIR TRANSPORT',
    headlineWhite: 'Wings of Speed,',
    headlineOrange: 'Air Cargo Loaded.',
    description: 'Transferred to the airport tarmac and loaded into cargo flight JF-702 for express cross-region flight. No delays, no bottlenecks.',
    backgroundImage: step05Air,
    direction: 'right-to-left',
    badgeText: 'Loaded on Flight JF-702 ✈️',
    subLocation: 'Tarmac Freight Gate 12',
  },
  {
    stepNumber: '05',
    category: 'AIR TRANSPORT → DESTINATION',
    headlineWhite: 'Flight Touchdown,',
    headlineOrange: 'Destination Hub.',
    description: 'The cargo freighter lands at the regional distribution airport. The parcel enters the destination hub and is rapidly allocated to local delivery vans.',
    backgroundImage: step06Destination,
    direction: 'left-to-right',
    badgeText: 'Destination Hub Arrival',
    subLocation: 'Regional Distribution Center',
  },
  {
    stepNumber: '06',
    category: 'DESTINATION → LOCAL COURIER',
    headlineWhite: 'Final-Mile Assigned,',
    headlineOrange: 'Out for Delivery.',
    description: 'The local courier partner receives the parcel, verifies delivery coordinates, and embarks on the final sprint directly to your address.',
    backgroundImage: step07Delivery,
    direction: 'left-to-right',
    badgeText: 'Out for Final Delivery 🛵',
    subLocation: 'Local Dispatch Terminal',
  },
  {
    stepNumber: '07',
    category: 'DELIVERY PERSON → CUSTOMER',
    headlineWhite: 'At Your Door,',
    headlineOrange: 'Package Delivered.',
    description: 'Handed over directly to the delighted customer. Safe, verified, and complete in record time. Another delivery completed in a Jiffy!',
    backgroundImage: step08Delivered,
    direction: 'right-to-left',
    badgeText: 'Package Delivered ✓',
    subLocation: 'Customer Doorstep · 42 Nova Way',
  },
];
