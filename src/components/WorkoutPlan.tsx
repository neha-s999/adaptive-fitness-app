import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkoutDay {
  date: string;
  type: string;
  title: string;
  duration: string;
  intensity: string;
  calories: number;
  videoUrl: string;
  thumbnail: string;
}

const workoutSchedule: WorkoutDay[] = [
  {
    date: "Monday, Mar 18",
    type: "Cardio",
    title: "HIIT Endurance Run",
    duration: "30 MIN",
    intensity: "High",
    calories: 350,
    videoUrl: "/videos/hiit-run",
    thumbnail: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800"
  },
  {
    date: "Tuesday, Mar 19",
    type: "Upper Body",
    title: "Upper Body Power",
    duration: "45 MIN",
    intensity: "Medium",
    calories: 280,
    videoUrl: "/videos/upper-body",
    thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800"
  },
  {
    date: "Wednesday, Mar 20",
    type: "Lower Body",
    title: "Leg Day Strength",
    duration: "50 MIN",
    intensity: "High",
    calories: 400,
    videoUrl: "/videos/leg-day",
    thumbnail: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=800"
  },
  {
    date: "Thursday, Mar 21",
    type: "Rest",
    title: "Active Recovery",
    duration: "20 MIN",
    intensity: "Low",
    calories: 100,
    videoUrl: "/videos/recovery",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
  },
  // ... More days
];

export default function WorkoutPlan() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const weeks = ["Mar 18 - 24", "Mar 25 - 31"];

  return (
    <div className="min-h-screen bg-black">
      {/* Week Selector */}
      <div className="p-4 flex items-center justify-between border-b border-neutral-800">
        <button 
          onClick={() => setSelectedWeek(0)}
          className={`px-4 py-2 rounded-xl ${selectedWeek === 0 ? 'bg-white text-black' : 'text-white'}`}
        >
          Week 1
        </button>
        <button 
          onClick={() => setSelectedWeek(1)}
          className={`px-4 py-2 rounded-xl ${selectedWeek === 1 ? 'bg-white text-black' : 'text-white'}`}
        >
          Week 2
        </button>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between p-4">
        <button className="p-2">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">{weeks[selectedWeek]}</h2>
        <button className="p-2">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Workout List */}
      <div className="p-4 space-y-4">
        {workoutSchedule.map((workout, index) => (
          <div key={index} className="bg-neutral-900 rounded-2xl overflow-hidden">
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
                <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                  {workout.type}
                </span>
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
        ))}
      </div>
    </div>
  );
}