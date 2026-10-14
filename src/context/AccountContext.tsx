/**
 * SWARNIKA — Customer Account Context
 * Real React context for customer account state with honest security boundaries.
 * 
 * SECURITY DIRECTIVES:
 * 1. A new visitor is strictly unauthenticated (guest).
 * 2. localStorage is never treated as proof of identity.
 * 3. No arbitrary credentials or fake OTPs mark a customer as authenticated.
 * 4. No fabricated orders, delivery records, or courier tracking are presented.
 * 5. Honest guest portal representation until a verified backend is provisioned.
 */

import React, { createContext, useContext, useState } from 'react';
import {
  CustomerProfile,
  CustomerAddress,
  CustomerOrder,
} from '../types/account';
import {
  DEFAULT_CUSTOMER_PROFILE,
  DEFAULT_CUSTOMER_ADDRESSES,
  INITIAL_ORDERS,
} from '../data/mockAccountData';

interface AccountContextType {
  isAuthenticated: boolean;
  profile: CustomerProfile;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authView: 'signin' | 'register' | 'track_lookup';
  setAuthView: (view: 'signin' | 'register' | 'track_lookup') => void;
  login: (emailOrPhone: string, name?: string) => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<CustomerProfile>) => void;
  updatePreferences: (preferences: Partial<CustomerProfile['preferences']>) => void;
  addAddress: (address: Omit<CustomerAddress, 'id'>) => CustomerAddress;
  updateAddress: (id: string, address: Partial<CustomerAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string, type: 'shipping' | 'billing') => void;
  addOrder: (order: CustomerOrder) => void;
  getOrderById: (orderId: string) => CustomerOrder | undefined;
  trackOrderLookup: (orderId: string, contact?: string) => CustomerOrder | undefined;
  isBackendConfigured: boolean;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication status: Strictly unauthenticated by default.
  // No localStorage or client state is trusted as proof of identity.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Customer Profile: Clean guest patron template.
  const [profile, setProfile] = useState<CustomerProfile>(DEFAULT_CUSTOMER_PROFILE);

  // Saved Addresses: Empty for all visitors without authenticated backend.
  const [addresses, setAddresses] = useState<CustomerAddress[]>(DEFAULT_CUSTOMER_ADDRESSES);

  // Orders: Empty list; no fake orders or fictitious dispatch events.
  const [orders, setOrders] = useState<CustomerOrder[]>(INITIAL_ORDERS);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'signin' | 'register' | 'track_lookup'>('signin');

  // Backend availability flag
  const isBackendConfigured = false;

  /**
   * Login handler: Without a verified authentication backend,
   * we refuse to create a false authenticated session or accept arbitrary input.
   */
  const login = (_emailOrPhone: string, _name?: string): boolean => {
    // Truthfully reject authentication attempts until real backend is configured
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updated: Partial<CustomerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const updatePreferences = (preferences: Partial<CustomerProfile['preferences']>) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...preferences,
      },
    }));
  };

  const addAddress = (address: Omit<CustomerAddress, 'id'>): CustomerAddress => {
    const newId = `ADDR-${Date.now().toString().slice(-4)}`;
    const newAddress: CustomerAddress = {
      ...address,
      id: newId,
    };

    setAddresses((prev) => {
      const nextList = prev.map((addr) => ({
        ...addr,
        isDefaultShipping: address.isDefaultShipping ? false : addr.isDefaultShipping,
        isDefaultBilling: address.isDefaultBilling ? false : addr.isDefaultBilling,
      }));
      return [newAddress, ...nextList];
    });

    return newAddress;
  };

  const updateAddress = (id: string, updated: Partial<CustomerAddress>) => {
    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id !== id) {
          return {
            ...addr,
            isDefaultShipping: updated.isDefaultShipping ? false : addr.isDefaultShipping,
            isDefaultBilling: updated.isDefaultBilling ? false : addr.isDefaultBilling,
          };
        }
        return { ...addr, ...updated };
      })
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const setDefaultAddress = (id: string, type: 'shipping' | 'billing') => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        [type === 'shipping' ? 'isDefaultShipping' : 'isDefaultBilling']: addr.id === id,
      }))
    );
  };

  const addOrder = (_order: CustomerOrder) => {
    // In compliance with Phase 09 security directives, client cannot invent orders
  };

  const getOrderById = (_orderId: string): CustomerOrder | undefined => {
    // No unauthenticated local order retrieval
    return undefined;
  };

  const trackOrderLookup = (_orderId: string, _contact?: string): CustomerOrder | undefined => {
    // No client-side mock order lookup or enumeration
    return undefined;
  };

  return (
    <AccountContext.Provider
      value={{
        isAuthenticated,
        profile,
        addresses,
        orders,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authView,
        setAuthView,
        login,
        logout,
        updateProfile,
        updatePreferences,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        addOrder,
        getOrderById,
        trackOrderLookup,
        isBackendConfigured,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
