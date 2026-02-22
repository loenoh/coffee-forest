import { create } from 'zustand';
import type { User } from 'firebase/auth';
import { signInWithRedirect, signInWithPopup, signOut, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithPopup: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
    let isRedirectResolved = false;
    let isAuthStateResolved = false;

    console.log("AuthStore: Initializing...");

    const finalizeLoading = () => {
        if (isRedirectResolved && isAuthStateResolved) {
            console.log("AuthStore: Both checks resolved. Final Loading State: false");
            set({ isLoading: false });
        }
    };

    // 1. Listen for auth state changes globally
    onAuthStateChanged(auth, (user) => {
        isAuthStateResolved = true;
        console.log("AuthStore: onAuthStateChanged - User:", user?.email || "null");
        set({ user });
        finalizeLoading();
    });

    // 2. Explicitly wait for redirect result on initialization
    getRedirectResult(auth)
        .then((result) => {
            console.log("AuthStore: getRedirectResult finished. Result User:", result?.user?.email || "null");
            if (result?.user) {
                set({ user: result.user });
            }
        })
        .catch((error) => {
            console.error("AuthStore: Redirect Error:", error.code, error.message);
        })
        .finally(() => {
            isRedirectResolved = true;
            finalizeLoading();
        });

    return {
        user: auth.currentUser,
        isLoading: true,
        loginWithGoogle: async () => {
            console.log("AuthStore: Triggering loginWithGoogle (Redirect)...");
            set({ isLoading: true });
            try {
                await signInWithRedirect(auth, googleProvider);
            } catch (error: any) {
                console.error("AuthStore: loginWithGoogle failed:", error.code, error.message);
                set({ isLoading: false });
            }
        },
        loginWithPopup: async () => {
            console.log("AuthStore: Triggering loginWithPopup...");
            // No loading state change here to avoid browser blocking the popup
            try {
                const result = await signInWithPopup(auth, googleProvider);
                console.log("AuthStore: Popup Login Success:", result.user.email);
                set({ user: result.user, isLoading: false });
            } catch (error: any) {
                console.error("AuthStore: loginWithPopup failed:", error.code, error.message);
                set({ isLoading: false });
            }
        },
        logout: async () => {
            try {
                await signOut(auth);
            } catch (error) {
                console.error("AuthStore: Logout failed:", error);
            }
        }
    };
});
