import { useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { useForestStore } from '../store/useForestStore';

export function useFirestoreSync() {
    const { user } = useAuthStore();
    const isFetching = useRef(false);

    // 1. Fetch from Firestore when user logs in
    useEffect(() => {
        if (!user) return;

        const fetchFromCloud = async () => {
            isFetching.current = true;
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    useForestStore.setState({
                        caffeineMg: data.caffeineMg ?? 0,
                        hydrationL: data.hydrationL ?? 0,
                        streak: data.streak ?? 0,
                        treeGrowthPercent: data.treeGrowthPercent ?? 0,
                        collectedCards: data.collectedCards ?? [],
                    });
                }
            } catch (error) {
                console.error("Failed to sync from Firestore", error);
            } finally {
                // Give Zustand a brief moment to update before we allow outgoing writes
                setTimeout(() => {
                    isFetching.current = false;
                }, 500);
            }
        };

        fetchFromCloud();
    }, [user]);

    // 2. Subscribe to Zustand changes and write to Firestore
    useEffect(() => {
        if (!user) return;

        const unsubscribe = useForestStore.subscribe(async (state) => {
            if (isFetching.current) return; // Prevent echoing back newly fetched data

            const userDocRef = doc(db, 'users', user.uid);
            try {
                await setDoc(userDocRef, {
                    caffeineMg: state.caffeineMg,
                    hydrationL: state.hydrationL,
                    streak: state.streak,
                    treeGrowthPercent: state.treeGrowthPercent,
                    collectedCards: state.collectedCards,
                    lastUpdated: new Date().toISOString()
                }, { merge: true });
            } catch (error) {
                console.error("Failed to save to Firestore", error);
            }
        });

        return () => unsubscribe();
    }, [user]);
}
