import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game } from './CartContext';

interface WishlistContextType {
  wishlist: Game[];
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Game[]>(() => {
    const savedWishlist = localStorage.getItem('gameverse-wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('gameverse-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (game: Game) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === game.id);
      if (exists) return prevWishlist;
      return [...prevWishlist, game];
    });
  };

  const removeFromWishlist = (gameId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== gameId));
  };

  const isInWishlist = (gameId: string) => {
    return wishlist.some(item => item.id === gameId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, getWishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
