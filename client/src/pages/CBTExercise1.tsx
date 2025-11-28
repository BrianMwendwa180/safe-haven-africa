import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApi";
import { cbtAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const MODULE_ID = "1"; // Unique identifier for this module

const CBTExercise1 = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);

  // Update progress when module completes
  const { execute: updateProgress, isLoading: updateLoading } = useApi(
    (moduleId: string, completed: boolean) =>
      cbtAPI.updateProgress(moduleId, completed),
    {
      onSuccess: () => {
        toast({
          title: "Module completed!",
          description: "Your progress has been saved.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error saving progress",
          description: error,
          variant: "destructive",
        });
      },
    }
  );

  const steps = [
    {
      title: "Welcome to Understanding Your Feelings",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This exercise will help you identify and name the emotions you're experiencing after digital trauma.
            We'll work through this step by step to help you regain a sense of control over your feelings.
          </p>
          <p className="text-muted-foreground">
            Remember, all emotions are valid. There's no "right" or "wrong" way to feel after trauma.
          </p>
        </div>
      ),
    },
    {
      title: "Step 1: Name Your Current Emotions",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Take a moment to check in with yourself. What emotions are you feeling right now?
            Common emotions after digital trauma include:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Anxiety or fear</li>
            <li>• Anger or rage</li>
            <li>• Shame or guilt</li>
            <li>• Sadness or grief</li>
            <li>• Confusion or disorientation</li>
            <li>• Numbness or detachment</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Write down the emotions you're feeling..."
            rows={4}
            value={responses[0] || ""}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[0] = e.target.value;
              setResponses(newResponses);
            }}
          />
        </div>
      ),
    },
    {
      title: "Step 2: Rate Your Emotions",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            On a scale of 1-10, how intense are these emotions right now?
            (1 = barely noticeable, 10 = overwhelming)
          </p>
          <input
            type="range"
            min="1"
            max="10"
            className="w-full"
            value={responses[1] || "5"}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[1] = e.target.value;
              setResponses(newResponses);
            }}
          />
          <p className="text-center text-muted-foreground">
            Intensity: {responses[1] || "5"}/10
          </p>
        </div>
      ),
    },
    {
      title: "Step 3: Connect to Your Body",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Where do you feel these emotions in your body? Common physical sensations include:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Tightness in chest or throat</li>
            <li>• Stomach discomfort</li>
            <li>• Headaches or tension</li>
            <li>• Fatigue or restlessness</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Describe where you feel these emotions physically..."
            rows={4}
            value={responses[2] || ""}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[2] = e.target.value;
              setResponses(newResponses);
            }}
          />
        </div>
      ),
    },
    {
      title: "Step 4: Validate Your Feelings",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Remember: Your feelings are a normal response to an abnormal situation.
            Digital trauma can be just as real and impactful as physical trauma.
          </p>
          <p className="text-muted-foreground">
            It's okay to feel this way. You're not "overreacting" or "too sensitive."
          </p>
          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="text-foreground font-medium">Affirmation:</p>
            <p className="text-muted-foreground italic">
              "My feelings are valid. What happened to me matters, and it's okay to take time to heal."
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Exercise Complete",
      content: (
        <div className="space-y-4 text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
          <p className="text-muted-foreground">
            Congratulations! You've completed the "Understanding Your Feelings" exercise.
          </p>
          <p className="text-muted-foreground">
            This is an important first step in your recovery journey. Continue practicing
            this awareness of your emotions as you move through the other modules.
          </p>
          <Button
            onClick={async () => {
              // Mark as completed in API if authenticated
              if (isAuthenticated) {
                try {
                  await updateProgress(MODULE_ID, true);
                  navigate("/cbt-modules");
                } catch (e) {
                  console.error("Error updating progress:", e);
                  // Still navigate even if API fails
                  navigate("/cbt-modules");
                }
              } else {
                // Fallback to localStorage if not authenticated
                const completedModules = JSON.parse(
                  localStorage.getItem("completedModules") || "[]"
                );
                if (!completedModules.includes(MODULE_ID)) {
                  completedModules.push(MODULE_ID);
                  localStorage.setItem(
                    "completedModules",
                    JSON.stringify(completedModules)
                  );
                }
                navigate("/cbt-modules");
              }
            }}
            disabled={updateLoading}
            className="bg-gradient-calm"
          >
            {updateLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Return to Modules"
            )}
          </Button>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/cbt-modules" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to CBT Modules</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {steps[step].title}
                </h1>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Step {step + 1} of {steps.length}
                </p>
              </div>

              {steps[step].content}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={step === steps.length - 1}
                  className="bg-gradient-calm"
                >
                  {step === steps.length - 2 ? "Complete" : "Next"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CBTExercise1;
