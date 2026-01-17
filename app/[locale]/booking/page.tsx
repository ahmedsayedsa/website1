'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';

export default function BookingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        pkg: 'Custom Trip',
        date: '',
        adults: 2,
        children: 0,
        name: '',
        email: '',
        phone: '',
        notes: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app, post to API here
        console.log('Booking Data:', formData);
        router.push('/payment');
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Book Your Trip</h1>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center mb-12">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= i ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                            {step > i ? <Check size={20} /> : i}
                        </div>
                        {i < 3 && <div className={`w-16 h-1 ${step > i ? 'bg-orange-500' : 'bg-gray-200'}`} />}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold mb-4">Trip Details</h2>
                            <div>
                                <label className="block text-sm font-medium mb-2">Package / Destination</label>
                                <select
                                    name="pkg"
                                    value={formData.pkg}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 outline-none"
                                >
                                    <option>Custom Trip</option>
                                    <option>Sharm El Sheikh Relaxation</option>
                                    <option>Magical Turkey Tour</option>
                                    <option>Economy Umrah</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Travel Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 outline-none"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-2">Adults</label>
                                        <input
                                            type="number"
                                            name="adults"
                                            min={1}
                                            value={formData.adults}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 outline-none"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-2">Children</label>
                                        <input
                                            type="number"
                                            name="children"
                                            min={0}
                                            value={formData.children}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Ahmed Ali"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="ahmed@example.com"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+20 1xx xxx xxxx"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Special Requests</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 outline-none"
                                    placeholder="Dietary restrictions, room preferences..."
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold mb-4">Review Booking</h2>
                            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl space-y-3">
                                <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-600">
                                    <span className="text-gray-500">Package</span>
                                    <span className="font-bold">{formData.pkg}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-600">
                                    <span className="text-gray-500">Date</span>
                                    <span className="font-bold">{formData.date || 'Not selected'}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-600">
                                    <span className="text-gray-500">Guests</span>
                                    <span className="font-bold">{formData.adults} Adults, {formData.children} Children</span>
                                </div>
                                <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-600">
                                    <span className="text-gray-500">Contact</span>
                                    <span className="font-bold">{formData.name}</span>
                                </div>
                                <div className="pt-2 flex justify-between items-center text-lg">
                                    <span className="font-bold">Total Estimated:</span>
                                    <span className="font-bold text-orange-500">EGP 15,000 (Demo)</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Buttons */}
                <div className="mt-8 flex justify-between">
                    {step > 1 ? (
                        <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium">
                            <ChevronLeft size={20} /> Back
                        </button>
                    ) : <div />}

                    {step < 3 ? (
                        <button onClick={nextStep} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold">
                            Next Step <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button onClick={handleSubmit} className="flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-bold shadow-lg shadow-orange-500/30">
                            Confirm & Pay <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
