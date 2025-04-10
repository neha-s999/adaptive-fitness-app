export interface WorkoutDay {
  date: string;
  type: string;
  title: string;
  duration: string;
  intensity: string;
  calories: number;
  videoUrl: string;
  thumbnail: string;
  isAiModified?: boolean;
  originalPlan?: WorkoutDay;
  aiReasoning?: string;
}

export interface WorkoutSuggestion {
  title: string;
  type:
    | "Yoga"
    | "High Intensity"
    | "Strength"
    | "Cardio"
    | "Mixed"
    | "Lower Body";
  duration: string;
  intensity: string;
  description: string;
  thumbnail: string;
}
