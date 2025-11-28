import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Circle, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { cbtAPI, CBTModule, CBTProgress } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useFetch, useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";

interface ModuleWithProgress extends CBTModule {
  completed: boolean;
}

const CBTModules = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [modulesWithProgress, setModulesWithProgress] = useState<ModuleWithProgress[]>([]);

  // Fetch modules
  const {
    data: modulesData = [],
    isLoading: modulesLoading,
    error: modulesError,
  } = useFetch(cbtAPI.getModules);
  const modules = modulesData || [];

  // Fetch user progress
  const {
    data: progressDataRaw = [],
    isLoading: progressLoading,
    refetch: refetchProgress,
  } = useFetch(isAuthenticated ? cbtAPI.getProgress : async () => []);
  const progressData = progressDataRaw || [];

  // Update progress for a module
  const { execute: updateProgress, isLoading: updateLoading } = useApi(
    (moduleId: string, completed: boolean) =>
      cbtAPI.updateProgress(moduleId, completed),
    {
      onSuccess: () => {
        toast({
          title: "Progress updated",
          description: "Your module progress has been saved.",
        });
        refetchProgress();
      },
      onError: (error) => {
        toast({
          title: "Error updating progress",
          description: error,
          variant: "destructive",
        });
      },
    }
  );

  // Combine modules with user progress
  useEffect(() => {
    if (modules.length > 0) {
      const progressMap = new Map(
        progressData.map((p: CBTProgress) => [p.moduleId, p.completed])
      );

      const combined = modules.map((module: CBTModule) => ({
        ...module,
        completed: progressMap.get(module.id) || false,
      }));

      setModulesWithProgress(combined);
    }
  }, [modules, progressData]);

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
            
            {/* Loading State */}
            {(modulesLoading || progressLoading) && (
              <Card className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-primary" />
                <p className="text-muted-foreground">Loading modules...</p>
              </Card>
            )}

            {/* Error State */}
            {(modulesError || (!modulesLoading && modulesWithProgress.length === 0)) && (
              <Card className="p-6 border-destructive/50 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-destructive mb-1">Unable to load modules</h4>
                    <p className="text-sm text-muted-foreground">
                      {modulesError || "The modules couldn't be loaded. Please try refreshing the page."}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Modules */}
            {!modulesLoading && modulesWithProgress.length > 0 && (
              <div className="space-y-4">
                {modulesWithProgress.map((module, index) => {
                  const images = [
                    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                  ];
                  const isLocked = index > 0 && !modulesWithProgress[index - 1].completed;
                  
                  return (
                    <Card key={module.id} className="p-6 hover:shadow-medium transition-all">
                      <div className="flex items-start gap-4">
                        <img
                          src={images[index % images.length]}
                          alt={`Illustration for ${module.title}`}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg flex-shrink-0"
                        />
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
                          <div className="flex gap-3 items-center">
                            {!isLocked ? (
                              <>
                                <Link to={`/cbt-modules/${module.id}`}>
                                  <Button className="bg-gradient-calm">
                                    {module.completed ? "Review Module" : "Start Module"}
                                  </Button>
                                </Link>
                                {isAuthenticated && module.completed && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateProgress(module.id, false)}
                                    disabled={updateLoading}
                                  >
                                    Mark as Incomplete
                                  </Button>
                                )}
                              </>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                Complete previous module first
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 mt-1">
                          {module.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                          ) : (
                            <Circle className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
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
