import React from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
};

export default App;

