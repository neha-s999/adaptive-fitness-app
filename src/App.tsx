import React, { useState } from "react";
import WorkoutPlan from "./components/WorkoutPlan";
import { Onboarding } from "./components/Onboarding";
import Devices from "./components/Devices";
import Home from "./components/Home";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";
import {
  Message,
  Device,
  Tab,
  WorkoutSuggestion,
  EnergyLevel,
  WorkoutDay,
} from "./types";
import {
  INITIAL_DEVICES,
  LOCAL_STORAGE_KEYS,
  APP_TITLE,
  initialWorkoutSchedule,
} from "./constants/mockData";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedEnergyLevel, setSelectedEnergyLevel] =
    useState<EnergyLevel | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<WorkoutSuggestion | null>(null);
  const [workouts, setWorkouts] = useState<WorkoutDay[]>(
    initialWorkoutSchedule
  );
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return (
      localStorage.getItem(LOCAL_STORAGE_KEYS.HAS_COMPLETED_ONBOARDING) ===
      "true"
    );
  });

  const handleMessagesChange = (newMessages: Message[]) => {
    setMessages(newMessages);
  };

  const handleDeviceStatusChange = (deviceId: string) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              status:
                device.status === "connected" ? "disconnected" : "connected",
            }
          : device
      )
    );
  };

  const handleWorkoutAdaptation = () => {
    setActiveTab("home");
    setMessages((prev) => [
      ...prev,
      {
        text: "I'd like to adapt my workout plan. Can you help me optimize it based on my current condition?",
        isAI: false,
      },
      {
        text: "I'll help you adapt your workout. How are you feeling today? Let me know about your energy level, any soreness, or specific goals for today.",
        isAI: true,
      },
    ]);
  };

  const handleNavigateToPlans = () => {
    setActiveTab("plan");
  };

  const handleUpdateWorkout = (
    suggestion: WorkoutSuggestion,
    energyLevel: EnergyLevel,
    navigateToPlans: boolean = true
  ) => {
    setSelectedSuggestion(suggestion);
    setSelectedEnergyLevel(energyLevel);
    if (navigateToPlans) {
      handleNavigateToPlans();
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.HAS_COMPLETED_ONBOARDING, "true");
    setHasCompletedOnboarding(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.HAS_COMPLETED_ONBOARDING);
    setHasCompletedOnboarding(false);
  };

  const handleBackClick = () => {
    // Handle back navigation logic here
    console.log("Back clicked");
  };

  const handleProfileClick = () => {
    // Profile menu is now handled in the Header component
  };

  const handleWorkoutsChange = (newWorkouts: WorkoutDay[]) => {
    setWorkouts(newWorkouts);
  };

  const handleCurrentWorkoutIndexChange = (index: number) => {
    setCurrentWorkoutIndex(index);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "plan":
        return (
          <WorkoutPlan
            onAdaptWorkout={handleWorkoutAdaptation}
            energyLevel={selectedEnergyLevel}
            onEnergyLevelUsed={() => {
              setSelectedEnergyLevel(null);
              setSelectedSuggestion(null);
            }}
            selectedSuggestion={selectedSuggestion}
            workouts={workouts}
            onWorkoutsChange={handleWorkoutsChange}
            currentIndex={currentWorkoutIndex}
            onCurrentIndexChange={handleCurrentWorkoutIndexChange}
          />
        );
      case "devices":
        return (
          <Devices
            devices={devices}
            onDeviceStatusChange={handleDeviceStatusChange}
          />
        );
      case "home":
        return (
          <Home
            messages={messages}
            onMessagesChange={handleMessagesChange}
            onNavigateToPlans={handleNavigateToPlans}
            onUpdateWorkout={handleUpdateWorkout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-md mx-auto relative">
      <Header
        title={APP_TITLE}
        onBackClick={handleBackClick}
        onProfileClick={handleProfileClick}
        onRestartOnboarding={resetOnboarding}
      />

      {/* Main Content */}
      <main className="pt-16 pb-20">{renderContent()}</main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Onboarding Modal */}
      {!hasCompletedOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
}
export default App;
