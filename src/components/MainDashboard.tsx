import { useForestStore } from '../store/useForestStore';
import { useAuthStore } from '../store/useAuthStore';
import { Coffee, Droplets, TreePine, BookOpen, Settings, LogOut, ShoppingCart } from 'lucide-react';

export default function MainDashboard() {
    const { caffeineMg, hydrationL, treeGrowthPercent, addCoffee, waterPlant, togglePremiumShop } = useForestStore();
    const { user, logout } = useAuthStore();
    const handlePourCoffee = () => {
        addCoffee(80);
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const handleDrinkWater = () => {
        waterPlant(0.25); // Add 250ml of water
        if (navigator.vibrate) navigator.vibrate(50);
    };

    // Calculate Evolution Stage and Debuff (Sick)
    const isSick = caffeineMg >= 400 && hydrationL < 1.5;

    const getTreeVisual = () => {
        if (treeGrowthPercent >= 100) return { emoji: '🌲', label: 'Coffee Tree (Max)' };
        if (treeGrowthPercent >= 70) return { emoji: '🌳', label: 'Mature Tree' };
        if (treeGrowthPercent >= 40) return { emoji: '🪴', label: 'Small Plant' };
        if (treeGrowthPercent >= 20) return { emoji: '🌿', label: 'Seedling' };
        return { emoji: '🌱', label: 'Sprout' };
    };

    const treeVisual = getTreeVisual();

    return (
        <div className="relative w-full max-w-[390px] mx-auto bg-background-light min-h-screen sm:min-h-[844px] sm:h-[844px] sm:rounded-[2.5rem] sm:shadow-float sm:border-[8px] sm:border-white overflow-hidden flex flex-col">
            {/* App Header */}
            <div className="px-6 py-6 flex justify-between items-center">
                <div>
                    <p className="text-sm text-espresso/60">Welcome back,</p>
                    <h3 className="text-xl font-bold text-espresso">My Coffee Forest</h3>
                </div>
                <div className="flex items-center gap-3">
                    {user && (
                        <div className="flex items-center gap-2">
                            {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-white/20" />}
                            <button title="Click to Logout" onClick={logout} className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Interactive Area */}
            <div className="flex-1 px-6 flex flex-col items-center justify-center relative">
                {/* Plant */}
                <div className="relative z-10 mb-8 w-full flex flex-col items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-t from-primary/20 to-transparent rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 blur-2xl z-0"></div>

                    {/* Tree Visual */}
                    <div
                        className={`text-9xl relative z-10 select-none transition-all duration-700
                            ${isSick ? 'grayscale contrast-50 sepia-[.30] opacity-80 animate-none' : 'drop-shadow-2xl animate-[bounce_3s_infinite]'}
                        `}
                        style={{ animationTimingFunction: 'cubic-bezier(0.280, 0.840, 0.420, 1)' }}
                    >
                        {treeVisual.emoji}
                    </div>

                    {/* Sick Warning */}
                    {isSick && (
                        <div className="mt-4 bg-red-500/10 text-red-600 px-4 py-2 rounded-full text-xs font-bold border border-red-500/20 backdrop-blur-md animate-pulse z-20">
                            💧 Your tree is dehydrated! Drink water!
                        </div>
                    )}
                </div>

                {/* Growth Bar */}
                <div className="w-full mb-8">
                    <div className="flex justify-between text-xs font-bold text-espresso/60 mb-2 uppercase tracking-wide">
                        <span>{treeVisual.label}</span>
                        <span className="text-primary">{treeGrowthPercent}%</span>
                    </div>
                    <div className="w-full bg-white h-4 rounded-full p-1 shadow-inner">
                        <div
                            className="bg-gradient-to-r from-primary to-[#4c9a5f] h-full rounded-full relative transition-all duration-1000 ease-out"
                            style={{ width: `${treeGrowthPercent}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-white/50 rounded-full mr-1"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 w-full mb-8">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-foam flex flex-col items-center gap-1">
                        <Coffee className="text-crema w-6 h-6" />
                        <span className="text-xl font-bold text-espresso">{caffeineMg}mg</span>
                        <span className="text-[10px] text-espresso/50 uppercase font-bold tracking-wider">Caffeine</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-foam flex flex-col items-center gap-1">
                        <Droplets className="text-primary w-6 h-6" />
                        <span className="text-xl font-bold text-espresso">{hydrationL}L</span>
                        <span className="text-[10px] text-espresso/50 uppercase font-bold tracking-wider">Hydration</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full">
                    <button
                        onClick={handleDrinkWater}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 group"
                    >
                        <Droplets className="w-5 h-5 group-active:translate-y-1 transition-transform" />
                        <span className="text-sm">+250ml</span>
                    </button>
                    <button
                        onClick={handlePourCoffee}
                        className="flex-[2] bg-espresso hover:bg-[#3A2A1A] text-white font-bold py-4 rounded-2xl shadow-lg shadow-espresso/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        <Coffee className="w-5 h-5 group-active:translate-y-1 transition-transform" />
                        <span>Record Coffee</span>
                    </button>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="h-20 bg-white sm:rounded-b-[2.5rem] rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] mt-auto flex justify-around items-center px-4 pb-2 z-20">
                <button className="p-2 text-primary flex flex-col items-center gap-1">
                    <TreePine className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Forest</span>
                </button>
                <button className="p-2 text-espresso/40 flex flex-col items-center gap-1 hover:text-espresso transition-colors">
                    <BookOpen className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Cards</span>
                </button>
                <button
                    onClick={() => togglePremiumShop(true)}
                    className="p-2 text-espresso/40 flex flex-col items-center gap-1 hover:text-yellow-600 transition-colors"
                >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Shop</span>
                </button>
                <button className="p-2 text-espresso/40 flex flex-col items-center gap-1 hover:text-espresso transition-colors">
                    <Settings className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Settings</span>
                </button>
            </div>
        </div>
    );
}
