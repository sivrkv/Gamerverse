import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Game } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(game.id);

  const handleAddToCart = () => {
    addToCart(game);
    toast.success(`${game.title} added to cart!`);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(game.id);
      toast.info(`${game.title} removed from wishlist`);
    } else {
      addToWishlist(game);
      toast.success(`${game.title} added to wishlist!`);
    }
  };

  return (
    <Card className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 hover:glow-cyan">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
            {game.genre}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 left-2 bg-background/80 backdrop-blur-sm hover:bg-background/90",
            inWishlist && "text-red-500 hover:text-red-600"
          )}
          onClick={handleToggleWishlist}
        >
          <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
        </Button>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg line-clamp-1">{game.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {game.description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {game.platform.map((platform) => (
            <span
              key={platform}
              className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
            >
              {platform}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-primary">
            {game.price === 0 ? 'FREE' : `$${game.price.toFixed(2)}`}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="hover:glow-cyan transition-shadow"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
