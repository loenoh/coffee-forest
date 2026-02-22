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
    let isRedirectResolved = false;
    let isAuthStateResolved = false;

    const finalizeLoading = () => {
        if (isRedirectResolved && isAuthStateResolved) {
            set({ isLoading: false });
        }
    };

    // 1. Listen for auth state changes globally
    onAuthStateChanged(auth, (user) => {
        isAuthStateResolved = true;
        set({ user });
        finalizeLoading();
    });

    // 2. Explicitly wait for redirect result on initialization
    getRedirectResult(auth)
        .then((result) => {
            if (result?.user) {
                console.log("Login Success via Redirect:", result.user.email);
                set({ user: result.user });
            }
        })
        .catch((error) => {
            console.error("Redirect Result Error:", error.code, error.message);
        })
        .finally(() => {
            isRedirectResolved = true;
            finalizeLoading();
        });

    return {
        user: auth.currentUser,
        isLoading: true, // App starts in loading state
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
