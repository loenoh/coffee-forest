import { useForestStore } from '../store/useForestStore';
import { Coffee, Droplets, TreePine, BookOpen, Settings } from 'lucide-react';

export default function MainDashboard() {
    const { caffeineMg, hydrationL, treeGrowthPercent, addCoffee } = useForestStore();

    const handlePourCoffee = () => {
        // Adding a standard 80mg espresso shot
        addCoffee(80);

        // Optional: Add haptic feedback if supported by browser
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    return (
        <div className="relative w-full max-w-[390px] mx-auto bg-background-light min-h-screen sm:min-h-[844px] sm:h-[844px] sm:rounded-[2.5rem] sm:shadow-float sm:border-[8px] sm:border-white overflow-hidden flex flex-col">
            {/* App Header */}
            <div className="px-6 py-6 flex justify-between items-center">
                <div>
                    <p className="text-sm text-espresso/60">Welcome back,</p>
                    <h3 className="text-xl font-bold text-espresso">My Coffee Forest</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-espresso text-crema flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-xl">person</span>
                </div>
            </div>

            {/* Interactive Area */}
            <div className="flex-1 px-6 flex flex-col items-center justify-center relative">
                {/* Plant */}
                <div className="relative z-10 mb-8 w-full flex justify-center">
                    <div className="w-48 h-48 bg-gradient-to-t from-primary/20 to-transparent rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 blur-2xl"></div>
                    {/* Using a placeholder coffee plant image */}
                    <img
                        alt="Growing Plant"
                        className="w-48 h-auto drop-shadow-2xl relative z-10 animate-[bounce_3s_infinite]"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBqbAVfFea6I13YigTTGszruhohBxTkF9jxpq-fv5HeoVXduQo8lcr1E69Kn1ZILtYSDQj89V6G2O1sjy9D2aOYmgHxUz8yUeV_dPv2NUdFqyrYVSC5TYH5LYX4EOR7JZXP7txVkyN1nr4ZwY5hsgY1D1Q35EvGAeb-dbqhi6BhYkAQXVWnbbqMW1Xut6JozqRYkHYklsaPCXvQxF_3E4uglHUjnkX25MwuV-vec3hW33hP0QC6CRSDRrYfRYjaU9bMQbvG7wIVBcb"
                        style={{ animationTimingFunction: 'cubic-bezier(0.280, 0.840, 0.420, 1)' }}
                    />
                </div>

                {/* Growth Bar */}
                <div className="w-full mb-8">
                    <div className="flex justify-between text-xs font-bold text-espresso/60 mb-2 uppercase tracking-wide">
                        <span>Sprout Stage</span>
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

                {/* Primary Action Button (Pour Coffee) */}
                <button
                    onClick={handlePourCoffee}
                    className="w-full bg-espresso hover:bg-[#3A2A1A] text-white font-bold py-4 rounded-2xl shadow-lg shadow-espresso/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                >
                    <Coffee className="w-5 h-5 group-active:translate-y-1 transition-transform" />
                    <span>Record Coffee</span>
                </button>
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
                <button className="p-2 text-espresso/40 flex flex-col items-center gap-1 hover:text-espresso transition-colors">
                    <Settings className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Settings</span>
                </button>
            </div>
        </div>
    );
}
