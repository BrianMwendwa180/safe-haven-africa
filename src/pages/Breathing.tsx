import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Breathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;
        
        // Move to next phase
        if (phase === "inhale") {
          setPhase("hold");
          return 4;
        } else if (phase === "hold") {
          setPhase("exhale");
          return 4;
        } else {
          setPhase("inhale");
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setCountdown(4);
  };

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return "border-primary bg-primary/5";
      case "hold":
        return "border-accent bg-accent/5";
      case "exhale":
        return "border-secondary bg-secondary/5";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-all hover:scale-105">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
          {/* Title */}
          <div className="text-center space-y-2 sm:space-y-3 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground px-2">
              Guided Breathing Exercise
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Box breathing (4-4-4) helps calm your nervous system and reduce anxiety
            </p>
          </div>

          {/* Breathing Circle */}
          <Card className={`p-6 sm:p-8 md:p-12 transition-all duration-1000 ${getPhaseColor()} border-2 animate-scale-in`}>
            <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
              {/* Animated Circle */}
              <div 
                className={`
                  w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full 
                  flex items-center justify-center
                  transition-all duration-1000
                  ${phase === "inhale" ? "scale-125" : ""}
                  ${phase === "hold" ? "scale-125" : ""}
                  ${phase === "exhale" ? "scale-75" : ""}
                  ${phase === "inhale" ? "bg-primary/20" : ""}
                  ${phase === "hold" ? "bg-accent/20" : ""}
                  ${phase === "exhale" ? "bg-secondary/20" : ""}
                `}
              >
                <div className="text-center px-4">
                  <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground">
                    {countdown}
                  </p>
                  <p className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground mt-2">
                    {getPhaseText()}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4">
                {!isActive ? (
                  <Button onClick={handleStart} size="lg" className="bg-gradient-calm hover:scale-105 transition-all w-full sm:w-auto">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={handlePause} size="lg" variant="outline" className="hover:scale-105 transition-all w-full sm:w-auto">
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={handleReset} size="lg" variant="outline" className="hover:scale-105 transition-all w-full sm:w-auto">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-5 sm:p-6 bg-muted/30 animate-fade-in [animation-delay:200ms]">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">How to Use Box Breathing</h3>
            <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-semibold text-primary">1.</span>
                <span>Find a comfortable seated position in a quiet space</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-accent">2.</span>
                <span>Press Start and follow the visual guide</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">3.</span>
                <span>Inhale slowly through your nose for 4 seconds</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-accent">4.</span>
                <span>Hold your breath gently for 4 seconds</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-secondary">5.</span>
                <span>Exhale slowly through your mouth for 4 seconds</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">6.</span>
                <span>Repeat for 3-5 minutes or until you feel calmer</span>
              </li>
            </ol>
          </Card>

          {/* Benefits */}
          <Card className="p-5 sm:p-6 animate-fade-in [animation-delay:300ms]">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">Why This Helps</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Box breathing activates your parasympathetic nervous system, which helps:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Reduce immediate anxiety and panic</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Lower heart rate and blood pressure</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Improve focus and mental clarity</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Interrupt stress response patterns</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Breathing;
