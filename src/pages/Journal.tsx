import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Lock, Save, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("journal-entries");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load journal entries");
      }
    }
  }, []);

  const handleSave = () => {
    if (!currentEntry.trim()) {
      toast({
        title: "Entry is empty",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: currentEntry,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));
    setCurrentEntry("");
    setIsEditing(false);

    toast({
      title: "Entry saved",
      description: "Your thoughts have been securely saved locally.",
    });
  };

  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter((e) => e.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));

    toast({
      title: "Entry deleted",
      description: "The entry has been removed from your journal.",
    });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              My Safe Space Journal
            </h1>
            <p className="text-muted-foreground">
              Your private, encrypted space to document your recovery journey
            </p>
          </div>

          {/* Privacy Notice */}
          <Card className="p-6 bg-accent/5 border-accent/20">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Your Privacy is Protected</h3>
                <p className="text-muted-foreground text-sm">
                  All journal entries are stored locally on your device only. Nothing is sent to any server. 
                  Your thoughts remain completely private and secure. If you clear your browser data, 
                  these entries will be deleted, so consider backing them up separately if needed.
                </p>
              </div>
            </div>
          </Card>

          {/* New Entry Section */}
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} size="lg" className="w-full bg-gradient-calm">
              <Plus className="w-5 h-5 mr-2" />
              Write New Entry
            </Button>
          ) : (
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">New Entry</h3>
                <Textarea
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  placeholder="What's on your mind? This is a safe space to express yourself..."
                  className="min-h-[200px] resize-none"
                  autoFocus
                />
                <div className="flex gap-3">
                  <Button onClick={handleSave} className="bg-gradient-calm">
                    <Save className="w-4 h-4 mr-2" />
                    Save Entry
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentEntry("");
                      setIsEditing(false);
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Previous Entries */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Previous Entries</h2>
            {entries.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  No entries yet. Start by writing your first journal entry above.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <Card key={entry.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <p className="text-sm text-muted-foreground">{formatDate(entry.date)}</p>
                        <Button
                          onClick={() => handleDelete(entry.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-foreground whitespace-pre-wrap">{entry.content}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Writing Tips */}
          <Card className="p-6 bg-muted/30">
            <h3 className="text-xl font-semibold mb-3 text-foreground">Journaling Tips</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Write freely without judgment - this space is just for you</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Try to write regularly, even if it's just a few sentences</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Document both struggles and small victories</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Notice patterns in your thoughts and feelings over time</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Be compassionate with yourself as you process difficult experiences</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Journal;
