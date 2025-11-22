import { IconAlertCircle, IconRotate } from "@tabler/icons-react";

import { Button } from "../ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  subtext?: string;
  onReload?: () => void;
}

export default function ErrorState({
  title = "Couldn't load this section.",
  message = "Looks like we ran into a problem.",
  subtext = "Don't worry, hitting reload should fix the issue.",
  onReload = () => window.location.reload(),
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm p-12 max-w-md w-full">
        {/* Error Illustration */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            {/* Background document shape */}
            <div className="absolute inset-0 bg-gray-200/30 rounded-lg transform -rotate-6"></div>

            {/* Warning triangle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <IconAlertCircle className="w-12 h-12 text-gray-400 stroke-1" />
            </div>

            {/* Error badge */}
            <div className="absolute top-0 right-0 bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded">
              ERROR
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-1">{message}</p>
          <p className="text-sm text-gray-600">{subtext}</p>
        </div>

        {/* Reload Button */}
        <Button
          onClick={onReload}
          className="w-full bg-black text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
        >
          <IconRotate className="w-4 h-4" />
          Reload
        </Button>
      </div>
    </div>
  );
}
