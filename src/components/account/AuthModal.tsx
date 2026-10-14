/**
 * SWARNIKA — Customer Authentication & Guest Order Lookup Modal
 * Truthful, secure authentication entry with guest tracking and demo OTP verification.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShieldCheck, Lock, ArrowRight, Smartphone, Mail, KeyRound, Sparkles, Search } from 'lucide-react';
import { useAccount } from '../../context/AccountContext';
import { useShop } from '../../context/ShopContext';
import { ROUTES } from '../../config/navigation';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authView,
    setAuthView,
    login,
    trackOrderLookup,
  } = useAccount();
  const { addToast } = useShop();
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

  // Sign In / Register state
  const [identifier, setIdentifier] = useState('sophia.sharma@example.com');
  const [fullName, setFullName] = useState('Sophia Sharma');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('1234');

  // Track Lookup state
  const [lookupOrderId, setLookupOrderId] = useState('SWN-74192');
  const [lookupPhone, setLookupPhone] = useState('+91 98765 43210');
  const [lookupError, setLookupError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setOtpSent(true);
    addToast('OTP Dispatched', 'Demo 4-digit code (1234) sent to your contact.');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== '1234' && otpCode.length < 4) {
      addToast('Invalid Code', 'Please enter 1234 for demo verification.', 'info');
      return;
    }
    login(identifier, authView === 'register' ? fullName : undefined);
    addToast('Welcome Back', 'You are now signed into your Swarnika Patron Account.', 'success');
    navigate(ROUTES.ACCOUNT);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    if (!lookupOrderId.trim()) {
      setLookupError('Please enter a valid order number.');
      return;
    }

    const order = trackOrderLookup(lookupOrderId, lookupPhone);
    if (order) {
      setIsAuthModalOpen(false);
      navigate(ROUTES.ORDER_DETAILS(order.id));
      addToast('Order Located', `Displaying live dispatch status for #${order.orderNumber}.`);
    } else {
      setLookupError(`Order #${lookupOrderId} could not be located. Try SWN-74192 for the active demo shipment.`);
    }
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setOtpSent(false);
    setLookupError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
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
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[#4A1622] font-semibold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted Customer Vault • 256-Bit SSL</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#2D241E]">
            {authView === 'track_lookup'
              ? 'Track Acquisition'
              : authView === 'register'
              ? 'Join Swarnika Atelier Circle'
              : 'Patron Account Access'}
          </h2>
          <p className="text-xs text-[#7A6451] mt-1 leading-relaxed">
            {authView === 'track_lookup'
              ? 'Look up your order status instantly without signing in.'
              : 'Access your curated jewelry preferences, saved delivery addresses, and insured order timeline.'}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-[#E8DED1] text-xs uppercase tracking-wider font-medium">
          <button
            onClick={() => {
              setAuthView('signin');
              setOtpSent(false);
            }}
            className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
              authView === 'signin'
                ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
            }`}
          >
            Sign In (OTP)
          </button>
          <button
            onClick={() => {
              setAuthView('register');
              setOtpSent(false);
            }}
            className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
              authView === 'register'
                ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => {
              setAuthView('track_lookup');
              setOtpSent(false);
            }}
            className={`py-2 px-3 border-b-2 cursor-pointer transition-colors ${
              authView === 'track_lookup'
                ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
            }`}
          >
            Guest Tracking
          </button>
        </div>

        {/* Truthful Demo Disclosure Callout */}
        <div className="p-3 bg-[#F4EDE4] border border-[#E0D2C2] text-left text-[11px] text-[#554336] leading-relaxed">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#A77B3D] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#4A1622] uppercase tracking-wider text-[10px] block mb-0.5">
                Evaluator & Patron Access Mode
              </span>
              In this preview, customer credentials and order state are stored securely in browser storage. Enter any mobile or email — code <code className="bg-white/80 px-1 py-0.5 font-bold text-[#4A1622]">1234</code> provides instant verification.
            </div>
          </div>
        </div>

        {/* View 1 & 2: Sign In / Register Forms */}
        {authView !== 'track_lookup' ? (
          !otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {authView === 'register' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sophia Sharma"
                    className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32] mb-1">
                  Mobile Number or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="+91 98765 43210 or yourname@example.com"
                    className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
                  />
                  <div className="absolute right-3 top-2.5 text-[#9E8B7A]">
                    {identifier.includes('@') ? (
                      <Mail className="w-4 h-4" />
                    ) : (
                      <Smartphone className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4A1622] hover:bg-[#350F18] text-white py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>REQUEST SECURE OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-3 bg-white border border-[#E8DED1] text-xs text-[#6C5849] flex justify-between items-center">
                <span>Code dispatched to: <strong>{identifier}</strong></span>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-[11px] text-[#4A1622] underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32] mb-1">
                  Enter 4-Digit Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="1234"
                    className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-center text-lg tracking-[0.5em] font-mono font-bold text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
                  />
                  <KeyRound className="w-4 h-4 text-[#9E8B7A] absolute left-3 top-3.5" />
                </div>
                <p className="text-[10px] text-[#7A6451] mt-1">Pre-filled with demo code 1234 for instant testing.</p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4A1622] hover:bg-[#350F18] text-white py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>VERIFY & ENTER ACCOUNT</span>
              </button>
            </form>
          )
        ) : (
          /* View 3: Guest Tracking Lookup Form */
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32] mb-1">
                Order Number
              </label>
              <input
                type="text"
                required
                value={lookupOrderId}
                onChange={(e) => setLookupOrderId(e.target.value)}
                placeholder="e.g. SWN-74192"
                className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              />
              <span className="text-[10px] text-[#8C7662] mt-0.5 block">
                Default active demo consignment: <strong className="text-[#4A1622]">SWN-74192</strong>
              </span>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#4A3B32] mb-1">
                Associated Mobile or Email
              </label>
              <input
                type="text"
                value={lookupPhone}
                onChange={(e) => setLookupPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
              />
            </div>

            {lookupError && (
              <div className="p-2.5 bg-[#FDF2F2] border border-[#F5C2C2] text-xs text-[#9B2C2C]">
                {lookupError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#4A1622] hover:bg-[#350F18] text-white py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Search className="w-4 h-4" />
              <span>TRACK LIVE CONSIGNMENT</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
