import { create } from 'zustand';
import type { User } from 'firebase/auth';
import { signInWithRedirect, signInWithPopup, signOut, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithRedirect: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
    // 1. 초기 로드 시 한 번만 실행되는 전역 리스너
    onAuthStateChanged(auth, (user) => {
        console.log("AuthStore: Global check -", user?.email || "null");
        set({ user, isLoading: false });
    });

    // 2. 리다이렉트 결과 처리 (초기화 시 한 번 시도)
    getRedirectResult(auth)
        .then((result) => {
            if (result?.user) {
                console.log("AuthStore: Found user after redirect:", result.user.email);
                set({ user: result.user, isLoading: false });
            }
        })
        .catch((error) => {
            console.error("AuthStore: Redirect recovery failed:", error.code);
        })
        .finally(() => {
            // 어떤 경우에도 3초 후에는 로딩을 강제로 끕니다 (안전장치)
            setTimeout(() => {
                set({ isLoading: false });
            }, 3000);
        });

    return {
        user: auth.currentUser,
        isLoading: true,
        loginWithGoogle: async () => {
            console.log("AuthStore: Primary login with Popup...");
            try {
                const result = await signInWithPopup(auth, googleProvider);
                set({ user: result.user, isLoading: false });
            } catch (error: any) {
                console.error("AuthStore: Popup failed:", error.code);
                // 팝업 차단 등의 에러 시 메시지 출력
                if (error.code === 'auth/popup-blocked') {
                    alert("브라우저의 팝업 차단 설정을 확인해주세요.");
                } else if (error.code === 'auth/cancelled-popup-request') {
                    // 유자가 팝업을 닫은 경우
                } else {
                    alert("인증 오류가 발생했습니다. 하단의 리다이렉트 모드를 사용해보세요.");
                }
            }
        },
        loginWithRedirect: async () => {
            console.log("AuthStore: Falling back to Redirect...");
            set({ isLoading: true });
            try {
                await signInWithRedirect(auth, googleProvider);
            } catch (error: any) {
                console.error("AuthStore: Redirect failed:", error.code);
                set({ isLoading: false });
            }
        },
        logout: async () => {
            try {
                await signOut(auth);
                set({ user: null });
            } catch (error) {
                console.error("Logout error:", error);
            }
        }
    };
});
