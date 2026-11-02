import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface WebGLFallbackProps {
  error?: string;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  error = 'WebGL 2.0 acceleration is not supported or is disabled in your current browser session.',
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1117] text-stone-100 p-6">
      <div className="max-w-lg w-full minecraft-panel p-8 rounded-lg text-center relative border border-amber-500/30">
        <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold font-cinzel text-amber-300 mb-2">
          3D Canvas Notice
        </h2>
        
        <p className="text-stone-300 text-sm mb-6 leading-relaxed">
          {error}
        </p>

        <div className="bg-stone-900/80 rounded p-4 text-xs text-stone-400 font-mono text-left mb-6 space-y-1">
          <p className="text-amber-400 font-semibold mb-1">To view Afnan's World in full 3D:</p>
          <p>• Enable hardware acceleration in your browser settings</p>
          <p>• Use a modern browser like Chrome, Safari, Firefox, or Edge</p>
          <p>• Ensure your graphics drivers or device OS are up to date</p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="minecraft-btn px-6 py-2.5 rounded text-amber-200 font-medium inline-flex items-center gap-2 cursor-pointer hover:text-amber-100"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Initialization
        </button>
      </div>
    </div>
  );
};

// Helper utility to test WebGL support
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

