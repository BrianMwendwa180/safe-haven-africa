import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/useApi";
import { cbtAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const MODULE_ID = "5"; // Unique identifier for this module

const CBTExercise5 = () => {
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
      title: "Welcome to Creating Your Safety Plan",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This final exercise helps you develop a personalized action plan for managing triggers, setting boundaries, and knowing when to seek additional support.
            A safety plan is your roadmap for staying safe and supported.
          </p>
          <p className="text-muted-foreground">
            This plan should be practical, specific, and tailored to your unique situation and needs.
          </p>
        </div>
      ),
    },
    {
      title: "Step 1: Identify Your Triggers",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            What situations, people, or environments trigger your trauma responses? Be specific.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Specific social media platforms or accounts</li>
            <li>• Certain types of online interactions</li>
            <li>• Times of day or situations that remind you of the trauma</li>
            <li>• People or conversations that feel unsafe</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="List your specific triggers..."
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
      title: "Step 2: Warning Signs",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            What are the early warning signs that you're becoming distressed? These help you intervene before things escalate.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Physical: racing heart, sweating, tension</li>
            <li>• Emotional: anxiety, anger, numbness</li>
            <li>• Behavioral: avoiding certain activities, increased online time</li>
            <li>• Cognitive: negative thoughts, flashbacks</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="List your personal warning signs..."
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
      title: "Step 3: Coping Strategies",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            What strategies help you cope when you're triggered? Include both immediate and long-term strategies.
          </p>
          <div className="bg-primary/5 p-4 rounded-lg mb-4">
            <p className="text-foreground font-medium">Examples:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Breathing exercises or grounding techniques</li>
              <li>• Calling a trusted friend or therapist</li>
              <li>• Taking a break from social media</li>
              <li>• Engaging in self-care activities</li>
            </ul>
          </div>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="List your coping strategies..."
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
      title: "Step 4: Setting Boundaries",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            What boundaries do you need to set to protect yourself? Be specific about what you'll do and what you'll avoid.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Which accounts or people to block/mute</li>
            <li>• Time limits for online activity</li>
            <li>• Types of content you'll avoid</li>
            <li>• When to log off or take breaks</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="List your boundaries..."
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
      title: "Step 5: Support Network",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Who can you reach out to for support? Include both professional and personal contacts.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Therapist or counselor</li>
            <li>• Trusted friends or family</li>
            <li>• Support groups or hotlines</li>
            <li>• Crisis resources (if applicable)</li>
          </ul>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="List your support contacts and how to reach them..."
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
      title: "Step 6: Emergency Plan",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            What will you do if you feel unsafe or need immediate help? Include specific steps and contacts.
          </p>
          <p className="text-muted-foreground">
            Remember: Your safety comes first. It's okay to reach out for help.
          </p>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Outline your emergency plan..."
            rows={4}
            value={responses[5] || ""}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[5] = e.target.value;
              setResponses(newResponses);
            }}
          />
        </div>
      ),
    },
    {
      title: "Step 7: Review and Commit",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Review your safety plan. Make any final adjustments. How will you remember to use it?
          </p>
          <div className="bg-secondary/5 p-4 rounded-lg">
            <p className="text-foreground font-medium">Tips for Using Your Plan:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Keep it accessible (phone note, printed copy)</li>
              <li>• Review it regularly</li>
              <li>• Update it as your needs change</li>
              <li>• Share it with trusted supporters</li>
            </ul>
          </div>
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="How will you implement and maintain this plan?"
            rows={4}
            value={responses[6] || ""}
            onChange={(e) => {
              const newResponses = [...responses];
              newResponses[6] = e.target.value;
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
            Congratulations! You've completed "Creating Your Safety Plan" and finished all CBT modules.
          </p>
          <p className="text-muted-foreground">
            Your safety plan is a living document. Use it, update it, and know that help is available when you need it.
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

export default CBTExercise5;
