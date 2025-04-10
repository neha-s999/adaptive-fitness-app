import React, { useState } from 'react';
import { MessageSquare, Dumbbell, Activity, Calendar, User, Send, ChevronLeft, Play, Smartphone, Watch, Bluetooth, X } from 'lucide-react';
import WorkoutPlan from './components/WorkoutPlan';

interface Message {
  text: string;
  isAI: boolean;
}

interface Device {
  id: string;
  name: string;
  type: 'watch' | 'phone';
  status: 'connected' | 'disconnected';
  batteryLevel?: number;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to Nike AI Training! How's your energy level today? Let's customize your workout.", isAI: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [devices] = useState<Device[]>([
    { id: '1', name: 'Apple Watch Series 8', type: 'watch', status: 'connected', batteryLevel: 72 },
    { id: '2', name: 'iPhone 15 Pro', type: 'phone', status: 'connected', batteryLevel: 85 },
    { id: '3', name: 'Garmin Forerunner', type: 'watch', status: 'disconnected' }
  ]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, isAI: false }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I understand your energy levels. I've adjusted today's Nike Training Club workout to match how you're feeling.", 
        isAI: true 
      }]);
    }, 1000);
    setInputMessage('');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'plan':
        return <WorkoutPlan />;
      case 'devices':
        return (
          <div className="p-4 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Connected Devices</h2>
              {devices.map(device => (
                <div 
                  key={device.id}
                  className="bg-neutral-900 rounded-2xl p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {device.type === 'watch' ? (
                        <Watch className="w-6 h-6" />
                      ) : (
                        <Smartphone className="w-6 h-6" />
                      )}
                      <div>
                        <h3 className="font-semibold">{device.name}</h3>
                        <p className="text-sm text-neutral-400">
                          {device.status === 'connected' ? (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                              Connected
                              {device.batteryLevel && ` • ${device.batteryLevel}%`}
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                              Disconnected
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-neutral-800 rounded-xl transition-colors">
                      {device.status === 'connected' ? (
                        <X className="w-5 h-5 text-neutral-400" />
                      ) : (
                        <Bluetooth className="w-5 h-5 text-neutral-400" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Available Devices</h2>
              <button className="w-full bg-neutral-900 rounded-2xl p-4 text-center text-neutral-400">
                Scan for new devices
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">App Connections</h2>
              <div className="space-y-3">
                <div className="bg-neutral-900 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Nike Run Club</h3>
                    <p className="text-sm text-green-500">Connected</p>
                  </div>
                  <button className="text-sm text-neutral-400">Disconnect</button>
                </div>
                <div className="bg-neutral-900 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Strava</h3>
                    <p className="text-sm text-green-500">Connected</p>
                  </div>
                  <button className="text-sm text-neutral-400">Disconnect</button>
                </div>
                <div className="bg-neutral-900 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Apple Health</h3>
                    <p className="text-sm text-neutral-400">Not connected</p>
                  </div>
                  <button className="text-sm text-white">Connect</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'home':
        return (
          <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Today's Workout */}
            <div className="relative">
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
                  <p className="text-neutral-300 text-sm">30 MIN • High Intensity • 350 kcal</p>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        message.isAI
                          ? 'bg-neutral-800 text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
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
                  <button
                    type="submit"
                    className="bg-white text-black p-3 rounded-xl hover:bg-neutral-200 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-md mx-auto relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-neutral-800 max-w-md mx-auto">
        <div className="flex items-center justify-between p-4">
          <button className="p-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">Nike AI Trainer</h1>
          <button className="p-2">
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-neutral-800 max-w-md mx-auto">
        <div className="flex justify-around p-4">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-white' : 'text-neutral-500'}`}
          >
            <Activity className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('devices')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'devices' ? 'text-white' : 'text-neutral-500'}`}
          >
            <Smartphone className="w-6 h-6" />
            <span className="text-xs">Devices</span>
          </button>
          <button 
            onClick={() => setActiveTab('train')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'train' ? 'text-white' : 'text-neutral-500'}`}
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-xs">Train</span>
          </button>
          <button 
            onClick={() => setActiveTab('plan')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'plan' ? 'text-white' : 'text-neutral-500'}`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Plan</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;