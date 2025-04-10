import React, { useState } from "react";
import { Play } from "lucide-react";
import Chat from "./Chat";
import { Message, WorkoutSuggestion, EnergyLevel } from "../types";

interface HomeProps {
  messages: Message[];
  onMessagesChange?: (messages: Message[]) => void;
  onNavigateToPlans?: () => void;
  onUpdateWorkout?: (
    suggestion: WorkoutSuggestion,
    energyLevel: EnergyLevel
  ) => void;
}

export default function Home({
  messages,
  onMessagesChange,
  onNavigateToPlans,
  onUpdateWorkout,
}: HomeProps) {
  const [showWorkout, setShowWorkout] = useState(false);

  // Remove the useEffect that watches messages
  const handleInitialResponseComplete = () => {
    setShowWorkout(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Today's Workout - Only show after "sounds good" response is complete */}
      {showWorkout && (
        <div className="relative animate-fadeIn">
          <div className="relative h-64">
            <img
              src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800"
              alt="Today's Workout"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <button className="absolute right-4 bottom-20 bg-white rounded-full p-4">
              <Play className="w-6 h-6 text-black" />
            </button>
            <div className="absolute bottom-0 left-0 p-4">
              <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                TODAY'S WORKOUT
              </span>
              <h2 className="text-2xl font-bold mb-1">HIIT Cardio</h2>
              <p className="text-neutral-300 text-sm">
                30 MIN • High Intensity • 350 kcal
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Section */}
      <Chat
        initialMessages={messages}
        onMessagesChange={onMessagesChange}
        onNavigateToPlans={onNavigateToPlans}
        onUpdateWorkout={onUpdateWorkout}
        onInitialResponseComplete={handleInitialResponseComplete}
      />
    </div>
  );
}
