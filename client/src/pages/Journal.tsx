import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Trash2, Plus, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MoodSelector } from "@/components/MoodSelector";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import {
  fetchJournalEntries,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  type JournalEntry,
} from "@/services/journal";

type Mood = 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral' | 'hopeful';

const moodEmoji: Record<Mood, string> = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  anxious: '😰',
  neutral: '😐',
  hopeful: '🌟',
};

const Journal = () => {
  const { toast } = useToast();

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [currentMood, setCurrentMood] = useState<Mood>("neutral");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch entries
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await fetchJournalEntries();
      setEntries(data);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to fetch entries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Save entry (create or update)
  const handleSave = async () => {
    if (!currentEntry.trim()) {
      toast({
        title: "Entry is empty",
        description: "Write something before saving.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      if (editingId) {
        await updateJournalEntry(editingId, currentEntry, currentMood);
        toast({
          title: "Updated",
          description: "Entry updated successfully",
        });
      } else {
        await createJournalEntry(currentEntry, currentMood);
        toast({
          title: "Saved",
          description: "Entry created successfully",
        });
      }

      setCurrentEntry("");
      setCurrentMood("neutral");
      setIsEditing(false);
      setEditingId(null);
      await fetchEntries();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to save entry",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Delete entry
  const handleDelete = async () => {
    if (!deleteConfirm.id) return;

    try {
      setIsDeleting(true);
      await deleteJournalEntry(deleteConfirm.id);
      toast({
        title: "Deleted",
        description: "Entry deleted successfully",
      });
      setDeleteConfirm({ open: false, id: null });
      await fetchEntries();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete entry",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Edit entry
  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry._id);
    setCurrentEntry(entry.content);
    setCurrentMood((entry.mood as Mood) || "neutral");
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Format date nicely
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

  // Get entry count
  const entryCount = entries.length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Safe Space Journal</h1>
            <p className="text-muted-foreground">Your private space to document your journey.</p>
            {entryCount > 0 && (
              <p className="text-sm text-muted-foreground">
                You have {entryCount} {entryCount === 1 ? "entry" : "entries"}
              </p>
            )}
          </div>

          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} size="lg" className="w-full bg-gradient-calm">
              <Plus className="w-5 h-5 mr-2" />
              Write New Entry
            </Button>
          ) : (
            <Card className="p-6 space-y-4">
              <div className="space-y-4">
                <MoodSelector value={currentMood} onChange={setCurrentMood} />
                <Textarea
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  placeholder="What's on your mind? Share your thoughts, feelings, and experiences..."
                  className="min-h-[200px] resize-none"
                  autoFocus
                />
                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-calm"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Entry
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentEntry("");
                      setCurrentMood("neutral");
                      setIsEditing(false);
                      setEditingId(null);
                    }}
                    variant="outline"
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Previous Entries</h2>
            {loading ? (
              <Card className="p-12 text-center">
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mt-3">Loading entries...</p>
              </Card>
            ) : entries.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No entries yet. Start writing above.</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <Card key={entry._id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {moodEmoji[(entry.mood as Mood) || "neutral"]}
                        </span>
                        <p className="text-sm text-muted-foreground">{formatDate(entry.createdAt || entry.date)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(entry)}
                          variant="ghost"
                          size="sm"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => setDeleteConfirm({ open: true, id: entry._id })}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
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

      <DeleteConfirmationDialog
        isOpen={deleteConfirm.open}
        title="Delete Entry"
        description="Are you sure you want to delete this entry? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm({ open: false, id: null })}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Journal;
