import React, { useState, useEffect } from "react";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Brain,
  RefreshCw,
} from "lucide-react";
import { WorkoutDay, EnergyLevel, WorkoutSuggestion } from "../types";
import { modifyWorkout } from "../constants/workoutPlans";

interface WorkoutPlanProps {
  onAdaptWorkout: () => void;
  energyLevel: EnergyLevel | null;
  onEnergyLevelUsed: () => void;
  selectedSuggestion: WorkoutSuggestion | null;
  workouts: WorkoutDay[];
  onWorkoutsChange: (workouts: WorkoutDay[]) => void;
  currentIndex: number;
  onCurrentIndexChange: (index: number) => void;
}

export default function WorkoutPlan({
  onAdaptWorkout,
  energyLevel,
  onEnergyLevelUsed,
  selectedSuggestion,
  workouts,
  onWorkoutsChange,
  currentIndex,
  onCurrentIndexChange,
}: WorkoutPlanProps) {
  const [hideOriginal, setHideOriginal] = useState(false);

  const currentWorkout = workouts[currentIndex];

  // Handle workout modification when energy level changes
  useEffect(() => {
    if (energyLevel && currentWorkout) {
      const modifiedWorkout = modifyWorkout(
        currentWorkout,
        energyLevel,
        selectedSuggestion || undefined
      );
      const newWorkouts = [...workouts];
      newWorkouts[currentIndex] = modifiedWorkout;
      onWorkoutsChange(newWorkouts);
      onEnergyLevelUsed();
    }
  }, [energyLevel, currentWorkout, currentIndex, selectedSuggestion]);

  useEffect(() => {
    if (currentWorkout?.isAiModified) {
      setHideOriginal(false);
    }
  }, [currentWorkout?.isAiModified]);

  const handlePrevDay = () => {
    if (currentIndex > 0) {
      onCurrentIndexChange(currentIndex - 1);
      setHideOriginal(false);
    }
  };

  const handleNextDay = () => {
    if (currentIndex < workouts.length - 1) {
      onCurrentIndexChange(currentIndex + 1);
      setHideOriginal(false);
    }
  };

  const adaptWorkout = () => {
    onAdaptWorkout();
  };

  const selectAiVersion = () => {
    setHideOriginal(true);
  };

  const restoreOriginalPlan = () => {
    if (currentWorkout.originalPlan) {
      const restoredWorkout: WorkoutDay = {
        ...currentWorkout.originalPlan,
        isAiModified: false,
        originalPlan: undefined,
        aiReasoning: undefined,
      };

      const newWorkouts = [...workouts];
      newWorkouts[currentIndex] = restoredWorkout;
      onWorkoutsChange(newWorkouts);
      setHideOriginal(false);
    }
  };

  const WorkoutCard = ({
    workout,
    isOriginal = false,
  }: {
    workout: WorkoutDay;
    isOriginal?: boolean;
  }) => (
    <div
      className={`bg-neutral-900 rounded-2xl overflow-hidden ${
        isOriginal
          ? "opacity-75 cursor-pointer hover:opacity-90 transition-opacity"
          : ""
      }`}
      onClick={isOriginal ? restoreOriginalPlan : undefined}
    >
      <div className="relative h-48">
        <img
          src={workout.thumbnail}
          alt={workout.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <button className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full p-4">
            <Play className="w-6 h-6 text-black" />
          </div>
        </button>
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full inline-block">
              {workout.type}
            </span>
            {workout.isAiModified && !isOriginal && (
              <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1">
                <Brain className="w-3 h-3" />
                AI Adapted
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold">{workout.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-neutral-400">{workout.date}</span>
          <span className="font-medium">{workout.duration}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-400">
            {workout.intensity} intensity • {workout.calories} kcal
          </span>
          <span className="bg-neutral-800 px-3 py-1 rounded-full">
            Not Started
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        <button
          onClick={handlePrevDay}
          disabled={currentIndex === 0}
          className={`p-2 ${
            currentIndex === 0 ? "text-neutral-600" : "text-white"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">{currentWorkout.date}</h2>
        <button
          onClick={handleNextDay}
          disabled={currentIndex === workouts.length - 1}
          className={`p-2 ${
            currentIndex === workouts.length - 1
              ? "text-neutral-600"
              : "text-white"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Workout Display */}
      <div className="p-4 space-y-6">
        {/* Current Workout */}
        <div className="space-y-4">
          {currentWorkout.isAiModified &&
            currentWorkout.originalPlan &&
            !hideOriginal && (
              <>
                <div className="flex items-center gap-2 text-neutral-400">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm">Original Plan</span>
                </div>
                <div className="cursor-pointer" onClick={restoreOriginalPlan}>
                  <WorkoutCard
                    workout={currentWorkout.originalPlan}
                    isOriginal
                  />
                </div>
              </>
            )}

          {currentWorkout.isAiModified &&
            currentWorkout.originalPlan &&
            !hideOriginal && (
              <div className="flex items-center gap-2 text-neutral-400">
                <Brain className="w-4 h-4" />
                <span className="text-sm">AI Adapted Version</span>
              </div>
            )}

          <div
            onClick={currentWorkout.isAiModified ? selectAiVersion : undefined}
          >
            <WorkoutCard workout={currentWorkout} />
          </div>

          {/* Exercise Details Section */}
          <div className="mt-6 bg-neutral-900 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4">Workout Details</h3>
            <div className="space-y-4">
              {currentWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-neutral-800 last:border-0"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{exercise.name}</h4>
                    <p className="text-sm text-neutral-400">
                      {exercise.sets} sets × {exercise.reps}{" "}
                      {exercise.reps === 1 ? "rep" : "reps"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-neutral-800 px-3 py-1 rounded-full text-sm">
                      Set {index + 1}/{currentWorkout.exercises.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentWorkout.isAiModified && currentWorkout.aiReasoning && (
            <div className="bg-neutral-800 rounded-xl p-4 text-sm text-neutral-300">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-green-500" />
                <span className="font-medium text-white">AI Reasoning</span>
              </div>
              {currentWorkout.aiReasoning}
            </div>
          )}
        </div>

        {/* AI Adaptation Button */}
        <button
          onClick={adaptWorkout}
          disabled={currentWorkout.isAiModified}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 ${
            currentWorkout.isAiModified
              ? "bg-neutral-800 text-neutral-400"
              : "bg-green-500 text-black hover:bg-green-400"
          }`}
        >
          <Brain className="w-5 h-5" />
          {currentWorkout.isAiModified
            ? "Workout Already Adapted"
            : "Adapt Workout with AI"}
        </button>
      </div>
    </div>
  );
}
