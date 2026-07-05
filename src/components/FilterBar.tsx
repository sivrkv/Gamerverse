import { Search, X, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  onClearFilters: () => void;
}

const genres = ['All', 'Action', 'RPG', 'Racing', 'Sci-Fi', 'Stealth', 'Shooter', 'Strategy', 'Horror'];
const platforms = ['All', 'PC', 'PlayStation', 'Xbox'];

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedPlatform,
  onPlatformChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
}: FilterBarProps) => {
  const activeFiltersCount = 
    (selectedGenre !== 'All' ? 1 : 0) + 
    (selectedPlatform !== 'All' ? 1 : 0) + 
    (priceRange[1] < 100 ? 1 : 0);
  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[200px] h-12">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="title-asc">Title: A to Z</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="h-12"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Genre</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? 'default' : 'outline'}
                size="sm"
                onClick={() => onGenreChange(genre)}
                className={selectedGenre === genre ? 'glow-cyan' : ''}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Platform</h3>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Button
                key={platform}
                variant={selectedPlatform === platform ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPlatformChange(platform)}
                className={selectedPlatform === platform ? 'glow-cyan' : ''}
              >
                {platform}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Price Range</h3>
            <span className="text-sm text-muted-foreground">
              ${priceRange[0]} - ${priceRange[1] === 100 ? '100+' : priceRange[1]}
            </span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
