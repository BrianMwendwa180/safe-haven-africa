import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Heart, BookOpen, MapPin, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Resilience Hub</h1>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block">Safe. Anonymous. Supportive.</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            You're Not Alone.<br />
            <span className="text-primary">We're Here to Support You.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A safe, anonymous space for survivors of digital trauma. Find immediate support, 
            therapeutic exercises, and trusted resources across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-gradient-calm hover:opacity-90 transition-opacity">
              <Link to="/breathing">
                <Wind className="w-5 h-5 mr-2" />
                Start Breathing Exercise
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/resources">
                <MapPin className="w-5 h-5 mr-2" />
                Find Local Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Your Toolkit for Recovery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Breathing Exercises */}
            <Link to="/breathing">
              <Card className="p-6 hover:shadow-medium transition-all cursor-pointer border-primary/20 hover:border-primary/40">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Wind className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">Breathing Exercises</h4>
                <p className="text-muted-foreground">
                  Immediate calming techniques for anxiety and panic. Guided breathing to help you feel grounded.
                </p>
              </Card>
            </Link>

            {/* CBT Modules */}
            <Link to="/cbt-modules">
              <Card className="p-6 hover:shadow-medium transition-all cursor-pointer border-secondary/20 hover:border-secondary/40">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">CBT Exercises</h4>
                <p className="text-muted-foreground">
                  Evidence-based cognitive exercises designed for processing digital trauma and rebuilding resilience.
                </p>
              </Card>
            </Link>

            {/* Journal */}
            <Link to="/journal">
              <Card className="p-6 hover:shadow-medium transition-all cursor-pointer border-accent/20 hover:border-accent/40">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">My Safe Space</h4>
                <p className="text-muted-foreground">
                  Your private, encrypted journal. Document your journey in a completely secure environment.
                </p>
              </Card>
            </Link>

            {/* Resources */}
            <Link to="/resources">
              <Card className="p-6 hover:shadow-medium transition-all cursor-pointer border-primary/20 hover:border-primary/40">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">Local Resources</h4>
                <p className="text-muted-foreground">
                  Verified crisis hotlines, counseling centers, NGOs, and legal aid across African regions.
                </p>
              </Card>
            </Link>

            {/* About CBT */}
            <Card className="p-6 border-muted bg-muted/30">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-foreground/60" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">About CBT</h4>
              <p className="text-muted-foreground">
                Learn how Cognitive Behavioral Therapy helps process trauma and build healthier thought patterns.
              </p>
            </Card>

            {/* Privacy Info */}
            <Card className="p-6 border-muted bg-muted/30">
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-foreground/60" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">Your Privacy</h4>
              <p className="text-muted-foreground">
                Everything is encrypted and anonymous. No tracking. No data collection. Your safety is paramount.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="bg-destructive/10 border-y border-destructive/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-destructive mb-2">In Immediate Crisis?</h3>
          <p className="text-foreground mb-4">
            If you're in immediate danger, please contact emergency services or a crisis hotline in your area.
          </p>
          <Button asChild variant="destructive" size="lg">
            <Link to="/resources">View Emergency Contacts</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Resilience Hub is designed to support, not replace, professional care. 
            Please seek qualified help when needed.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
