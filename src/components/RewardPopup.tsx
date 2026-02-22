import { useForestStore } from '../store/useForestStore';
import { Star, MapPin, Package, Inbox } from 'lucide-react';

export default function RewardPopup() {
    const { currentRewardCard, closeRewardPopup } = useForestStore();

    if (!currentRewardCard) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0"
                onClick={closeRewardPopup}
            ></div>

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-[375px] h-[700px] max-h-[90vh] bg-background-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/10 ring-8 ring-white/5 animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="flex-none pt-8 px-6 text-center z-20">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold tracking-wide mb-2 uppercase">
                        <Star className="w-3 h-3" />
                        Tree Level Up!
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col items-center justify-center relative p-6 z-20">
                    {/* God Rays Effect */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                        <div className="w-[600px] h-[600px] god-rays animate-spin-slow opacity-60"></div>
                        <div className="absolute w-[300px] h-[300px] bg-primary/20 blur-[60px] rounded-full"></div>
                    </div>

                    {/* Reward Card Container */}
                    <div className="relative w-full aspect-[3/4] max-w-[280px] animate-float">
                        {/* Card Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-xl blur opacity-40"></div>

                        {/* The Card */}
                        <div className="relative h-full w-full holographic-card rounded-xl flex flex-col p-1 shadow-2xl">

                            {/* Top Section with Rarity */}
                            <div className="p-3 flex justify-between items-start absolute top-0 left-0 right-0 z-20">
                                <div className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 uppercase tracking-wider">
                                    {currentRewardCard.rarity}
                                </div>
                                <Star className="text-yellow-400 fill-yellow-400 w-5 h-5 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                            </div>

                            {/* Image */}
                            <div className="flex-1 bg-[#1a120b] rounded-lg overflow-hidden relative group">
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900 via-[#1a120b] to-black"></div>
                                <img
                                    alt="Legendary Bean"
                                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV6wWsJPdtgLJjDUc85wXobsnfOQ6Pdj78-E0MlcRAcevKluho_tjOcGskuhM-8Gbk-WGXlR_qxSytj05FFG065y2mDor_er9b_zZJEuxv4VWFO9H4K9l6VzzOUB9jQinN2WTv2exbobXBxyEQ5l3c5CsF4iNduof0mSQepf_GR2TZWi6cki7dTdwAEtx6BGtcs3gYuPNh-6IQzWSx_EPreuGl4XzShIVs4qhBLYm1LCVfJMdu4yWLRi-NG87t8CLTgblHja-RJ2XO"
                                />
                            </div>

                            {/* Card Details */}
                            <div className="p-4 bg-gradient-to-b from-[#2a2016] to-[#1c140d] mt-1 rounded-b-lg border-t border-white/5 relative z-20">
                                <h3 className="text-white text-xl font-bold leading-tight mb-1">{currentRewardCard.name}</h3>
                                <div className="flex items-center gap-1 text-[#cbad90] text-xs font-bold uppercase tracking-wider">
                                    <MapPin className="w-3 h-3" />
                                    {currentRewardCard.location}
                                </div>
                            </div>
                        </div>

                        {/* Limited Edition Badge */}
                        <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-6 border-2 border-[#231a10] z-30 flex items-center gap-1 tracking-wider uppercase">
                            Limited Edition
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex-none p-6 pb-8 bg-gradient-to-t from-[#150f08] to-transparent z-20">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight flex-col">Rare Find!</h2>
                        <p className="text-[#cbad90] text-sm leading-relaxed max-w-[280px] mx-auto">
                            You discovered a rare bean variant while nurturing your tree. Add it to your collection.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <button className="w-full group relative overflow-hidden rounded-xl bg-orange-500 hover:bg-orange-400 transition-colors duration-300 p-4 shadow-[0_0_20px_rgba(244,140,37,0.3)]">
                            <div className="flex items-center justify-center gap-2">
                                <Package className="text-white w-5 h-5" />
                                <span className="text-white font-bold text-base tracking-wide uppercase">Get it for real</span>
                                <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">OFFER</span>
                            </div>
                        </button>
                        <button
                            onClick={closeRewardPopup}
                            className="w-full py-3 text-[#cbad90] hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-1"
                        >
                            <Inbox className="w-4 h-4" />
                            Keep collecting
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
