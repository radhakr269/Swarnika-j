/**
 * SWARNIKA — Tax Invoice Modal & Print View
 * Certified luxury jewellery invoice with GST compliance, HSN details, and print trigger.
 */

import React from 'react';
import { X, Printer, Download, ShieldCheck } from 'lucide-react';
import { CustomerOrder } from '../../types/account';
import { SwarnikaLogo } from '../brand/SwarnikaLogo';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: CustomerOrder;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 print:p-0 print:static">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity print:hidden" />

      <div className="relative bg-white border border-[#D5C6B5] shadow-2xl max-w-2xl w-full z-10 p-6 sm:p-10 text-[#2D241E] max-h-[92vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:p-6">
        {/* Close & Print Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DED1] print:hidden">
          <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#4A1622]">
            Official Commercial Tax Invoice
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#D5C6B5] hover:bg-[#F2E8DC] text-xs text-[#2D241E] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7A6451] hover:text-[#2D241E] cursor-pointer"
              aria-label="Close invoice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Header */}
        <div className="pt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <span className="font-serif-luxury text-2xl tracking-[0.2em] font-normal text-[#201914] uppercase block">
              SWARNIKA
            </span>
            <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#6C5849] font-sans font-medium block">
              JEWELLERY FOR A BRIGHTER YOU
            </span>
            <div className="text-[11px] text-[#6D5844] mt-2 space-y-0.5 font-light">
              <p>Swarnika Atelier Pvt. Ltd.</p>
              <p>Johari Bazaar, Pink City, Jaipur, Rajasthan 302003</p>
              <p>GSTIN: 08AAECS9214K1ZP • Trade Reg: RJ/JAI/2024/9182</p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs">
            <div className="inline-block px-2 py-0.5 bg-[#F4EDE4] text-[#4A1622] font-mono font-bold text-xs uppercase mb-1">
              ORIGINAL FOR RECIPIENT
            </div>
            <p className="font-mono text-sm font-bold text-[#2D241E]">
              {order.invoiceNumber}
            </p>
            <p className="text-[11px] text-[#7A6451] mt-0.5">Order Ref: #{order.orderNumber}</p>
            <p className="text-[11px] text-[#7A6451]">Date: {order.orderDate}</p>
          </div>
        </div>

        {/* Bill To & Ship To */}
        <div className="mt-6 pt-4 border-t border-[#E8DED1] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-[#FAF8F5] border border-[#E8DED1]">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#4A1622] block mb-1">
              Billed & Shipped To
            </span>
            <p className="font-semibold text-[#2D241E]">{order.shippingAddress.fullName}</p>
            <p className="text-[#6D5844] mt-0.5">
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}
            </p>
            <p className="text-[#6D5844]">
              {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
            </p>
            <p className="text-[#6D5844] mt-1">Phone: {order.shippingAddress.phone}</p>
          </div>

          <div className="p-3 bg-[#FAF8F5] border border-[#E8DED1]">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#4A1622] block mb-1">
              Payment & Dispatch Details
            </span>
            <p className="text-[#6D5844]"><strong className="text-[#2D241E]">Payment Mode:</strong> {order.payment.label}</p>
            <p className="text-[#6D5844]"><strong className="text-[#2D241E]">Logistics:</strong> {order.courier?.partner || 'Insured Delivery'}</p>
            <p className="text-[#6D5844]"><strong className="text-[#2D241E]">Consignment Ref:</strong> {order.courier?.awbNumber || 'Pending Allocation'}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[#2D241E] text-[10px] uppercase tracking-wider text-[#4A1622]">
                <th className="py-2 font-bold">Item Description</th>
                <th className="py-2 font-bold">HSN Code</th>
                <th className="py-2 font-bold">Metal Polish</th>
                <th className="py-2 text-center font-bold">Qty</th>
                <th className="py-2 text-right font-bold">Unit Price</th>
                <th className="py-2 text-right font-bold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DED1]">
              {order.items.map((item, idx) => (
                <tr key={idx} className="py-2.5">
                  <td className="py-2.5 font-medium text-[#2D241E]">
                    {item.name}
                    {item.size && <span className="block text-[10px] text-[#7A6451]">Size: {item.size}</span>}
                  </td>
                  <td className="py-2.5 text-[#6D5844] font-mono text-[11px]">711319</td>
                  <td className="py-2.5 text-[#6D5844]">{item.metal}</td>
                  <td className="py-2.5 text-center text-[#2D241E]">{item.quantity}</td>
                  <td className="py-2.5 text-right font-medium text-[#2D241E] tabular-nums">
                    ₹{item.unitPrice.toLocaleString()}
                  </td>
                  <td className="py-2.5 text-right font-semibold text-[#2D241E] tabular-nums">
                    ₹{item.lineTotal.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Summary */}
        <div className="mt-6 pt-4 border-t border-[#2D241E] flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="text-[11px] text-[#7A6451] max-w-xs space-y-1">
            <div className="flex items-center gap-1.5 text-[#2E6B3E] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Artisanal Quality Inspected Jewellery</span>
            </div>
            <p>Inclusive of 3% GST under IGST/CGST-SGST applicable rules. Luxury velvet presentation casing included.</p>
          </div>

          <div className="w-full sm:w-64 space-y-1.5 text-xs text-[#2D241E]">
            <div className="flex justify-between text-[#6D5844]">
              <span>Subtotal:</span>
              <span className="tabular-nums">₹{order.pricing.subtotal.toLocaleString()}</span>
            </div>
            {order.pricing.discountAmount > 0 && (
              <div className="flex justify-between text-[#2E6B3E]">
                <span>VIP Privilege ({order.pricing.discountCode || 'Discount'}):</span>
                <span className="tabular-nums">-₹{order.pricing.discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-[#6D5844]">
              <span>GST (3% Inclusive):</span>
              <span className="tabular-nums">₹{order.pricing.gstAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#6D5844]">
              <span>Insured Transit:</span>
              <span>{order.pricing.shippingFee === 0 ? 'Complimentary' : `₹${order.pricing.shippingFee}`}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#2D241E] font-serif-luxury text-base font-bold text-[#4A1622]">
              <span>Total Paid:</span>
              <span className="tabular-nums">₹{order.pricing.finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 pt-4 border-t border-dashed border-[#D5C6B5] text-center text-[10px] text-[#7A6451] leading-relaxed">
          <p>This is a computer generated tax invoice and does not require a physical signature.</p>
          <p className="mt-0.5">For returns, repairs or bespoke atelier care, contact concierge@swarnika.com or call our Jaipur master atelier.</p>
        </div>
      </div>
    </div>
  );
};
