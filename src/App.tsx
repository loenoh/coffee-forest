import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import MainDashboard from './components/MainDashboard';
import RewardPopup from './components/RewardPopup';
import PremiumShop from './components/PremiumShop';
import CollectionBook from './components/CollectionBook';
import DailyQuests from './components/DailyQuests';
import LandingPage from './pages/LandingPage';
import { useForestStore } from './store/useForestStore';
import { useFirestoreSync } from './hooks/useFirestoreSync';
import { useAuthStore } from './store/useAuthStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function App() {
  const { showRewardPopup, showPremiumShop, showCollectionBook, showQuests } = useForestStore();
  useFirestoreSync();

  const paypalOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
    currency: 'USD',
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <Router>
        <div className="bg-slate-200 min-h-screen flex items-center justify-center sm:p-4 font-sans">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          {showRewardPopup && <RewardPopup />}
          {showPremiumShop && <PremiumShop />}
          {showCollectionBook && <CollectionBook />}
          {showQuests && <DailyQuests />}
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
