import { X, Sparkles, Sprout } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useForestStore } from '../store/useForestStore';

export default function PremiumShop() {
    const { togglePremiumShop } = useForestStore();

    const handlePaymentSuccess = (details: any) => {
        alert(`Transaction completed by ${details.payer.name.given_name}. Your tree has received premium fertilizer!`);
        // Here, we would update state to grant premium items/currency
        togglePremiumShop(false);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
                {/* Close Button */}
                <button
                    onClick={() => togglePremiumShop(false)}
                    className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-yellow-500/30 mb-4 animate-[bounce_3s_infinite]">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-espresso mb-1">Premium Shop</h2>
                    <p className="text-sm text-espresso/60">Support your forest and unlock exclusive cosmetic items.</p>
                </div>

                {/* Products */}
                <div className="space-y-4 mb-6">
                    {/* Item 1 */}
                    <div className="border border-yellow-200 bg-yellow-50/50 rounded-2xl p-4 flex gap-4 items-center">
                        <div className="bg-yellow-100 p-2 rounded-xl">
                            <Sprout className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm text-espresso">Golden Fertilizer</h4>
                            <p className="text-xs text-espresso/60">Instantly boosts growth +50%</p>
                        </div>
                        <div className="font-bold text-lg text-primary">$0.99</div>
                    </div>
                </div>

                {/* PayPal Checkout */}
                <div className="w-full relative z-10">
                    <PayPalButtons
                        style={{ layout: "vertical", shape: "pill", label: "pay", color: "gold" }}
                        createOrder={(_, actions) => {
                            return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [
                                    {
                                        description: "Golden Fertilizer",
                                        amount: {
                                            currency_code: "USD",
                                            value: "0.99",
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={async (_, actions) => {
                            if (!actions.order) return;
                            const details = await actions.order.capture();
                            handlePaymentSuccess(details);
                        }}
                        onError={(err) => {
                            console.error("PayPal Error:", err);
                            alert("Payment could not be processed.");
                        }}
                    />
                </div>

                <p className="text-center text-[10px] text-gray-400 mt-4">
                    Secure checkout provided by PayPal. In sandbox mode, no real money will be charged.
                </p>
            </div>
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
