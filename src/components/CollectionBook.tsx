import { X, BookOpen, Lock } from 'lucide-react';
import { useForestStore } from '../store/useForestStore';

// Mock list of all available beans for the UI
const ALL_CARDS = [
    { id: '1', name: 'Arabica', rarity: 'Common', location: 'Ethiopia', icon: '☕', description: 'The foundation of modern coffee.' },
    { id: '2', name: 'Robusta', rarity: 'Common', location: 'Vietnam', icon: '🌿', description: 'Strong, earthy, and highly caffeinated.' },
    { id: '3', name: 'Liberica', rarity: 'Rare', location: 'Liberia', icon: '🌸', description: 'A rare bean with a unique floral and fruity aroma.' },
    { id: '4', name: 'Geisha', rarity: 'Legendary', location: 'Panama', icon: '✨', description: 'The world\'s most coveted coffee bean.' },
    { id: '5', name: 'Blue Mountain', rarity: 'Legendary', location: 'Jamaica', icon: '🏔️', description: 'Exceptionally smooth, mild, and lacking bitterness.' },
];

export default function CollectionBook() {
    const { toggleCollectionBook, collectedCards } = useForestStore();

    // Map collected cards by name to check ownership
    const ownedCardNames = new Set(collectedCards.map(c => c.name));

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#fcfaf7] w-full max-w-[390px] h-[80vh] max-h-[700px] rounded-[2rem] shadow-2xl relative animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden">

                {/* Header */}
                <div className="bg-espresso text-white p-6 pb-8 rounded-b-[2rem] shadow-md relative z-10 shrink-0">
                    <button
                        onClick={() => toggleCollectionBook(false)}
                        className="absolute top-6 right-6 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="w-8 h-8 text-crema" />
                        <h2 className="text-2xl font-black">Bean Collection</h2>
                    </div>
                    <p className="text-sm text-white/70">
                        Collect rare beans by recording your coffee daily!
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-6 flex items-center gap-3">
                        <div className="text-xs font-bold w-12 text-right">{ownedCardNames.size} / {ALL_CARDS.length}</div>
                        <div className="flex-1 bg-black/40 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-crema h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${(ownedCardNames.size / ALL_CARDS.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Card Grid Scroll Area */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4 pb-12 content-start">
                    {ALL_CARDS.map((card, index) => {
                        const isOwned = ownedCardNames.has(card.name);
                        const isLegendary = card.rarity === 'Legendary';

                        return (
                            <div
                                key={card.id}
                                className={`relative group rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-500
                                    ${isOwned
                                        ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-espresso/10 cursor-pointer hover:-translate-y-1'
                                        : 'bg-gray-100 border border-gray-200 opacity-60 grayscale'}
                                `}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Rarity Badge */}
                                {isOwned && isLegendary && (
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm">
                                        Rare
                                    </div>
                                )}

                                {/* Icon / Image */}
                                <div className={`text-4xl mb-3 ${!isOwned ? 'opacity-20' : ''}`}>
                                    {isOwned ? card.icon : <Lock className="w-8 h-8 text-gray-400" />}
                                </div>

                                <h4 className={`text-sm font-bold text-center mb-1 ${isOwned ? 'text-espresso' : 'text-gray-500'}`}>
                                    {isOwned ? card.name : 'Unknown'}
                                </h4>

                                {isOwned && (
                                    <span className="text-[10px] text-espresso/50 uppercase font-bold tracking-wider text-center">
                                        {card.location}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
