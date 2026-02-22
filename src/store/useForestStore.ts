import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Card {
    id: string;
    name: string;
    rarity: 'Common' | 'Rare' | 'Legendary';
    location: string;
    imageUrl?: string;
}

interface ForestState {
    // User Stats
    caffeineMg: number;
    hydrationL: number;
    streak: number;
    treeGrowthPercent: number;

    // UI State
    showRewardPopup: boolean;
    showPremiumShop: boolean;
    collectedCards: Card[];
    currentRewardCard: Card | null;

    // Actions
    addCoffee: (mg: number) => void;
    waterPlant: (liters: number) => void;
    closeRewardPopup: () => void;
    togglePremiumShop: (isOpen: boolean) => void;
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
            collectedCards: [],
            currentRewardCard: null,

            addCoffee: (mg: number) => set((state: ForestState) => {
                // Add coffee triggers a potential reward
                const newGrowth = Math.min(100, state.treeGrowthPercent + 5);

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
                    collectedCards: rewardObj ? [...state.collectedCards, rewardObj] : state.collectedCards
                };
            }),

            waterPlant: (liters: number) => set((state: ForestState) => ({
                hydrationL: +(state.hydrationL + liters).toFixed(1),
                treeGrowthPercent: Math.min(100, state.treeGrowthPercent + 2)
            })),

            closeRewardPopup: () => set({ showRewardPopup: false, currentRewardCard: null }),
            togglePremiumShop: (isOpen: boolean) => set({ showPremiumShop: isOpen })
        }),
        {
            name: 'coffee-forest-storage', // localStorage에 저장될 키 이름
        }
    )
);
