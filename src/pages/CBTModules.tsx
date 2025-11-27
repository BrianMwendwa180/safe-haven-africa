import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

const CBTModules = () => {
  const [modules] = useState<Module[]>([
    {
      id: "1",
      title: "Understanding Your Feelings",
      description: "Learn to identify and name the emotions you're experiencing after digital trauma. This foundational exercise helps you regain a sense of control.",
      duration: "5-10 min",
      completed: false,
    },
    {
      id: "2",
      title: "Challenging Negative Thoughts",
      description: "Digital trauma can lead to harmful self-talk. This module teaches you to recognize and reframe these thoughts with evidence-based techniques.",
      duration: "10-15 min",
      completed: false,
    },
    {
      id: "3",
      title: "Managing Shame and Guilt",
      description: "Address the common feelings of shame that survivors experience. Learn that what happened is not your fault and develop self-compassion.",
      duration: "10-15 min",
      completed: false,
    },
    {
      id: "4",
      title: "Rebuilding Trust in Online Spaces",
      description: "Gradually work through anxiety about digital platforms. Learn healthy boundaries and safety practices for online engagement.",
      duration: "15-20 min",
      completed: false,
    },
    {
      id: "5",
      title: "Creating Your Safety Plan",
      description: "Develop a personalized action plan for managing triggers, setting boundaries, and knowing when to seek additional support.",
      duration: "15-20 min",
      completed: false,
    },
  ]);

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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              CBT Recovery Modules
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Evidence-based cognitive behavioral therapy exercises designed specifically for 
              survivors of digital trauma. Work through these at your own pace.
            </p>
          </div>

          {/* What is CBT Info */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-semibold mb-3 text-foreground">What is CBT?</h3>
            <p className="text-muted-foreground mb-4">
              Cognitive Behavioral Therapy (CBT) is a proven therapeutic approach that helps you understand 
              the connections between your thoughts, feelings, and behaviors. For survivors of digital trauma, 
              CBT can:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Reduce anxiety, depression, and PTSD symptoms</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Challenge harmful thought patterns that develop after trauma</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Build practical coping strategies for daily life</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Restore your sense of safety and control</span>
              </li>
            </ul>
          </Card>

          {/* Modules List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Your Modules</h2>
            {modules.map((module, index) => (
              <Card key={module.id} className="p-6 hover:shadow-medium transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {module.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {index + 1}. {module.title}
                        </h3>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {module.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{module.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <Button className="bg-gradient-calm">
                        {module.completed ? "Review Module" : "Start Module"}
                      </Button>
                      {index > 0 && !modules[index - 1].completed && (
                        <span className="text-sm text-muted-foreground self-center">
                          Complete previous module first
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Note about professional help */}
          <Card className="p-6 bg-secondary/5 border-secondary/20">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Remember</h3>
            <p className="text-muted-foreground">
              These exercises are designed to support your recovery, but they are not a replacement 
              for professional therapy. If you're struggling, please consider reaching out to a 
              qualified mental health professional. Check our{" "}
              <Link to="/resources" className="text-primary hover:underline">
                Resources page
              </Link>{" "}
              for local counseling services.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CBTModules;
