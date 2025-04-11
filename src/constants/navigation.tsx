import React from "react";
import { Activity, Smartphone, Calendar } from "lucide-react";
import { Tab } from "../types";

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ReactNode;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Activity className="w-6 h-6" />,
  },
  {
    id: "devices",
    label: "Devices",
    icon: <Smartphone className="w-6 h-6" />,
  },

  {
    id: "plan",
    label: "Plan",
    icon: <Calendar className="w-6 h-6" />,
  },
];
