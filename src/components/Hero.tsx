import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden h-screen">
      <div className="absolute inset-0 gradient-dark opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto  relative pt-40 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Welcome to{' '}
          <span className="bg-gradient-primary bg-clip-text ">
            GameVerse
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your ultimate destination for the latest and greatest video games.
          Discover, explore, and level up your gaming collection.
        </p>
        <Button
          size="lg"
          className="text-lg px-8 glow-cyan hover:glow-purple transition-all"
          onClick={scrollToGames}
        >
          Explore Games
        </Button>
      </div>
    </section>
  );
};
