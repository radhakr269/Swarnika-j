/**
 * SWARNIKA — Customer Authentication & Account Gateway Modal
 * Truthful, secure authentication entry reflecting pending backend activation.
 * Does not store passwords, fabricate authenticated sessions, or simulate order lookups.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, Eye, EyeOff, ShieldAlert, ShoppingBag, Package } from 'lucide-react';
import { useAccount } from '../../context/AccountContext';
import { ROUTES } from '../../config/navigation';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authView,
    setAuthView,
  } = useAccount();
  const navigate = useNavigate();

  // Accessible Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  // Form fields (clean initial state, zero fabricated credentials)
  const [identifier, setIdentifier] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Track Lookup fields
  const [lookupOrderId, setLookupOrderId] = useState('');
  const [lookupPhone, setLookupPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setPassword('');
  };

  const handleBrowseCatalogue = () => {
    setIsAuthModalOpen(false);
    navigate(ROUTES.SHOP);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] border border-[#E4D5C4] shadow-2xl max-w-lg w-full z-10 p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#7A6451] hover:text-[#2D241E] rounded-full hover:bg-[#F2E8DC] cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Security Header */}
        <div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[#A77B3D] font-semibold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Patron Security Gateway</span>
          </div>
          <h2 id="auth-modal-title" className="font-serif-luxury text-2xl sm:text-3xl text-[#2D241E]">
            {authView === 'track_lookup'
              ? 'Consignment Tracking'
              : authView === 'register'
              ? 'Atelier Patron Registration'
              : 'Patron Account Access'}
          </h2>
          <p className="text-xs text-[#7A6451] mt-1 leading-relaxed">
            {authView === 'track_lookup'
              ? 'Track order status and verified dispatch records.'
              : 'Sign in to access your bespoke jewelry sizing, delivery addresses, and order history.'}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-[#E8DED1] text-xs uppercase tracking-wider font-medium">
          <button
            onClick={() => setAuthView('signin')}
            className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
              authView === 'signin'
                ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthView('register')}
            className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
              authView === 'register'
                ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setAuthView('track_lookup')}
            className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
              authView === 'track_lookup'
                ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
            }`}
          >
            Order Tracking
          </button>
        </div>

        {/* Honest Activation-Pending Callout (Strict Phase 09 Rule) */}
        <div className="p-3.5 bg-[#F4EDE4] border border-[#E0D2C2] text-left text-[11px] text-[#554336] leading-relaxed space-y-1">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-[#8C3A49] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#4A1622] uppercase tracking-wider text-[10px] block mb-0.5">
                Authentication Service Activation Pending
              </span>
              <p className="text-[11.5px] text-[#5A4637]">
                {authView === 'track_lookup'
                  ? 'Tracking information is not yet available. Real-time consignment tracking will be activated alongside the verified order management service.'
                  : 'Live patron authentication and account creation are pending server-side authentication gateway deployment. For your protection, no simulated sessions or unencrypted passwords are saved.'}
              </p>
            </div>
          </div>
        </div>

        {/* View 1 & 2: Sign In / Register Forms */}
        {authView !== 'track_lookup' ? (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {authView === 'register' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32] mb-1">
                Email Address or Mobile Number
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@example.com or +91 98765 43210"
                className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32]">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#8C7662] hover:text-[#2D241E] cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Honest disabled submit button */}
            <div className="pt-1 space-y-2">
              <button
                type="button"
                disabled={true}
                className="w-full bg-[#E5D7C7] text-[#7A6451] py-3 text-xs uppercase tracking-[0.2em] font-medium cursor-not-allowed flex items-center justify-center gap-2 border border-[#D5C2AD]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {authView === 'register' ? 'Registration Unavailable (Pending Backend)' : 'Sign In Unavailable (Pending Backend)'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleBrowseCatalogue}
                className="w-full bg-[#4A1622] hover:bg-[#350F18] text-white py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse Jewellery Catalogue</span>
              </button>
            </div>
          </form>
        ) : (
          /* View 3: Order Tracking Information */
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32] mb-1">
                Order Number
              </label>
              <input
                type="text"
                value={lookupOrderId}
                onChange={(e) => setLookupOrderId(e.target.value)}
                placeholder="e.g. SWN-XXXXX"
                className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32] mb-1">
                Associated Mobile or Email
              </label>
              <input
                type="text"
                value={lookupPhone}
                onChange={(e) => setLookupPhone(e.target.value)}
                placeholder="Enter contact details"
                className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              />
            </div>

            <div className="pt-1 space-y-2">
              <button
                type="button"
                disabled={true}
                className="w-full bg-[#E5D7C7] text-[#7A6451] py-3 text-xs uppercase tracking-[0.2em] font-medium cursor-not-allowed flex items-center justify-center gap-2 border border-[#D5C2AD]"
              >
                <Package className="w-3.5 h-3.5" />
                <span>Tracking Unavailable (Pending Backend)</span>
              </button>

              <button
                type="button"
                onClick={handleBrowseCatalogue}
                className="w-full bg-[#4A1622] hover:bg-[#350F18] text-white py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse Jewellery Catalogue</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
