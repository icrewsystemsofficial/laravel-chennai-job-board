import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, MapPin, Code2 } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10 py-20 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9ImhzbCgwIDg0JSA1NSUgLyAwLjAzKSIgZmlsbC1vcGFjaXR5PSIwLjQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center">
          {/* Community Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            <Users className="h-4 w-4 mr-2" />
            Laravel Chennai Community
          </Badge>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              Laravel Jobs
            </span>
            <br />
            <span className="text-foreground">Made for Chennai</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover curated Laravel opportunities in Chennai and remote positions worldwide. 
            Built by the Laravel Chennai community for passionate PHP developers.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Daily</div>
              <div className="text-sm text-muted-foreground">Updates</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-hover shadow-[var(--shadow-hero)] hover:shadow-[var(--shadow-hero)] transform hover:scale-105 transition-all duration-300"
            >
              Browse Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/20 hover:bg-primary/5"
            >
              <Code2 className="mr-2 h-5 w-5" />
              Post a Job
            </Button>
          </div>
          
          {/* Location Highlights */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
              <MapPin className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">Chennai Focus</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
              <span className="text-sm font-medium text-muted-foreground">Global Remote</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
              <span className="text-sm font-medium text-muted-foreground">Laravel Exclusive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};