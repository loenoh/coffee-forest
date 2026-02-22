import MainDashboard from './components/MainDashboard';
import RewardPopup from './components/RewardPopup';
import { useForestStore } from './store/useForestStore';
import { useFirestoreSync } from './hooks/useFirestoreSync';

function App() {
  const { showRewardPopup } = useForestStore();
  useFirestoreSync();

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center sm:p-4">
      <MainDashboard />
      {showRewardPopup && <RewardPopup />}
    </div>
  );
}

export default App;
