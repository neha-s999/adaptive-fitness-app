import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, User, RefreshCw, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  title: string;
  onBackClick?: () => void;
  onProfileClick?: () => void;
  onRestartOnboarding?: () => void;
}

export default function Header({
  title,
  onBackClick,
  onProfileClick,
  onRestartOnboarding,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileButtonClick = () => {
    setShowMenu(!showMenu);
    onProfileClick?.();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-neutral-800 max-w-md mx-auto">
      <div className="flex items-center justify-between p-4">
        <button className="p-2" onClick={onBackClick}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
        <div className="relative">
          <button
            ref={buttonRef}
            className="p-2"
            onClick={handleProfileButtonClick}
          >
            <User className="w-6 h-6" />
          </button>

          {showMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50"
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={() => {
                    onRestartOnboarding?.();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-700 transition-colors"
                  role="menuitem"
                >
                  <RefreshCw className="w-4 h-4" />
                  Restart Onboarding
                </button>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-700 transition-colors"
                  role="menuitem"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-700 transition-colors"
                  role="menuitem"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
