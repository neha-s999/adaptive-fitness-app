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

export type Tab = "home" | "devices" | "train" | "plan";

export interface AppConnection {
  id: string;
  name: string;
  status: "connected" | "disconnected";
}

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
  originalPlan?: Omit<WorkoutDay, "originalPlan" | "isAiModified">;
  aiReasoning?: string;
  description?: string;
}

export type EnergyLevel = "high" | "medium" | "low";

export interface WorkoutSuggestion {
  title: string;
  type: string;
  duration: string;
  intensity: string;
  description: string;
}
