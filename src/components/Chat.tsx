import React, { useState, useEffect, useRef } from "react";
import { Send, ArrowRight } from "lucide-react";
import VoiceInput from "./VoiceInput";
import { Message, EnergyLevel, WorkoutSuggestion } from "../types";
import { WORKOUT_MODIFICATIONS, AI_RESPONSES } from "../constants/workoutPlans";
import { INITIAL_MESSAGES } from "../constants/mockData";

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-neutral-800 text-white p-4 rounded-2xl max-w-[85%]">
      <div className="flex space-x-2">
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "1500ms" }}
        />
        <div
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "3000ms" }}
        />
      </div>
    </div>
  </div>
);

interface ExtendedMessage extends Message {
  suggestions?: WorkoutSuggestion[];
}

interface ChatProps {
  initialMessages: Message[];
  onMessagesChange?: (messages: Message[]) => void;
  onNavigateToPlans?: () => void;
  onUpdateWorkout?: (
    suggestion: WorkoutSuggestion,
    energyLevel: EnergyLevel,
    navigateToPlans?: boolean
  ) => void;
  onInitialResponseComplete?: () => void;
}

export default function Chat({
  initialMessages,
  onMessagesChange,
  onNavigateToPlans,
  onUpdateWorkout,
  onInitialResponseComplete,
}: ChatProps) {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentEnergyLevel, setCurrentEnergyLevel] =
    useState<EnergyLevel | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  // Scroll on new messages
  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  // Handle initial messages
  useEffect(() => {
    const showInitialMessages = async () => {
      // If we have initialMessages, use them directly
      if (initialMessages.length > 0) {
        setMessages(initialMessages);
        return;
      }

      // Only show welcome animation if this is first mount and we have no messages
      if (!isFirstMount.current || messages.length > 0) {
        return;
      }

      isFirstMount.current = false;

      // Show welcome messages with typing animation
      for (const message of INITIAL_MESSAGES) {
        if (message.isAI) {
          setIsTyping(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        setMessages((prev) => [...prev, message]);
        if (message.isAI) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setIsTyping(false);
        }
      }
    };

    showInitialMessages();
  }, [initialMessages, messages.length]);

  // Cleanup typing indicator on unmount or tab switch
  useEffect(() => {
    return () => {
      setIsTyping(false);
    };
  }, []);

  const updateMessages = (newMessages: ExtendedMessage[]) => {
    setMessages(newMessages);
    onMessagesChange?.(newMessages);
  };

  const detectEnergyLevel = (message: string): EnergyLevel | null => {
    const messageLower = message.toLowerCase();

    const highEnergyKeywords = [
      "high",
      "energetic",
      "motivated",
      "pumped",
      "excited",
      "ready",
      "strong",
      "great",
      "amazing",
      "fantastic",
      "powerful",
      "enthusiastic",
      "eager",
      "active",
      "vigorous",
      "dynamic",
    ];

    const lowEnergyKeywords = [
      "low",
      "tired",
      "exhausted",
      "fatigued",
      "drained",
      "sleepy",
      "lazy",
      "weak",
      "sluggish",
      "unmotivated",
      "lethargic",
      "not feeling",
      "bit down",
      "under the weather",
    ];

    const mediumEnergyKeywords = [
      "medium",
      "moderate",
      "okay",
      "alright",
      "fine",
      "normal",
      "average",
      "balanced",
      "neutral",
    ];

    // Check for negations
    const negations = ["not", "don't", "cant", "can't", "won't", "wouldn't"];
    const hasNegation = negations.some((neg) => messageLower.includes(neg));

    // First check for explicit negations
    if (hasNegation) {
      if (highEnergyKeywords.some((kw) => messageLower.includes(kw))) {
        return "low";
      }
      if (lowEnergyKeywords.some((kw) => messageLower.includes(kw))) {
        return "high";
      }
    }

    // Then check for regular keyword matches
    if (highEnergyKeywords.some((kw) => messageLower.includes(kw))) {
      return "high";
    }
    if (lowEnergyKeywords.some((kw) => messageLower.includes(kw))) {
      return "low";
    }
    if (mediumEnergyKeywords.some((kw) => messageLower.includes(kw))) {
      return "medium";
    }

    return null;
  };

  const handleConfirmWorkout = () => {
    updateMessages([
      ...messages,
      { text: AI_RESPONSES.PLAN_UPDATED, isAI: true },
    ]);
  };

  const addAIResponse = async (
    newMessages: ExtendedMessage[],
    isInitialResponse = false
  ) => {
    setIsTyping(true);
    // Show typing indicator for a natural delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    updateMessages(newMessages);
    setIsTyping(false);

    if (isInitialResponse) {
      // Additional delay before notifying completion to ensure messages are visible
      await new Promise((resolve) => setTimeout(resolve, 500));
      onInitialResponseComplete?.();
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isAI: false };
    updateMessages([...messages, userMessage]);
    setInputMessage("");

    // Check if the input corresponds to selecting an option
    const optionMatch = inputMessage.match(/option (\d+)/i);
    if (optionMatch) {
      const optionIndex = parseInt(optionMatch[1], 10) - 1;
      const lastMessageWithSuggestions = messages
        .slice()
        .reverse()
        .find((msg) => msg.suggestions);
      if (
        lastMessageWithSuggestions &&
        lastMessageWithSuggestions.suggestions
      ) {
        const suggestions = lastMessageWithSuggestions.suggestions;
        if (
          optionIndex >= 0 &&
          optionIndex < suggestions.length &&
          currentEnergyLevel
        ) {
          const selectedSuggestion = suggestions[optionIndex];
          onUpdateWorkout?.(selectedSuggestion, currentEnergyLevel, false);

          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            updateMessages([
              ...messages,
              userMessage,
              { text: `Selected: ${selectedSuggestion.title}`, isAI: false },
              { text: AI_RESPONSES.PLAN_UPDATED, isAI: true },
            ]);
          }, 4000);

          return;
        }
      }
    }

    if (inputMessage.toLowerCase() === "sounds good") {
      addAIResponse(
        [
          ...messages,
          userMessage,
          { text: AI_RESPONSES.INITIAL_RESPONSE, isAI: true },
          { text: AI_RESPONSES.ENERGY_QUERY, isAI: true },
        ],
        true
      );
    } else if (!currentEnergyLevel) {
      const detectedLevel = detectEnergyLevel(inputMessage);
      if (detectedLevel === "low") {
        setCurrentEnergyLevel("low");
        const suggestions = WORKOUT_MODIFICATIONS.low.suggestions.map(
          (workout) => ({
            ...workout,
            description: workout.description || "No description available",
          })
        ) as WorkoutSuggestion[];
        addAIResponse(
          [
            ...messages,
            userMessage,
            { text: AI_RESPONSES.LOW_ENERGY_RESPONSE, isAI: true },
            { text: AI_RESPONSES.MOTIVATION_RESPONSE, isAI: true },
            { text: AI_RESPONSES.SUGGEST_OPTIONS, isAI: true },
            {
              text: suggestions
                .map(
                  (s) =>
                    `${s.title} (${s.duration}, ${s.intensity})\n${s.description}`
                )
                .join("\n\n"),
              isAI: true,
              suggestions,
            },
          ],
          false
        );
      } else if (detectedLevel === "high") {
        setCurrentEnergyLevel("high");
        const suggestions = WORKOUT_MODIFICATIONS.high.suggestions.map(
          (workout) => ({
            ...workout,
            description: workout.description || "No description available",
          })
        ) as WorkoutSuggestion[];
        addAIResponse(
          [
            ...messages,
            userMessage,
            {
              text: "That's great to hear you're feeling energetic! Let's make the most of your high energy levels today.",
              isAI: true,
            },
            { text: AI_RESPONSES.SUGGEST_OPTIONS, isAI: true },
            {
              text: suggestions
                .map(
                  (s) =>
                    `${s.title} (${s.duration}, ${s.intensity})\n${s.description}`
                )
                .join("\n\n"),
              isAI: true,
              suggestions,
            },
          ],
          false
        );
      } else if (detectedLevel === "medium") {
        setCurrentEnergyLevel("medium");
        const suggestions = WORKOUT_MODIFICATIONS.medium.suggestions.map(
          (workout) => ({
            ...workout,
            description: workout.description || "No description available",
          })
        ) as WorkoutSuggestion[];
        addAIResponse(
          [
            ...messages,
            userMessage,
            {
              text: "Sounds like you're feeling balanced today. Let's find a workout that matches your energy level.",
              isAI: true,
            },
            { text: AI_RESPONSES.SUGGEST_OPTIONS, isAI: true },
            {
              text: suggestions
                .map(
                  (s) =>
                    `${s.title} (${s.duration}, ${s.intensity})\n${s.description}`
                )
                .join("\n\n"),
              isAI: true,
              suggestions,
            },
          ],
          false
        );
      }
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputMessage(transcript);
  };

  const renderMessageContent = (message: ExtendedMessage) => {
    if (message.suggestions) {
      return (
        <div className="space-y-2">
          <p>{message.text}</p>
          <div className="space-y-2 mt-4">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  if (currentEnergyLevel && onUpdateWorkout) {
                    onUpdateWorkout(suggestion, currentEnergyLevel);
                  }

                  updateMessages([
                    ...messages,
                    { text: `Selected: ${suggestion.title}`, isAI: false },
                    { text: AI_RESPONSES.PLAN_UPDATED, isAI: true },
                  ]);
                }}
                className="w-full bg-neutral-700 hover:bg-neutral-600 p-3 rounded-xl text-left transition-colors"
              >
                <h4 className="font-semibold">{suggestion.title}</h4>
                <p className="text-sm text-neutral-300">
                  {suggestion.description}
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  {suggestion.duration} • {suggestion.intensity} intensity
                </p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (message.text === AI_RESPONSES.PLAN_UPDATED) {
      return (
        <div className="space-y-2">
          <p>{message.text}</p>
          <button
            onClick={onNavigateToPlans}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg mt-2 hover:bg-neutral-200 transition-colors"
          >
            View Updated Plan
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      );
    }

    if (message.text === AI_RESPONSES.CONFIRM_CHANGE) {
      return (
        <div className="space-y-2">
          <p>{message.text}</p>
          <button
            onClick={handleConfirmWorkout}
            className="bg-white text-black px-4 py-2 rounded-lg mt-2 hover:bg-neutral-200 transition-colors"
          >
            Update Workout Plan
          </button>
        </div>
      );
    }

    return message.text;
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl ${
                message.isAI
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              {renderMessageContent(message)}
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-neutral-800 bg-black"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="How are you feeling today?"
            className="flex-1 bg-neutral-900 text-white placeholder-neutral-500 p-3 rounded-xl border border-neutral-800 focus:outline-none focus:border-neutral-700"
          />
          <VoiceInput
            onTranscript={handleVoiceTranscript}
            isListening={isListening}
            setIsListening={setIsListening}
          />
          <button
            type="submit"
            className="bg-white text-black p-3 rounded-xl hover:bg-neutral-200 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
