import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 2;

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      setIsLoading(true);
      // Simulate setup process
      setTimeout(() => {
        setIsLoading(false);
        onComplete();
      }, 2000);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-md text-center space-y-4">
          <Loader2 className="w-10 h-10 text-green-500 animate-spin mx-auto" />
          <p className="text-xl font-semibold text-white">
            We are setting you up...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 w-12 rounded-full transition-colors duration-300 ${
                idx === currentStep ? "bg-green-500" : "bg-neutral-800"
              }`}
            />
          ))}
        </div>

        <div className="bg-neutral-900 rounded-3xl p-8 shadow-xl">
          {currentStep === 0 ? (
            // Step 1: Smart Workouts Introduction
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-green-500" />
                </div>
              </div>

              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">
                  Introducing Smart Workouts
                </h2>
                <p className="text-neutral-400">
                  Workout plans that adapt to your energy and motivation EVERY
                  day!
                </p>
                <p className="text-neutral-400">
                  Do more based on how you feel.
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-green-500 text-black font-semibold py-4 rounded-xl hover:bg-green-400 transition-colors"
              >
                Show me more
              </button>
            </div>
          ) : (
            // Step 2: Permissions
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Permissions Needed</h2>
                <p className="text-neutral-400">
                  Your fitness buddy will ask you about your well-being and
                  provide recommendations so you don't miss any workouts. We'll
                  need the following access:
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Access to your profile data",
                  "Microphone access for voice check-ins",
                ].map((permission, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 bg-neutral-800 p-4 rounded-xl"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-white">{permission}</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleBack}
                  className="flex-1 border border-neutral-800 text-white font-semibold py-4 rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-green-500 text-black font-semibold py-4 rounded-xl hover:bg-green-400 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
