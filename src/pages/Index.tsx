import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Heart, BookOpen, MapPin, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Resilience Hub</h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Safe. Anonymous. Supportive.</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight px-2">
            You're Not Alone.<br />
            <span className="text-primary">We're Here to Support You.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            A safe, anonymous space for survivors of digital trauma. Find immediate support, 
            therapeutic exercises, and trusted resources across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4">
            <Button asChild size="lg" className="bg-gradient-calm hover:opacity-90 transition-all hover:scale-105 w-full sm:w-auto">
              <Link to="/breathing">
                <Wind className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start Breathing Exercise
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="transition-all hover:scale-105 w-full sm:w-auto">
              <Link to="/resources">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Find Local Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8 text-foreground animate-fade-in">
            Your Toolkit for Recovery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Breathing Exercises */}
            <Link to="/breathing" className="group">
              <Card className="p-5 sm:p-6 h-full hover:shadow-medium transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/40 hover:scale-105 animate-fade-in">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">Breathing Exercises</h4>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Immediate calming techniques for anxiety and panic. Guided breathing to help you feel grounded.
                </p>
              </Card>
            </Link>

            {/* CBT Modules */}
            <Link to="/cbt-modules" className="group">
              <Card className="p-5 sm:p-6 h-full hover:shadow-medium transition-all duration-300 cursor-pointer border-secondary/20 hover:border-secondary/40 hover:scale-105 animate-fade-in [animation-delay:100ms]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">CBT Exercises</h4>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Evidence-based cognitive exercises designed for processing digital trauma and rebuilding resilience.
                </p>
              </Card>
            </Link>

            {/* Journal */}
            <Link to="/journal" className="group">
              <Card className="p-5 sm:p-6 h-full hover:shadow-medium transition-all duration-300 cursor-pointer border-accent/20 hover:border-accent/40 hover:scale-105 animate-fade-in [animation-delay:200ms]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-accent/20 transition-colors">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">My Safe Space</h4>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Your private, encrypted journal. Document your journey in a completely secure environment.
                </p>
              </Card>
            </Link>

            {/* Resources */}
            <Link to="/resources" className="group">
              <Card className="p-5 sm:p-6 h-full hover:shadow-medium transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/40 hover:scale-105 animate-fade-in [animation-delay:300ms]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">Local Resources</h4>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Verified crisis hotlines, counseling centers, NGOs, and legal aid across African regions.
                </p>
              </Card>
            </Link>

            {/* About CBT */}
            <Card className="p-5 sm:p-6 h-full border-muted bg-muted/30 animate-fade-in [animation-delay:400ms]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-3 sm:mb-4">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/60" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">About CBT</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                Learn how Cognitive Behavioral Therapy helps process trauma and build healthier thought patterns.
              </p>
            </Card>

            {/* Privacy Info */}
            <Card className="p-5 sm:p-6 h-full border-muted bg-muted/30 animate-fade-in [animation-delay:500ms]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/60" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">Your Privacy</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                Everything is encrypted and anonymous. No tracking. No data collection. Your safety is paramount.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="bg-destructive/10 border-y border-destructive/20 py-6 sm:py-8 animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-destructive mb-2">In Immediate Crisis?</h3>
          <p className="text-sm sm:text-base text-foreground mb-4 max-w-2xl mx-auto px-4">
            If you're in immediate danger, please contact emergency services or a crisis hotline in your area.
          </p>
          <Button asChild variant="destructive" size="lg" className="transition-all hover:scale-105 w-full sm:w-auto">
            <Link to="/resources">View Emergency Contacts</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p className="text-xs sm:text-sm max-w-2xl mx-auto">
            Resilience Hub is designed to support, not replace, professional care. 
            Please seek qualified help when needed.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
