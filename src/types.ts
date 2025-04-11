export interface WorkoutDay {
  id: string;
  date: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
  }>;
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
  description?: string;
}

export interface WorkoutSuggestion {
  id: string;
  title: string;
  description: string;
  type:
    | "Yoga"
    | "High Intensity"
    | "Strength"
    | "Cardio"
    | "Mixed"
    | "Lower Body";
  duration: string;
  intensity: string;
  thumbnail: string;
}

export interface Message {
  text: string;
  isAI: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: "watch" | "phone";
  status: "connected" | "disconnected";
  batteryLevel?: number;
}

export type Tab = "home" | "plan" | "devices";

export type EnergyLevel = "low" | "medium" | "high";
