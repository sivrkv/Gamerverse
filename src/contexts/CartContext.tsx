import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Game {
  id: string;
  title: string;
  price: number;
  image: string;
  genre: string;
  platform: string[];
  description: string;
}

interface CartItem extends Game {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  updateQuantity: (gameId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('gameverse-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('gameverse-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game: Game) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === game.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...game, quantity: 1 }];
    });
  };

  const removeFromCart = (gameId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== gameId));
  };

  const updateQuantity = (gameId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(gameId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === gameId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
