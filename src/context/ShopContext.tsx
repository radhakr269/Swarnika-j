import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ALL_PRODUCTS } from '../data/jewelryData';

export interface CartItem {
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
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  cartItemCount: number;
  toasts: ToastItem[];
  addToast: (titleOrToast: string | Omit<ToastItem, 'id'>, message?: string, type?: 'info' | 'success') => void;
  removeToast: (id: string) => void;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: ALL_PRODUCTS[0] || {
        id: 'P06',
        name: 'Aafreen Royal Chandbali Earrings',
        pictureName: 'P06_Aafreen_Chandbali_Product.jpg',
        modelPictureName: 'P06_Aafreen_Chandbali_Model.jpg',
        price: 4499,
        originalPrice: 5999,
        image: '/public/assist/image/products/P06_Aafreen_Chandbali_Product.jpg',
        modelImage: '/public/assist/image/models/P06_Aafreen_Chandbali_Model.jpg',
        fallbackImage: '/public/assist/image/P06_Aafreen_Chandbali_Main_Preview.jpg',
        fallbackModelImage: '/public/assist/image/P06_Aafreen_Chandbali_Lifestyle_PREVIEW.jpg',
        category: 'earrings',
        metals: ['18K Gold Plated', 'Antique Gold Polish'],
        description: 'Opulent crescent moon chandbali earrings handcrafted with uncut polki stones.',
        reviewsCount: 168,
        rating: 5,
        inStock: true,
      },
      quantity: 1,
      selectedMetal: '18K Gold Plated',
    },
    {
      product: ALL_PRODUCTS[1] || {
        id: 'P07',
        name: 'Noor Heritage Dome Jhumkas',
        pictureName: 'P07_Noor_Jhumka_Product.jpg',
        modelPictureName: 'P07_Noor_Jhumka_Model.jpg',
        price: 3899,
        originalPrice: 5200,
        image: '/public/assist/image/products/P07_Noor_Jhumka_Product.jpg',
        modelImage: '/public/assist/image/models/P07_Noor_Jhumka_Model.jpg',
        fallbackImage: '/public/assist/image/P07_Noor_Jhumka_Main_Preview.jpg',
        fallbackModelImage: '/public/assist/image/P07_Noor_Jhumka_Lifestyle_PREVIEW.jpg',
        category: 'earrings',
        metals: ['18K Gold Plated', 'Heritage Kundan'],
        description: 'Royal dome-shaped filigree jhumkas suspended with cascading micro-pearl ghungroos.',
        reviewsCount: 142,
        rating: 5,
        inStock: true,
      },
      quantity: 1,
      selectedMetal: '18K Gold Plated',
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>(['sw-1', 'sw-3']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<string>('swarnika');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (
    titleOrToast: string | Omit<ToastItem, 'id'>,
    message = '',
    type: 'info' | 'success' = 'success'
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
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

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedMetal === metal && item.selectedSize === size
      );

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
          product,
          quantity,
          selectedMetal: metal,
          selectedSize: size,
        },
      ];
    });

    addToast('Added to Cart', `${product.name} has been added to your shopping bag.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Removed from Cart', 'Item removed from your bag.', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
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
