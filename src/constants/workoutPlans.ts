import { WorkoutDay, EnergyLevel, WorkoutSuggestion } from "../types";

interface WorkoutModification {
  intensityMultiplier: number;
  durationMultiplier: number;
  caloriesMultiplier: number;
  aiReasoning: string;
  suggestions: WorkoutDay[];
}

type WorkoutModifications = {
  [K in EnergyLevel]: WorkoutModification;
};

// Add workout type image mappings
const WORKOUT_TYPE_IMAGES = {
  Yoga: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=800",
  "High Intensity":
    "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800",
  Strength:
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800",
  Cardio:
    "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800",
  Mixed:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
  "Lower Body":
    "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=800",
} as const;

export const ENERGY_LEVELS: Record<Uppercase<EnergyLevel>, EnergyLevel> = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

export const WORKOUT_MODIFICATIONS: WorkoutModifications = {
  high: {
    intensityMultiplier: 1.2,
    durationMultiplier: 1.15,
    caloriesMultiplier: 1.25,
    aiReasoning:
      "Based on your high energy levels, I've intensified your workout to maximize your potential. I've increased the intensity and added more challenging exercises to help you achieve better results.",
    suggestions: [
      {
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        title: "Power HIIT Circuit",
        type: "High Intensity",
        duration: "45 MIN",
        intensity: "High",
        description:
          "An intense circuit combining polymetrics and strength training",
        thumbnail: WORKOUT_TYPE_IMAGES["High Intensity"],
        calories: 400,
        videoUrl: "/videos/power-hiit-circuit",
        id: "1",
        exercises: [],
      },
      {
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        title: "Advanced Strength Training",
        type: "Strength",
        duration: "60 MIN",
        intensity: "High",
        description: "Heavy lifting with compound exercises for maximum gains",
        thumbnail: WORKOUT_TYPE_IMAGES.Strength,
        calories: 450,
        videoUrl: "/videos/advanced-strength",
        id: "2",
        exercises: [],
      },
    ],
  },
  medium: {
    intensityMultiplier: 1,
    durationMultiplier: 1,
    caloriesMultiplier: 1,
    aiReasoning:
      "I've maintained your regular workout intensity while focusing on balanced exercises that match your current energy level.",
    suggestions: [
      {
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        title: "Balanced Workout Mix",
        type: "Mixed",
        duration: "40 MIN",
        intensity: "Medium",
        description:
          "A well-rounded combination of cardio and strength exercises",
        thumbnail: WORKOUT_TYPE_IMAGES.Mixed,
        calories: 300,
        videoUrl: "/videos/balanced-mix",
        id: "3",
        exercises: [],
      },
      {
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        title: "Moderate Cardio Plus",
        type: "Cardio",
        duration: "35 MIN",
        intensity: "Medium",
        description: "Steady-state cardio with intervals for variety",
        thumbnail: WORKOUT_TYPE_IMAGES.Cardio,
        calories: 280,
        videoUrl: "/videos/moderate-cardio",
        id: "4",
        exercises: [],
      },
    ],
  },
  low: {
    intensityMultiplier: 0.7,
    durationMultiplier: 0.8,
    caloriesMultiplier: 0.75,
    aiReasoning:
      "I've adapted your workout to be more manageable while still being effective. I've reduced the intensity and focused on mobility and lighter exercises to help you stay active without overexertion.",
    suggestions: [
      {
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        title: "Yoga Vinyasa Flow",
        type: "Yoga",
        duration: "30 MIN",
        intensity: "Low",
        description:
          "A gentle flow combining breath with movement for flexibility and mindfulness",
        thumbnail: WORKOUT_TYPE_IMAGES.Yoga,
        calories: 200,
        videoUrl: "/videos/yoga-vinyasa",
        id: "5",
        exercises: [],
      },
      {
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        title: "Low Intensity Legs",
        type: "Lower Body",
        duration: "25 MIN",
        intensity: "Low",
        description:
          "A gentle lower body workout focusing on mobility and muscle activation",
        thumbnail: WORKOUT_TYPE_IMAGES["Lower Body"],
        calories: 180,
        videoUrl: "/videos/low-intensity-legs",
        id: "6",
        exercises: [],
      },
    ],
  },
};

export const AI_RESPONSES = {
  INITIAL_RESPONSE:
    "Alright then. As per your plan, this is what is in store for today",
  ENERGY_QUERY:
    "How motivated do you feel today after your 45 min upper body strength workout yesterday? Do you feel high or low on energy?",
  LOW_ENERGY_RESPONSE:
    "I understand you're feeling low on energy today. Your sleep score also tells me you didn't catch the perfect sleep last night. Happens, no?",
  MOTIVATION_RESPONSE:
    "But I am glad you feel like moving. Let me suggest you some workout options that won't be too demanding but will still allow you to move well",
  SUGGEST_OPTIONS:
    "Here are two workout options that would be perfect for you today:",
  CONFIRM_CHANGE: "Great choice. Let me set that up for you quickly.",
  PLAN_UPDATED:
    "I've updated your workout plan with your selected option. You can start whenever you're ready.",
} as const;

export function modifyWorkout(
  workout: WorkoutDay,
  energyLevel: EnergyLevel,
  selectedSuggestion?: WorkoutSuggestion
): WorkoutDay {
  const modification = WORKOUT_MODIFICATIONS[energyLevel];

  // If a specific suggestion was selected, use its details
  if (selectedSuggestion) {
    const workoutType =
      selectedSuggestion.type as keyof typeof WORKOUT_TYPE_IMAGES;
    return {
      ...workout,
      isAiModified: true,
      originalPlan: { ...workout },
      type: selectedSuggestion.type,
      title: selectedSuggestion.title,
      duration: selectedSuggestion.duration,
      intensity: selectedSuggestion.intensity,
      calories: selectedSuggestion.type.toLowerCase().includes("yoga")
        ? 200
        : selectedSuggestion.intensity === "High"
        ? 400
        : selectedSuggestion.intensity === "Medium"
        ? 300
        : 250,
      thumbnail: WORKOUT_TYPE_IMAGES[workoutType],
      videoUrl: `/videos/${selectedSuggestion.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      aiReasoning: `I've adapted your workout to ${selectedSuggestion.title}. ${modification.aiReasoning}`,
      id: selectedSuggestion.id,
    };
  }

  // Default modification if no specific suggestion was selected
  return {
    ...workout,
    isAiModified: true,
    originalPlan: { ...workout },
    intensity:
      energyLevel === "high"
        ? "High"
        : energyLevel === "medium"
        ? "Medium"
        : "Low",
    duration: `${Math.round(
      parseInt(workout.duration) * modification.durationMultiplier
    )} MIN`,
    calories: Math.round(workout.calories * modification.caloriesMultiplier),
    aiReasoning: modification.aiReasoning,
    id: "7",
    exercises: [],
  };
}
