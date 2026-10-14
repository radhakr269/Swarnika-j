/**
 * SWARNIKA — Customer Account Data Structure
 * Indian states reference data and truthful empty customer state.
 * No fabricated orders, mock addresses, or fake profiles are exported for production rendering.
 */

import { CustomerProfile, CustomerAddress, CustomerOrder } from '../types/account';

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR',
  'Chandigarh',
] as const;

export const DEFAULT_CUSTOMER_PROFILE: CustomerProfile = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  memberSince: '',
  vipTier: 'Silver Patron',
  preferences: {
    ringSize: 'Indian 14 (US 7)',
    braceletSize: '2.4 (Small/Medium)',
    preferredMetal: '18K Gold Plated',
    necklaceLength: '18 Inch (Princess Length)',
  },
  notifications: {
    orderSms: false,
    orderEmail: false,
    curatedPreviews: false,
  },
};

export const DEFAULT_CUSTOMER_ADDRESSES: CustomerAddress[] = [];

export const INITIAL_ORDERS: CustomerOrder[] = [];
