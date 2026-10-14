/**
 * SWARNIKA — Customer Address Modal
 * Address specification form reflecting pending backend activation.
 * Does not fabricate addresses or claim persistent cloud storage without a backend.
 */

import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldAlert } from 'lucide-react';
import { CustomerAddress } from '../../types/account';
import { INDIAN_STATES } from '../../data/mockAccountData';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addressToEdit?: CustomerAddress | null;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  addressToEdit,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    tag: 'Home' as CustomerAddress['tag'],
    isDefaultShipping: false,
    isDefaultBilling: false,
  });

  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        fullName: addressToEdit.fullName,
        phone: addressToEdit.phone,
        addressLine1: addressToEdit.addressLine1,
        addressLine2: addressToEdit.addressLine2 || '',
        landmark: addressToEdit.landmark || '',
        city: addressToEdit.city,
        state: addressToEdit.state,
        pincode: addressToEdit.pincode,
        tag: addressToEdit.tag,
        isDefaultShipping: addressToEdit.isDefaultShipping,
        isDefaultBilling: addressToEdit.isDefaultBilling,
      });
    } else {
      setFormData({
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        state: 'Maharashtra',
        pincode: '',
        tag: 'Home',
        isDefaultShipping: false,
        isDefaultBilling: false,
      });
    }
  }, [addressToEdit, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="address-modal-title">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="relative bg-[#FAF8F5] border border-[#E4D5C4] shadow-2xl max-w-xl w-full z-10 p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A6451] hover:text-[#2D241E] rounded-full hover:bg-[#F2E8DC] cursor-pointer"
          aria-label="Close address form"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[#A77B3D] font-semibold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Patron Address Stewardship</span>
          </div>
          <h2 id="address-modal-title" className="font-serif-luxury text-2xl sm:text-3xl text-[#2D241E]">
            {addressToEdit ? 'Edit Delivery Location' : 'Add New Delivery Address'}
          </h2>
          <p className="text-xs text-[#7A6451] mt-1">
            Manage physical delivery addresses for insured jewellery consignments.
          </p>
        </div>

        {/* Backend Activation Pending Notice */}
        <div className="p-3.5 bg-[#F4EDE4] border border-[#E0D2C2] text-xs text-[#554336] leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#8C3A49] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#4A1622] uppercase tracking-wider text-[10px] block mb-0.5">
              Address Storage Requires Verified Patron Account
            </span>
            <p className="text-[11.5px] text-[#5A4637]">
              Persistent address management and verified tax invoice billing require an authenticated customer account. Live address storage will be enabled with backend patron account provisioning.
            </p>
          </div>
        </div>

        {/* Address Form Fields */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5 text-xs text-[#2D241E]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                Recipient Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
              Flat / House No. & Building Name
            </label>
            <input
              type="text"
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              placeholder="e.g. Flat 402, Royal Palms Residency"
              className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
              Street, Area & Locality
            </label>
            <input
              type="text"
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              placeholder="e.g. Pali Hill, Near Nargis Dutt Road"
              className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                State
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              >
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                PIN Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="6-digit PIN"
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={true}
              className="flex-1 bg-[#E5D7C7] text-[#7A6451] py-3 text-xs uppercase tracking-[0.18em] font-medium cursor-not-allowed flex items-center justify-center gap-2 border border-[#D5C2AD]"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Save Unavailable (Pending Backend)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-[#2D241E] text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
