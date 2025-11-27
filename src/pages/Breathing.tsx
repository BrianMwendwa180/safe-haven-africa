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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Guided Breathing Exercise
            </h1>
            <p className="text-muted-foreground">
              Box breathing (4-4-4) helps calm your nervous system and reduce anxiety
            </p>
          </div>

          {/* Breathing Circle */}
          <Card className={`p-12 transition-all duration-1000 ${getPhaseColor()} border-2`}>
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* Animated Circle */}
              <div 
                className={`
                  w-48 h-48 md:w-64 md:h-64 rounded-full 
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
                <div className="text-center">
                  <p className="text-6xl md:text-8xl font-bold text-foreground">
                    {countdown}
                  </p>
                  <p className="text-lg md:text-xl font-medium text-muted-foreground mt-2">
                    {getPhaseText()}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4">
                {!isActive ? (
                  <Button onClick={handleStart} size="lg" className="bg-gradient-calm">
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={handlePause} size="lg" variant="outline">
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={handleReset} size="lg" variant="outline">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-6 bg-muted/30">
            <h3 className="text-xl font-semibold mb-4 text-foreground">How to Use Box Breathing</h3>
            <ol className="space-y-3 text-muted-foreground">
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
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Why This Helps</h3>
            <p className="text-muted-foreground mb-4">
              Box breathing activates your parasympathetic nervous system, which helps:
            </p>
            <ul className="space-y-2 text-muted-foreground">
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
