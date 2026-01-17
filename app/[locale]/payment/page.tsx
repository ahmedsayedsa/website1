'use client';

import { CheckCircle, CreditCard, Smartphone } from 'lucide-react';
import { useState } from 'react';

export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePayment = () => {
        setLoading(true);
        // Simulate PayMob API call/Redirect
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-500 rounded-full mb-8">
                    <CheckCircle size={48} />
                </div>
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Payment Successful!</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    Thank you for booking with Al-Maali Tours. Check your email for confirmation.
                </p>
                <a href="/" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Return Home</a>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Secure Payment</h1>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center pb-6 border-b border-gray-100 dark:border-gray-700 mb-6">
                    <span className="text-gray-500">Total Amount</span>
                    <span className="text-3xl font-bold text-blue-900 dark:text-blue-400">EGP 15,000</span>
                </div>

                <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Select Payment Method</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${paymentMethod === 'card'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                : 'border-gray-200 dark:border-gray-700 text-gray-500'
                            }`}
                    >
                        <CreditCard size={32} />
                        <span className="font-bold">Credit Card</span>
                    </button>
                    <button
                        onClick={() => setPaymentMethod('wallet')}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${paymentMethod === 'wallet'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                : 'border-gray-200 dark:border-gray-700 text-gray-500'
                            }`}
                    >
                        <Smartphone size={32} />
                        <span className="font-bold">Mobile Wallet</span>
                    </button>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? 'Processing...' : `Pay EGP 15,000`}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                    <span>Powered by</span>
                    <span className="font-bold text-blue-900 dark:text-white">PayMob</span>
                </div>
            </div>
        </div>
    );
}
