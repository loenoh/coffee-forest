import { create } from 'zustand';
import type { User } from 'firebase/auth';
import { signInWithRedirect, signOut, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
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

    // Capture the redirect result when the app loads back
    getRedirectResult(auth)
        .then((result) => {
            console.log("Redirect result received:", result?.user?.email);
            if (result?.user) {
                set({ user: result.user, isLoading: false });
            } else {
                // If no result but initialization finished, ensure loading is off
                set({ isLoading: false });
            }
        })
        .catch((error) => {
            console.error("Redirect login result error:", error);
            set({ isLoading: false });
        });

    return {
        user: auth.currentUser,
        isLoading: true, // Initial loading state
        loginWithGoogle: async () => {
            set({ isLoading: true });
            try {
                // signInWithRedirect is essential for mobile stability 
                // and avoiding many popup blocker/webview issues.
                await signInWithRedirect(auth, googleProvider);
            } catch (error) {
                console.error("Login redirect failed:", error);
                set({ isLoading: false });
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
