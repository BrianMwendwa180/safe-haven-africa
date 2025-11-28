import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApi";
import { cbtAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const MODULE_ID = "3"; // Unique identifier for this module

const CBTExercise3 = () => {
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
      title: "Welcome to Managing Shame and Guilt",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This exercise addresses the common feelings of shame and guilt that survivors of digital trauma experience.
            We'll work on separating what happened to you from who you are, and developing self-compassion.
          </p>
          <p className="text-muted-foreground">
            Remember: What happened is not your fault. Shame is a common response to trauma, but it doesn't define you.
          </p>
        </div>
      ),
    },
    {
      title: "Step 1: Identify Shame and Guilt",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            What shameful or guilty thoughts are you experiencing? Common examples include:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• "I should have been more careful"</li>
            <li>• "I'm dirty or tainted"</li>
            <li>• "I brought this on myself"</li>
            <li>• "I'm not worthy of support"</li>
            <li>• "Others will judge me"</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Write down the shame/guilt thoughts you're experiencing..."
            rows={6}
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
      title: "Step 2: Separate the Event from Your Identity",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Shame often makes us believe that what happened defines who we are. But trauma is something that happened TO you, not something you ARE.
          </p>
          <p className="text-muted-foreground">
            Try this exercise: "I experienced [describe the trauma briefly], but that doesn't make me [shameful label]."
          </p>
          <div className="bg-primary/5 p-4 rounded-lg mb-4">
            <p className="text-foreground font-medium">Example:</p>
            <p className="text-muted-foreground">
              "I experienced online harassment, but that doesn't make me weak or stupid."
            </p>
          </div>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Practice separating the event from your identity..."
            rows={4}
            value={responses[1] || ""}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[1] = e.target.value;
              setResponses(newResponses);
            }}
          />
        </div>
      ),
    },
    {
      title: "Step 3: Challenge the 'Should' Statements",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Guilt often comes from "should" statements. But hindsight is 20/20, and we can't predict or control everything.
          </p>
          <p className="text-muted-foreground">
            Replace "I should have..." with "Given what I knew at the time..."
          </p>
          <div className="bg-secondary/5 p-4 rounded-lg mb-4">
            <p className="text-foreground font-medium">Examples:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>Instead of: "I should have known better"</li>
              <li>Try: "Given what I knew at the time, I made the best decision I could"</li>
            </ul>
          </div>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Rewrite your 'should' statements..."
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
      title: "Step 4: Practice Self-Compassion",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Treat yourself with the same kindness and understanding you'd offer a friend who experienced the same trauma.
          </p>
          <p className="text-muted-foreground">
            What would you say to comfort a friend? Use those same words for yourself.
          </p>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Write a compassionate message to yourself..."
            rows={4}
            value={responses[3] || ""}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[3] = e.target.value;
              setResponses(newResponses);
            }}
          />
          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="text-foreground font-medium">Self-Compassion Reminder:</p>
            <p className="text-muted-foreground italic">
              "You are worthy of kindness. You are worthy of healing. You are worthy of support."
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Step 5: Create Shame-Resilient Affirmations",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Create affirmations that counteract shame and build resilience. Repeat them daily.
          </p>
          <div className="bg-secondary/5 p-4 rounded-lg mb-4">
            <p className="text-foreground font-medium">Examples:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• "What happened to me was wrong, but it doesn't define my worth"</li>
              <li>• "I am deserving of respect and safety"</li>
              <li>• "My healing journey is valid and important"</li>
            </ul>
          </div>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Create 3-5 personal affirmations..."
            rows={6}
            value={responses[4] || ""}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[4] = e.target.value;
              setResponses(newResponses);
            }}
          />
        </div>
      ),
    },
    {
      title: "Exercise Complete",
      content: (
        <div className="space-y-4 text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
          <p className="text-muted-foreground">
            You've completed the "Managing Shame and Guilt" exercise. This is an important step in your healing journey.
          </p>
          <p className="text-muted-foreground">
            Shame and guilt can be persistent, but with practice, these techniques will help you develop greater self-compassion and resilience.
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

export default CBTExercise3;
