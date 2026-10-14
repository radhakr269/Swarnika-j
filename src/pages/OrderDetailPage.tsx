/**
 * SWARNIKA — Customer Order Details & Tracking Safety Boundary
 * Secure order inspection ensuring zero leak of fabricated patron records,
 * courier claims, or unauthorized order enumeration.
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
  Lock,
  Headphones,
} from 'lucide-react';
import { ROUTES } from '../config/navigation';
import { STORE_CONFIG } from '../config/store';

export const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="bg-[#FAF8F5] min-h-[75vh] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#7A6451]">
          <Link to={ROUTES.HOME} className="hover:text-[#4A1622] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={ROUTES.ACCOUNT} className="hover:text-[#4A1622] transition-colors">
            Patron Account
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={ROUTES.ORDERS} className="hover:text-[#4A1622] transition-colors">
            Orders
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#2D241E]">
            {orderId ? `Order #${orderId}` : 'Tracking'}
          </span>
        </nav>

        {/* Secure Order Details Card */}
        <div className="bg-white border border-[#E8DED1] p-8 sm:p-12 text-center shadow-xs space-y-6">
          <div className="w-16 h-16 bg-[#F4EDE4] text-[#4A1622] rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 stroke-[1.6]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A77B3D] font-semibold block">
              SECURITY & ACCESS CONTROL
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#2D241E]">
              {orderId ? `Consignment #${orderId}` : 'Consignment Tracking'}
            </h1>
            <p className="text-sm font-medium text-[#4A1622] max-w-md mx-auto pt-1">
              Tracking information is not yet available.
            </p>
            <p className="text-xs text-[#7A6451] max-w-lg mx-auto leading-relaxed">
              Order history and consignment tracking will become available when secure customer accounts and ordering are enabled. In accordance with e-commerce security standards, order records and customer personal details cannot be retrieved without an authenticated, server-authorized patron session.
            </p>
          </div>

          {/* Transparent Status Notice */}
          <div className="p-4 bg-[#FAF8F5] border border-[#E8DED1] text-xs text-[#554336] text-left max-w-md mx-auto space-y-1.5">
            <div className="flex items-center gap-2 text-[#4A1622] font-semibold uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Patron Security Policy</span>
            </div>
            <p className="text-[11.5px] text-[#6D5844] leading-relaxed">
              SWARNIKA strictly prohibits exposing customer names, shipping addresses, payment details, or tracking events through unauthenticated URL query parameters.
            </p>
          </div>

          {/* Verified Navigation Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={ROUTES.SHOP}
              className="w-full sm:w-auto px-6 py-3 bg-[#4A1622] hover:bg-[#350F18] text-white text-xs uppercase tracking-[0.16em] font-medium transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Jewellery Catalogue</span>
            </Link>

            <Link
              to={ROUTES.ACCOUNT}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-[#2D241E] text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Patron Account</span>
            </Link>

            <a
              href={`mailto:${STORE_CONFIG.concierge.email}`}
              className="w-full sm:w-auto px-6 py-3 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-[#7A6451] hover:text-[#2D241E] text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Headphones className="w-4 h-4 text-[#A77B3D]" />
              <span>Contact Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
