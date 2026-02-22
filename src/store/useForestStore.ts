import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Card {
    id: string;
    name: string;
    rarity: 'Common' | 'Rare' | 'Legendary';
    location: string;
    imageUrl?: string;
}

interface Quest {
    id: string;
    title: string;
    type: 'coffee' | 'water';
    current: number;
    target: number;
    completed: boolean;
    rewardGrowth: number;
}

interface ForestState {
    // User Stats
    caffeineMg: number;
    hydrationL: number;
    streak: number;
    treeGrowthPercent: number;
    quests: Quest[];

    // UI State
    showRewardPopup: boolean;
    showPremiumShop: boolean;
    showCollectionBook: boolean;
    showQuests: boolean;
    collectedCards: Card[];
    currentRewardCard: Card | null;

    // Actions
    addCoffee: (mg: number) => void;
    waterPlant: (liters: number) => void;
    closeRewardPopup: () => void;
    togglePremiumShop: (isOpen: boolean) => void;
    toggleCollectionBook: (isOpen: boolean) => void;
    toggleQuests: (isOpen: boolean) => void;
    claimQuestReward: (questId: string) => void;
}

export const useForestStore = create<ForestState>()(
    persist(
        (set) => ({
            caffeineMg: 240,
            hydrationL: 1.2,
            streak: 5,
            treeGrowthPercent: 75,

            showRewardPopup: false,
            showPremiumShop: false,
            showCollectionBook: false,
            showQuests: false,
            collectedCards: [],
            currentRewardCard: null,
            quests: [
                { id: 'q1', title: 'Record 2 Coffees', type: 'coffee', current: 0, target: 2, completed: false, rewardGrowth: 10 },
                { id: 'q2', title: 'Drink 1L Water', type: 'water', current: 0, target: 1, completed: false, rewardGrowth: 10 }
            ],

            addCoffee: (mg: number) => set((state: ForestState) => {
                // Add coffee triggers a potential reward
                const newGrowth = Math.min(100, state.treeGrowthPercent + 5);

                // Update quests
                const newQuests = state.quests.map(q => {
                    if (q.type === 'coffee' && !q.completed) {
                        const newCurrent = q.current + 1;
                        return { ...q, current: newCurrent, completed: newCurrent >= q.target };
                    }
                    return q;
                });

                // 20% chance to find a rare bean on adding coffee
                const isLucky = Math.random() < 0.2;
                let rewardObj = null;
                let popupStatus = false;

                if (isLucky) {
                    rewardObj = {
                        id: crypto.randomUUID(),
                        name: 'Blue Mountain',
                        rarity: 'Legendary' as const,
                        location: 'Jamaica',
                    };
                    popupStatus = true;
                }

                return {
                    caffeineMg: state.caffeineMg + mg,
                    treeGrowthPercent: newGrowth,
                    showRewardPopup: popupStatus,
                    currentRewardCard: rewardObj,
                    collectedCards: rewardObj ? [...state.collectedCards, rewardObj] : state.collectedCards,
                    quests: newQuests
                };
            }),

            waterPlant: (liters: number) => set((state: ForestState) => {
                const newQuests = state.quests.map(q => {
                    if (q.type === 'water' && !q.completed) {
                        const newCurrent = +(q.current + liters).toFixed(1);
                        return { ...q, current: newCurrent, completed: newCurrent >= q.target };
                    }
                    return q;
                });

                return {
                    hydrationL: +(state.hydrationL + liters).toFixed(1),
                    treeGrowthPercent: Math.min(100, state.treeGrowthPercent + 2),
                    quests: newQuests
                };
            }),

            closeRewardPopup: () => set({ showRewardPopup: false, currentRewardCard: null }),
            togglePremiumShop: (isOpen: boolean) => set({ showPremiumShop: isOpen }),
            toggleCollectionBook: (isOpen: boolean) => set({ showCollectionBook: isOpen }),
            toggleQuests: (isOpen: boolean) => set({ showQuests: isOpen }),
            claimQuestReward: (questId: string) => set((state: ForestState) => {
                const quest = state.quests.find(q => q.id === questId);
                if (!quest || !quest.completed || quest.rewardGrowth === 0) return state; // already claimed or not completed

                const newQuests = state.quests.map(q =>
                    q.id === questId ? { ...q, rewardGrowth: 0 } : q // Setting rewardGrowth to 0 marks it as claimed
                );

                return {
                    treeGrowthPercent: Math.min(100, state.treeGrowthPercent + quest.rewardGrowth),
                    quests: newQuests
                };
            })
        }),
        {
            name: 'coffee-forest-storage', // localStorage에 저장될 키 이름
        }
    )
);
