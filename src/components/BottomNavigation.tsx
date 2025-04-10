import React from "react";
import { Tab } from "../types";
import { NAV_ITEMS } from "../constants/navigation";

interface BottomNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-neutral-800 max-w-md mx-auto">
      <div className="flex justify-around p-4">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center space-y-1 ${
              activeTab === item.id ? "text-white" : "text-neutral-500"
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
