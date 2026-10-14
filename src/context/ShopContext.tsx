import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ALL_PRODUCTS } from '../data/jewelryData';

export interface CartItem {
  id: string; // unique item variant key
  product: Product;
  quantity: number;
  selectedMetal: string;
  selectedSize?: string;
  selectedMaterial?: string;
}

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success';
}

interface PromoDiscount {
  code: string;
  percent: number;
  amount: number;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isStoryOpen: boolean;
  setIsStoryOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  addToCart: (
    product: Product,
    quantity?: number,
    metalOrOpts?: string | { material?: string; color?: string; length?: string },
    size?: string
  ) => void;
  removeFromCart: (itemIdOrProductId: string, metal?: string, size?: string) => void;
  updateQuantity: (itemIdOrProductId: string, quantity: number, metal?: string, size?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  cartItemCount: number;
  shippingFee: number;
  finalTotal: number;
  appliedPromo: PromoDiscount | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  toasts: ToastItem[];
  addToast: (titleOrToast: string | Omit<ToastItem, 'id'>, message?: string, type?: 'info' | 'success') => void;
  removeToast: (id: string) => void;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2999;
const STANDARD_SHIPPING_FEE = 199;
const CART_STORAGE_KEY = 'swarnika_cart_v1';
const WISHLIST_STORAGE_KEY = 'swarnika_wishlist_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage, starting empty for new visitors
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      const loadedItems: CartItem[] = [];
      for (const item of parsed) {
        if (!item || typeof item !== 'object') continue;
        const prodId = item.productId || (item.product && item.product.id);
        const product = ALL_PRODUCTS.find((p) => p.id === prodId);
        if (!product) continue;
        const quantity = typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1;
        const selectedMetal = typeof item.selectedMetal === 'string' ? item.selectedMetal : product.metals[0] || '18K Gold Plated';
        const selectedSize = typeof item.selectedSize === 'string' ? item.selectedSize : undefined;
        const itemKey = item.id || `${product.id}-${selectedMetal}${selectedSize ? `-${selectedSize}` : ''}`;
        loadedItems.push({
          id: itemKey,
          product,
          quantity,
          selectedMetal,
          selectedSize,
          selectedMaterial: item.selectedMaterial,
        });
      }
      return loadedItems;
    } catch (e) {
      console.warn('Unable to load saved cart state', e);
      return [];
    }
  });

  // Initialize wishlist from localStorage, starting empty for new visitors
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      const validIds = new Set(ALL_PRODUCTS.map((p) => p.id));
      return Array.from(new Set(parsed.filter((id) => typeof id === 'string' && validIds.has(id))));
    } catch (e) {
      console.warn('Unable to load saved wishlist state', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<string>('swarnika');
  const [appliedPromo, setAppliedPromo] = useState<PromoDiscount | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Persist cart changes
  useEffect(() => {
    try {
      const payload = cart.map((item) => ({
        id: item.id,
        productId: item.product.id,
        quantity: item.quantity,
        selectedMetal: item.selectedMetal,
        selectedSize: item.selectedSize,
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      // Ignore quota errors
    }
  }, [cart]);

  // Persist wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      // Ignore quota errors
    }
  }, [wishlist]);

  // Lock background scroll when any full-screen modal or drawer is open
  useEffect(() => {
    const hasOpenModal =
      isCartOpen || isWishlistOpen || isSearchOpen || isCheckoutOpen || isStoryOpen || !!quickViewProduct;

    if (hasOpenModal) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isCartOpen, isWishlistOpen, isSearchOpen, isCheckoutOpen, isStoryOpen, quickViewProduct]);

  // Global escape key listener to close active overlays
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (quickViewProduct) setQuickViewProduct(null);
        else if (isSearchOpen) setIsSearchOpen(false);
        else if (isCheckoutOpen) setIsCheckoutOpen(false);
        else if (isCartOpen) setIsCartOpen(false);
        else if (isWishlistOpen) setIsWishlistOpen(false);
        else if (isStoryOpen) setIsStoryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, isSearchOpen, isCheckoutOpen, isCartOpen, isWishlistOpen, isStoryOpen]);

  const addToast = (
    titleOrToast: string | Omit<ToastItem, 'id'>,
    message = '',
    type: 'info' | 'success' = 'success'
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    let newToast: ToastItem;

    if (typeof titleOrToast === 'string') {
      newToast = {
        id,
        title: titleOrToast,
        message: message || '',
        type,
      };
    } else {
      newToast = {
        id,
        ...titleOrToast,
      };
    }

    setToasts((prev) => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = (msg: string) => {
    addToast('Notification', msg, 'info');
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    metalOrOpts?: string | { material?: string; color?: string; length?: string },
    size?: string
  ) => {
    const metal =
      typeof metalOrOpts === 'string'
        ? metalOrOpts
        : metalOrOpts?.material || product.metals?.[0] || '18K Gold Plated';

    const itemKey = `${product.id}-${metal}${size ? `-${size}` : ''}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          id: itemKey,
          product,
          quantity,
          selectedMetal: metal,
          selectedSize: size,
        },
      ];
    });

    addToast('Added to Bag', `${product.name} (${metal}) has been added to your shopping bag.`);
  };

  const removeFromCart = (itemIdOrProductId: string, metal?: string, size?: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (metal !== undefined) {
          return !(item.product.id === itemIdOrProductId && item.selectedMetal === metal && item.selectedSize === size);
        }
        return item.id !== itemIdOrProductId && item.product.id !== itemIdOrProductId;
      })
    );
    addToast('Removed from Bag', 'Item removed from your bag.', 'info');
  };

  const updateQuantity = (itemIdOrProductId: string, quantity: number, metal?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(itemIdOrProductId, metal, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        const matches =
          item.id === itemIdOrProductId ||
          (metal !== undefined
            ? item.product.id === itemIdOrProductId && item.selectedMetal === metal && item.selectedSize === size
            : item.product.id === itemIdOrProductId);
        return matches ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast('Removed from Wishlist', 'Item removed from your saved list.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Added to Wishlist', 'Item saved to your wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = cartItemCount;

  // Re-calculate promo discount whenever cartTotal changes
  const discountAmount = appliedPromo ? Math.round((cartTotal * appliedPromo.percent) / 100) : 0;
  const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const finalTotal = Math.max(0, cartTotal - discountAmount) + shippingFee;

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SWARNIKA15' || cleanCode === 'WELCOME15') {
      const discount = Math.round((cartTotal * 15) / 100);
      setAppliedPromo({
        code: cleanCode,
        percent: 15,
        amount: discount,
      });
      addToast('Privilege Applied', '15% VIP privilege discount has been applied to your acquisition.');
      return true;
    }
    addToast('Invalid Code', 'Try SWARNIKA15 for 15% VIP privilege.', 'info');
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Promo Removed', 'Discount privilege removed from bag.', 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isStoryOpen,
        setIsStoryOpen,
        quickViewProduct,
        setQuickViewProduct,
        selectedCategory,
        setSelectedCategory,
        viewMode,
        setViewMode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
        cartItemCount,
        shippingFee,
        finalTotal,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        toasts,
        addToast,
        removeToast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
