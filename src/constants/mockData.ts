import { Device, Message, WorkoutDay } from "../types";

export const INITIAL_MESSAGES: Message[] = [
  {
    text: "Hi there 👋🏾 I'm your smart workout buddy. It's simple - I am here to help you train better and with more consistency.",
    isAI: true,
  },
  {
    text: "Here's how it works. I will ask you about how you feel and you can tell me about your sleep quality, energy levels and motivation for the day, and anything else really! Based on that we can work together to find a workout that best meets your needs",
    isAI: true,
  },
  {
    text: "You can choose to type or speak to me. If that sounds good to you, shall we get going? I'm excited!",
    isAI: true,
  },
];

export const INITIAL_DEVICES: Device[] = [
  {
    id: "1",
    name: "Apple Watch Series 8",
    type: "watch",
    status: "connected",
    batteryLevel: 72,
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    type: "phone",
    status: "connected",
    batteryLevel: 85,
  },
  {
    id: "3",
    name: "Garmin Forerunner",
    type: "watch",
    status: "disconnected",
  },
];

export const APP_CONNECTIONS = [
  {
    id: "nike-run",
    name: "Nike Run Club",
    status: "connected",
  },
  {
    id: "strava",
    name: "Strava",
    status: "connected",
  },
  {
    id: "apple-health",
    name: "Apple Health",
    status: "disconnected",
  },
];

export const LOCAL_STORAGE_KEYS = {
  HAS_COMPLETED_ONBOARDING: "hasCompletedOnboarding",
} as const;

export const APP_TITLE = "Nike AI Training" as const;

export const initialWorkoutSchedule: WorkoutDay[] = [
  {
    date: "Monday, Mar 18",
    type: "Cardio",
    title: "HIIT Endurance Run",
    duration: "30 MIN",
    intensity: "High",
    calories: 350,
    videoUrl: "/videos/hiit-run",
    thumbnail:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "Tuesday, Mar 19",
    type: "Upper Body",
    title: "Upper Body Power",
    duration: "45 MIN",
    intensity: "Medium",
    calories: 280,
    videoUrl: "/videos/upper-body",
    thumbnail:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "Wednesday, Mar 20",
    type: "Lower Body",
    title: "Leg Day Strength",
    duration: "50 MIN",
    intensity: "High",
    calories: 400,
    videoUrl: "/videos/leg-day",
    thumbnail:
      "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=800",
  },
];
