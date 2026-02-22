import MainDashboard from './components/MainDashboard';
import RewardPopup from './components/RewardPopup';
import { useForestStore } from './store/useForestStore';

function App() {
  const { showRewardPopup } = useForestStore();

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center sm:p-4">
      <MainDashboard />
      {showRewardPopup && <RewardPopup />}
    </div>
  );
}

export default App;
