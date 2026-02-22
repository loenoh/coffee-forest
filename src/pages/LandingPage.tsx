import { Coffee, Droplets, Leaf, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function LandingPage() {
    const { user, isLoading, loginWithGoogle, loginWithRedirect } = useAuthStore();
    const navigate = useNavigate();
    const [showRefreshHint, setShowRefreshHint] = useState(false);

    // If already logged in, go to dashboard
    useEffect(() => {
        if (!isLoading && user) {
            navigate('/dashboard');
        }
    }, [user, isLoading, navigate]);

    // Show refresh hint if loading takes too long
    useEffect(() => {
        let timer = setTimeout(() => {
            if (isLoading) setShowRefreshHint(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isLoading]);

    if (isLoading) {
        return (
            <div className="w-full max-w-[390px] mx-auto bg-[#1a1412] h-screen sm:h-[844px] flex flex-col items-center justify-center text-white px-8">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-espresso-lighest opacity-70 mb-2">Connecting to forest...</p>
                {showRefreshHint && (
                    <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 animate-[fadeIn_0.5s_ease-out] w-full text-center">
                        <p className="text-[11px] text-white/50 mb-3 text-pretty">
                            It's taking longer than usual. Please check your network or try refreshing.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-primary text-xs font-bold underline"
                        >
                            Refresh App
                        </button>
                    </div>
                )}

            </div>
        );
    }

    return (
        <div className="relative w-full max-w-[390px] mx-auto bg-gradient-to-b from-[#1a1412] to-[#0a0807] min-h-screen sm:min-h-[844px] sm:h-[844px] sm:rounded-[2.5rem] sm:shadow-float sm:border-[8px] sm:border-white overflow-hidden flex flex-col items-center justify-between text-white px-6 py-12">



            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40">
                <div className="absolute -top-[10%] -left-[20%] w-[150%] h-[50%] bg-primary/20 blur-[120px] rounded-[100%]"></div>
                <div className="absolute bottom-[0%] right-[0%] w-[100%] h-[50%] bg-[#4c9a5f]/10 blur-[100px] rounded-[100%]"></div>
            </div>

            {/* Top Logo */}
            <div className="z-10 w-full flex flex-col items-center mt-8 animate-[fadeIn_1s_ease-out]">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-[#2e5d39] rounded-2xl shadow-[0_0_30px_rgba(17,212,66,0.5)] flex items-center justify-center mb-6">
                    <Leaf className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-center mb-4">
                    My Coffee <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">Forest</span>
                </h1>
                <p className="text-espresso-lighest text-center opacity-80 mb-8 max-w-[280px]">
                    Track your caffeine, stay hydrated, and grow a beautiful, lush digital forest.
                </p>
            </div>

            {/* Feature Highlights */}
            <div className="z-10 flex flex-col gap-4 w-full animate-[slideUp_1s_ease-out_0.2s_both]">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-espresso/80 rounded-full">
                        <Coffee className="w-5 h-5 text-crema" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Log Intelligently</h4>
                        <p className="text-xs text-white/50">Keep your caffeine in check.</p>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                        <Droplets className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Stay Hydrated</h4>
                        <p className="text-xs text-white/50">Cure your tree by drinking water.</p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="z-10 w-full mt-auto mb-6 animate-[slideUp_1s_ease-out_0.4s_both]">
                <div className="flex flex-col gap-3">
                    <button
                        onClick={loginWithGoogle}
                        disabled={isLoading}
                        className="w-full bg-white hover:bg-gray-100 text-[#1a1412] font-extrabold py-5 rounded-2xl shadow-[0_10px_40px_rgba(255,255,255,0.2)] active:scale-95 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                        <span className="text-lg">Continue with Google</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-50" />
                    </button>

                    <button
                        onClick={loginWithRedirect}
                        className="w-full bg-white/5 hover:bg-white/10 text-white/50 text-[10px] py-2 rounded-xl transition-all border border-white/5"
                    >
                        Login Problems? Use Redirect Mode
                    </button>
                </div>

                <p className="text-center text-[10px] text-white/40 mt-6 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Please use Safari/Chrome on mobile.
                </p>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
