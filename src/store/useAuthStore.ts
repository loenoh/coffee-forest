import { create } from 'zustand';
import type { User } from 'firebase/auth';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
    // Listen for auth state changes globally
    onAuthStateChanged(auth, (user) => {
        set({ user, isLoading: false });
    });

    return {
        user: auth.currentUser,
        isLoading: true, // Initial loading state
        loginWithGoogle: async () => {
            try {
                await signInWithPopup(auth, googleProvider);
            } catch (error) {
                console.error("Login failed:", error);
            }
        },
        logout: async () => {
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Logout failed:", error);
            }
        }
    };
});
