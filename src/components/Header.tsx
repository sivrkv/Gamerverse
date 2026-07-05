import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useState } from 'react';
import { CartSidebar } from './CartSidebar';
import { WishlistSidebar } from './WishlistSidebar';

export const Header = () => {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-[#0a0a0f]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0a0f]/80 shadow-lg">
  <div className="container mx-auto px-6 h-20 flex items-center justify-between">
    {/* LEFT SECTION - Logo + Branding */}
    <div className="flex items-center gap-4">
      

      {/* Title and Tag */}
      <div className="flex flex-col leading-tight">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
          GameVerse
        </h1>
        
      </div>
    </div>

    {/* RIGHT SECTION - Buttons */}
    <div className="flex items-center gap-3">
      {/* Wishlist Button */}
      <Button
        variant="outline"
        size="icon"
        className="relative border-cyan-500/40 hover:border-cyan-400 bg-transparent hover:bg-cyan-500/10 transition-all duration-200 shadow-[0_0_8px_rgba(0,255,255,0.2)] hover:shadow-[0_0_12px_rgba(0,255,255,0.4)]"
        onClick={() => setIsWishlistOpen(true)}
      >
        <Heart className="h-6 w-6 text-cyan-300 hover:text-cyan-400 transition-colors" />
        {getWishlistCount() > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
            {getWishlistCount()}
          </span>
        )}
      </Button>

      {/* Cart Button */}
      <Button
        variant="outline"
        size="icon"
        className="relative border-purple-500/40 hover:border-purple-400 bg-transparent hover:bg-purple-500/10 transition-all duration-200 shadow-[0_0_8px_rgba(147,51,234,0.2)] hover:shadow-[0_0_12px_rgba(147,51,234,0.4)]"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-6 w-6 text-purple-300 hover:text-purple-400 transition-colors" />
        {getCartCount() > 0 && (
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
            {getCartCount()}
          </span>
        )}
      </Button>
    </div>
  </div>

  {/* Sidebars */}
  <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
  <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
</header>
    </>
  );
};
