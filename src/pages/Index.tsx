import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { GameCard } from '@/components/GameCard';
import { FilterBar } from '@/components/FilterBar';
import { games } from '@/data/games';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const filteredGames = useMemo(() => {
    let filtered = games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre;
      const matchesPlatform = selectedPlatform === 'All' || game.platform.includes(selectedPlatform);
      const matchesPrice = game.price >= priceRange[0] && (priceRange[1] === 100 || game.price <= priceRange[1]);
      return matchesSearch && matchesGenre && matchesPlatform && matchesPrice;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        // Reverse order to show newest first
        filtered = [...filtered].reverse();
        break;
      case 'popular':
        // Sort by price descending as a proxy for popularity
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedGenre, selectedPlatform, sortBy, priceRange]);

  const handleClearFilters = () => {
    setSelectedGenre('All');
    setSelectedPlatform('All');
    setPriceRange([0, 100]);
    setSortBy('default');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      <section id="games" className="container mx-auto px-4 py-12">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          onClearFilters={handleClearFilters}
        />

        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6">
            {filteredGames.length} {filteredGames.length === 1 ? 'Game' : 'Games'} Found
          </h2>
          
          {filteredGames.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No games found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 GameVerse. Your Ultimate Gaming Destination.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
