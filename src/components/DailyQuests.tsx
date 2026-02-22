import { X, Target, CheckCircle2, Gift } from 'lucide-react';
import { useForestStore } from '../store/useForestStore';

export default function DailyQuests() {
    const { quests, toggleQuests, claimQuestReward } = useForestStore();

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#fcfaf7] w-full max-w-[390px] rounded-[2rem] shadow-2xl relative animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden">

                {/* Header */}
                <div className="bg-espresso text-white p-6 pb-8 rounded-b-[2rem] shadow-md relative z-10 shrink-0">
                    <button
                        onClick={() => toggleQuests(false)}
                        className="absolute top-6 right-6 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3 mb-2">
                        <Target className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-black">Daily Quests</h2>
                    </div>
                    <p className="text-sm text-white/70">
                        Complete tasks to earn extra growth for your tree!
                    </p>
                </div>

                {/* Quests List */}
                <div className="p-6 space-y-4">
                    {quests.map((quest) => {
                        const progressPercent = Math.min(100, (quest.current / quest.target) * 100);
                        const isClaimed = quest.completed && quest.rewardGrowth === 0;

                        return (
                            <div key={quest.id} className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-espresso/10">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-bold text-espresso">{quest.title}</h3>
                                        <p className="text-xs text-espresso/60 font-medium">Reward: +{quest.rewardGrowth || 10}% Growth</p>
                                    </div>
                                    {isClaimed ? (
                                        <div className="bg-gray-100 text-gray-400 p-2 rounded-xl flex items-center gap-1 text-xs font-bold">
                                            <CheckCircle2 className="w-4 h-4" /> Claimed
                                        </div>
                                    ) : quest.completed ? (
                                        <button
                                            onClick={() => claimQuestReward(quest.id)}
                                            className="bg-primary hover:bg-green-600 text-white p-2 px-3 rounded-xl flex items-center gap-1 text-xs font-bold shadow-lg shadow-primary/30 transition-colors animate-[bounce_2s_infinite]"
                                        >
                                            <Gift className="w-4 h-4" /> Claim
                                        </button>
                                    ) : (
                                        <div className="bg-primary/10 text-primary px-2 py-1 flex items-center justify-center rounded-lg text-xs font-bold">
                                            {quest.current} / {quest.target}
                                        </div>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${quest.completed ? 'bg-primary' : 'bg-espresso'}`}
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
