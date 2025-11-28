import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApi";
import { cbtAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const MODULE_ID = "2"; // Unique identifier for this module

const CBTExercise2 = () => {
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
      title: "Welcome to Challenging Negative Thoughts",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This exercise will help you recognize and reframe the negative thoughts that often arise after digital trauma.
            We'll identify automatic negative thoughts and learn to challenge them with evidence-based techniques.
          </p>
          <p className="text-muted-foreground">
            Negative thoughts can feel very real, but they're often distortions. This module will help you examine them critically.
          </p>
        </div>
      ),
    },
    {
      title: "Step 1: Identify Automatic Negative Thoughts",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            What negative thoughts have been running through your mind since the trauma? Common examples include:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• "I should have known better"</li>
            <li>• "This is all my fault"</li>
            <li>• "No one will believe me"</li>
            <li>• "I'll never feel safe online again"</li>
            <li>• "I'm too damaged to recover"</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Write down 3-5 negative thoughts you're experiencing..."
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
      title: "Step 2: Examine the Evidence",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            For each negative thought, ask yourself: What evidence supports this thought? What evidence contradicts it?
          </p>
          <p className="text-muted-foreground">
            Be honest with yourself. Trauma can make it hard to see the full picture, but there is often more evidence against these thoughts than for them.
          </p>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="For each thought, list supporting and contradicting evidence..."
            rows={6}
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
      title: "Step 3: Consider Alternative Perspectives",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            How might someone who cares about you view this situation? What would you tell a friend who experienced the same thing?
          </p>
          <p className="text-muted-foreground">
            This helps you step outside your own perspective and see the situation more objectively.
          </p>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Write alternative perspectives for your negative thoughts..."
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
      title: "Step 4: Create Balanced Thoughts",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Now, create more balanced, realistic thoughts to replace the negative ones. These should acknowledge the difficulty but also include hope and reality.
          </p>
          <div className="bg-primary/5 p-4 rounded-lg mb-4">
            <p className="text-foreground font-medium">Example:</p>
            <p className="text-muted-foreground">
              Negative: "I'll never feel safe online again"<br />
              Balanced: "I feel unsafe right now, but with time and the right strategies, I can learn to navigate online spaces more safely."
            </p>
          </div>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Create 1-2 balanced thoughts for each negative thought..."
            rows={6}
            value={responses[3] || ""}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[3] = e.target.value;
              setResponses(newResponses);
            }}
          />
        </div>
      ),
    },
    {
      title: "Step 5: Practice Cognitive Restructuring",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            When negative thoughts arise, pause and use this 4-step process:
          </p>
          <ol className="space-y-2 text-muted-foreground list-decimal pl-5">
            <li>Notice the thought</li>
            <li>Ask: Is this helpful? Is it true?</li>
            <li>Find the evidence against it</li>
            <li>Replace with a balanced thought</li>
          </ol>
          <div className="bg-secondary/5 p-4 rounded-lg">
            <p className="text-foreground font-medium">Quick Tip:</p>
            <p className="text-muted-foreground">
              Keep a small notebook or phone note with your balanced thoughts. Refer to them when negative thoughts arise.
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
            Excellent work! You've completed the "Challenging Negative Thoughts" exercise.
          </p>
          <p className="text-muted-foreground">
            Practice this cognitive restructuring technique regularly. It gets easier with time and can significantly reduce the power of negative thoughts.
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

export default CBTExercise2;
