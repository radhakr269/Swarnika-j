/**
 * SWARNIKA — Customer Account, Orders & Authentication Types
 * Strict typed structures for customer profiles, saved addresses, orders, and tracking.
 */

import { Product } from '../data/jewelryData';

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberSince: string;
  vipTier: 'Silver Patron' | 'Gold Atelier Privilege' | 'Imperial Royal Circle';
  preferences: {
    ringSize: string; // e.g. "US 7 / Indian 14"
    braceletSize: string; // e.g. "2.4 (Small/Medium)"
    preferredMetal: string; // e.g. "18K Gold Plated"
    necklaceLength: string; // e.g. "18 inch Princess"
    anniversaryDate?: string;
    birthdayDate?: string;
  };
  notifications: {
    orderSms: boolean;
    orderEmail: boolean;
    curatedPreviews: boolean;
  };
}

export interface CustomerAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  tag: 'Home' | 'Office' | 'Atelier / Studio' | 'Other';
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  pictureUrl: string;
  metal: string;
  size?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface TrackingCheckpoint {
  id: string;
  stage: 'placed' | 'quality_check' | 'dispatched' | 'in_transit' | 'delivered';
  title: string;
  description: string;
  timestamp: string;
  location: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface CustomerOrder {
  id: string; // e.g. "ORD-XXXXX"
  orderNumber: string; // e.g. "ORD-XXXXX"
  orderDate: string;
  isoDate: string;
  status: 'processing' | 'quality_check' | 'in_transit' | 'delivered' | 'cancelled';
  statusLabel: string;
  estimatedDelivery: string;
  items: OrderItem[];
  itemCount: number;
  pricing: {
    subtotal: number;
    gstAmount: number;
    shippingFee: number;
    discountAmount: number;
    discountCode?: string;
    finalTotal: number;
  };
  shippingAddress: CustomerAddress;
  payment: {
    method: 'upi' | 'card' | 'cod' | 'netbanking';
    label: string;
    transactionRef: string;
    status: 'Paid & Verified' | 'Pending Verification' | 'Pay on Delivery';
  };
  courier: {
    partner: string;
    service: string;
    awbNumber: string;
    trackingUrl?: string;
    dispatchDate: string;
    currentHub: string;
  };
  trackingTimeline: TrackingCheckpoint[];
  invoiceNumber: string;
}
