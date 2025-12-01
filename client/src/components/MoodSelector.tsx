import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Mood = 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral' | 'hopeful';

interface MoodSelectorProps {
  value: Mood;
  onChange: (mood: Mood) => void;
  label?: string;
}

const moodOptions: { value: Mood; emoji: string; label: string }[] = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
  { value: 'angry', emoji: '😠', label: 'Angry' },
  { value: 'anxious', emoji: '😰', label: 'Anxious' },
  { value: 'neutral', emoji: '😐', label: 'Neutral' },
  { value: 'hopeful', emoji: '🌟', label: 'Hopeful' },
];

export const MoodSelector = ({ value, onChange, label = "How are you feeling?" }: MoodSelectorProps) => {
  return (
    <div className="space-y-3">
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <div className="flex flex-wrap gap-2">
        {moodOptions.map((mood) => (
          <Button
            key={mood.value}
            onClick={() => onChange(mood.value)}
            variant={value === mood.value ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
          >
            <span className="text-lg">{mood.emoji}</span>
            <span className="hidden sm:inline">{mood.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
