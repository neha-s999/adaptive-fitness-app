// src/components/VoiceInput.tsx
import React, { useState, useCallback } from "react";
import { Mic, Loader2 } from "lucide-react"; // Assuming you're using lucide-react for icons

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  isListening,
  setIsListening,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  const initializeSpeechRecognition = useCallback(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setError("Speech recognition is not supported in this browser.");
      return null;
    }

    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onerror = (event) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      if (event.results[0].isFinal) {
        onTranscript(transcript);
        recognition.stop();
      }
    };

    return recognition;
  }, [onTranscript, setIsListening]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      const newRecognition = recognition || initializeSpeechRecognition();
      if (newRecognition) {
        setRecognition(newRecognition);
        newRecognition.start();
      }
    }
  }, [isListening, recognition, initializeSpeechRecognition, setIsListening]);

  return (
    <button
      onClick={toggleListening}
      className={`p-3 rounded-xl transition-colors ${
        isListening
          ? "bg-green-500 text-black animate-pulse"
          : "bg-neutral-900 text-white hover:bg-neutral-800"
      }`}
      title={isListening ? "Stop listening" : "Start voice input"}
      disabled={!!error}
    >
      {isListening ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
      {error && <span className="sr-only">{error}</span>}
    </button>
  );
};

export default VoiceInput;
