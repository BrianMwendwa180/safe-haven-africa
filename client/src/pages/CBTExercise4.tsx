import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApi";
import { cbtAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const MODULE_ID = "4"; // Unique identifier for this module

const CBTExercise4 = () => {
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
      title: "Welcome to Rebuilding Trust in Online Spaces",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This exercise helps you gradually work through anxiety about digital platforms and rebuild trust in online spaces.
            We'll develop healthy boundaries and safety practices for safe online engagement.
          </p>
          <p className="text-muted-foreground">
            Recovery doesn't mean avoiding the internet entirely—it means learning to navigate it safely and confidently.
          </p>
        </div>
      ),
    },
    {
      title: "Step 1: Assess Your Current Online Habits",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Reflect on your current relationship with online spaces. What platforms do you use? How do they make you feel?
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Which apps/social media trigger anxiety?</li>
            <li>• What activities feel safe (e.g., reading articles, connecting with trusted friends)?</li>
            <li>• How much time do you spend online daily?</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Describe your current online habits and feelings..."
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
      title: "Step 2: Identify Your Safety Needs",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            What do you need to feel safe online? Consider privacy, boundaries, and support systems.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Strong privacy settings</li>
            <li>• Trusted contacts to reach out to</li>
            <li>• Clear boundaries (e.g., no engaging with certain people)</li>
            <li>• Tools like blockers or time limits</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="List your specific safety needs..."
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
      title: "Step 3: Create a Graduated Exposure Plan",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Gradually re-engage with online spaces using exposure therapy principles. Start small and build confidence.
          </p>
          <div className="bg-primary/5 p-4 rounded-lg mb-4">
            <p className="text-foreground font-medium">Example Plan:</p>
            <ol className="text-muted-foreground space-y-1 list-decimal pl-5">
              <li>Week 1: Browse trusted news sites for 10 minutes</li>
              <li>Week 2: Message one trusted friend online</li>
              <li>Week 3: Join a safe support group</li>
            </ol>
          </div>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Create your 3-5 step graduated exposure plan..."
            rows={6}
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
      title: "Step 4: Set Healthy Boundaries",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Boundaries protect your mental health. Be clear about what you're comfortable with.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Block/mute triggering accounts</li>
            <li>• Set time limits for social media</li>
            <li>• Choose when and how to engage</li>
            <li>• Have an exit strategy for uncomfortable situations</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="List 3-5 specific boundaries you'll set..."
            rows={4}
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
      title: "Step 5: Build a Support Network Online",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Connect with safe, supportive communities. Look for trauma-informed groups or survivor support networks.
          </p>
          <p className="text-muted-foreground">
            Remember: Not all online spaces are dangerous. There are people and communities ready to support you.
          </p>
          <div className="bg-secondary/5 p-4 rounded-lg">
            <p className="text-foreground font-medium">Tips for Safe Connections:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Start with 1:1 conversations with trusted people</li>
              <li>• Use anonymous accounts if needed</li>
              <li>• Set clear expectations for interactions</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Step 6: Monitor and Adjust",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Track how online interactions affect your mood. Adjust your plan as needed.
          </p>
          <p className="text-muted-foreground">
            It's okay to take breaks or step back. Progress isn't linear.
          </p>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="How will you monitor your online experiences and adjust?"
            rows={4}
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
            Great job completing "Rebuilding Trust in Online Spaces"! This gradual approach will help you regain confidence.
          </p>
          <p className="text-muted-foreground">
            Be patient with yourself. Rebuilding trust takes time, but each small step counts.
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

export default CBTExercise4;
