import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#0d1117] text-stone-100 select-none">
      {children}
    </div>
  );
};
