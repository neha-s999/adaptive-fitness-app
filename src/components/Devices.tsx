import React from "react";
import { Watch, Smartphone, Bluetooth, X } from "lucide-react";

interface Device {
  id: string;
  name: string;
  type: "watch" | "phone";
  status: "connected" | "disconnected";
  batteryLevel?: number;
}

interface DevicesProps {
  devices: Device[];
  onDeviceStatusChange?: (deviceId: string) => void;
}

export default function Devices({
  devices,
  onDeviceStatusChange,
}: DevicesProps) {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Connected Devices</h2>
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-neutral-900 rounded-2xl p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {device.type === "watch" ? (
                  <Watch className="w-6 h-6" />
                ) : (
                  <Smartphone className="w-6 h-6" />
                )}
                <div>
                  <h3 className="font-semibold">{device.name}</h3>
                  <p className="text-sm text-neutral-400">
                    {device.status === "connected" ? (
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
              <button
                className="p-2 hover:bg-neutral-800 rounded-xl transition-colors"
                onClick={() => onDeviceStatusChange?.(device.id)}
              >
                {device.status === "connected" ? (
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
}
