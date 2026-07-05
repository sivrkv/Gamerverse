import { X, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistSidebar = ({ isOpen, onClose }: WishlistSidebarProps) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (game: any) => {
    addToCart(game);
    toast.success(`${game.title} added to cart!`);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">My Wishlist</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-lg">Your wishlist is empty</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {wishlist.map((game) => (
                  <div
                    key={game.id}
                    className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{game.title}</h3>
                      <p className="text-sm text-muted-foreground">{game.genre}</p>
                      <p className="text-primary font-bold mt-1">
                        ${game.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAddToCart(game)}
                        className="hover:text-primary"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromWishlist(game.id)}
                        className="hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-6 space-y-4">
              <div className="text-center text-muted-foreground text-sm">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in wishlist
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
