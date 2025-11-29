import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Lock, Save, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useApi, useFetch } from "@/hooks/useApi";
import { journalAPI, JournalEntry as ApiJournalEntry } from "@/services/api";

interface JournalEntry extends ApiJournalEntry {
  id: string;
  date: string;
  content: string;
}

const Journal = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [currentEntry, setCurrentEntry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch entries
  const {
    data: entries = [],
    isLoading: entriesLoading,
    error: entriesError,
    refetch: refetchEntries,
  } = useFetch(journalAPI.getEntries);

  // Create entry
  const { execute: createEntry } = useApi(
    (content: string) => journalAPI.createEntry(content),
    {
      onSuccess: (newEntry: JournalEntry) => {
        toast({ title: "Entry saved", description: "Your journal entry has been saved." });
        setCurrentEntry("");
        setIsEditing(false);
        // Add the new entry to the existing entries so it appears immediately
        refetchEntries();
      },
      onError: (error) => {
        toast({ title: "Error saving entry", description: error, variant: "destructive" });
      },
    }
  );

  // Update entry
  const { execute: updateEntry } = useApi(
    (id: string, content: string) => journalAPI.updateEntry(id, content),
    {
      onSuccess: () => {
        toast({ title: "Entry updated", description: "Your journal entry has been updated." });
        setCurrentEntry("");
        setIsEditing(false);
        setEditingId(null);
        refetchEntries();
      },
      onError: (error) => {
        toast({ title: "Error updating entry", description: error, variant: "destructive" });
      },
    }
  );

  // Delete entry
  const { execute: deleteEntry } = useApi(
    (id: string) => journalAPI.deleteEntry(id),
    {
      onSuccess: () => {
        toast({ title: "Entry deleted", description: "The entry has been removed." });
        refetchEntries();
      },
      onError: (error) => {
        toast({ title: "Error deleting entry", description: error, variant: "destructive" });
      },
    }
  );

  const handleSave = async () => {
    if (!currentEntry.trim()) {
      toast({ title: "Entry is empty", description: "Write something before saving.", variant: "destructive" });
      return;
    }
    if (!isAuthenticated) {
      toast({ title: "Not authenticated", description: "Please log in.", variant: "destructive" });
      return;
    }

    try {
      if (editingId) {
        await updateEntry(editingId, currentEntry);
      } else {
        await createEntry(currentEntry);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry(id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setCurrentEntry(entry.content);
    setIsEditing(true);
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Safe Space Journal</h1>
            <p className="text-muted-foreground">Your private, encrypted space to document your journey.</p>
          </div>

          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} size="lg" className="w-full bg-gradient-calm">
              <Plus className="w-5 h-5 mr-2" />
              Write New Entry
            </Button>
          ) : (
            <Card className="p-6">
              <div className="space-y-4">
                <Textarea
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  placeholder="What's on your mind?"
                  className="min-h-[200px] resize-none"
                  autoFocus
                />
                <div className="flex gap-3">
                  <Button onClick={handleSave} className="bg-gradient-calm">
                    <Save className="w-4 h-4 mr-2" /> Save Entry
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentEntry("");
                      setIsEditing(false);
                      setEditingId(null);
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Previous Entries</h2>
            {entries.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No entries yet. Start writing above.</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <Card key={entry.id} className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-sm text-muted-foreground">{formatDate(entry.date)}</p>
                      <div className="flex gap-2">
                        <Button onClick={() => handleEdit(entry)} variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button onClick={() => handleDelete(entry.id)} variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">{entry.content}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Journal;
