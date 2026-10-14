/**
 * SWARNIKA — Customer Address Modal
 * Add & edit shipping/billing addresses with Indian PIN code, state selection, and default flags.
 */

import React, { useState, useEffect } from 'react';
import { X, MapPin, Check, ShieldCheck } from 'lucide-react';
import { CustomerAddress } from '../../types/account';
import { INDIAN_STATES } from '../../data/mockAccountData';
import { useAccount } from '../../context/AccountContext';
import { useShop } from '../../context/ShopContext';

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
  const { addAddress, updateAddress } = useAccount();
  const { addToast } = useShop();

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

  const [errors, setErrors] = useState<Record<string, string>>({});

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
        fullName: 'Sophia Sharma',
        phone: '+91 98765 43210',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        tag: 'Home',
        isDefaultShipping: false,
        isDefaultBilling: false,
      });
    }
    setErrors({});
  }, [addressToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Recipient name is required';
    if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Valid contact phone required';
    if (!formData.addressLine1.trim()) errs.addressLine1 = 'Street address / flat details required';
    if (!formData.city.trim()) errs.city = 'City required';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.replace(/\s+/g, ''))) {
      errs.pincode = 'Valid 6-digit Indian PIN code required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (addressToEdit) {
      updateAddress(addressToEdit.id, formData);
      addToast('Address Updated', 'Your delivery address changes have been saved.', 'success');
    } else {
      addAddress(formData);
      addToast('New Address Saved', 'New delivery location added to your patron profile.', 'success');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="relative bg-[#FAF8F5] border border-[#E4D5C4] shadow-2xl max-w-lg w-full z-10 p-6 sm:p-8 space-y-4 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7A6451] hover:text-[#2D241E] rounded-full hover:bg-[#F2E8DC] cursor-pointer"
          aria-label="Close address form"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#4A1622] font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Atelier Insured Delivery Address</span>
        </div>

        <h2 className="font-serif-luxury text-2xl text-[#2D241E]">
          {addressToEdit ? 'Edit Saved Address' : 'Add New Delivery Address'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-[#2D241E]">
          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                Recipient Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                placeholder="e.g. Sophia Sharma"
              />
              {errors.fullName && <p className="text-[10px] text-red-600 mt-0.5">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                Contact Phone *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                placeholder="+91 98765 43210"
              />
              {errors.phone && <p className="text-[10px] text-red-600 mt-0.5">{errors.phone}</p>}
            </div>
          </div>

          {/* Address Line 1 */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
              Flat, House No., Building, Company, Apartment *
            </label>
            <input
              type="text"
              value={formData.addressLine1}
              onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
              placeholder="e.g. Flat 402, Royal Palms Residency"
            />
            {errors.addressLine1 && <p className="text-[10px] text-red-600 mt-0.5">{errors.addressLine1}</p>}
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
              Area, Street, Sector, Village
            </label>
            <input
              type="text"
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
              className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
              placeholder="e.g. Pali Hill, Bandra West"
            />
          </div>

          {/* Landmark & PIN code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                Landmark (Optional)
              </label>
              <input
                type="text"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                placeholder="e.g. Near Union Park"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                PIN Code *
              </label>
              <input
                type="text"
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                placeholder="e.g. 400050"
              />
              {errors.pincode && <p className="text-[10px] text-red-600 mt-0.5">{errors.pincode}</p>}
            </div>
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                City / District *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                placeholder="e.g. Mumbai"
              />
              {errors.city && <p className="text-[10px] text-red-600 mt-0.5">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tag Selector */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1.5">
              Address Category
            </label>
            <div className="flex gap-2">
              {(['Home', 'Office', 'Atelier / Studio', 'Other'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setFormData({ ...formData, tag: t })}
                  className={`px-3 py-1.5 text-[11px] font-medium border cursor-pointer transition-colors ${
                    formData.tag === t
                      ? 'bg-[#4A1622] text-white border-[#4A1622]'
                      : 'bg-white text-[#554336] border-[#D5C6B5] hover:border-[#4A1622]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="pt-2 border-t border-[#E8DED1] space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-[11px] text-[#4A3B32]">
              <input
                type="checkbox"
                checked={formData.isDefaultShipping}
                onChange={(e) => setFormData({ ...formData, isDefaultShipping: e.target.checked })}
                className="rounded-none text-[#4A1622] focus:ring-[#4A1622]"
              />
              <span>Set as default shipping address for all future acquisitions</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-[11px] text-[#4A3B32]">
              <input
                type="checkbox"
                checked={formData.isDefaultBilling}
                onChange={(e) => setFormData({ ...formData, isDefaultBilling: e.target.checked })}
                className="rounded-none text-[#4A1622] focus:ring-[#4A1622]"
              />
              <span>Set as default tax invoice billing address</span>
            </label>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-[#4A1622] hover:bg-[#350F18] text-white py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer shadow-xs"
            >
              {addressToEdit ? 'SAVE ADDRESS CHANGES' : 'CONFIRM & SAVE ADDRESS'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
