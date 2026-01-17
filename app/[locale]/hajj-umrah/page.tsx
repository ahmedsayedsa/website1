'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { CheckCircle } from 'lucide-react';

export default function HajjUmrahPage() {
    const t = useTranslations('HajjUmrahPage');

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero */}
            <div className="relative h-[60vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565552684695-1e35581ab347?q=80&w=1974&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">{t('title')}</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>
            </div>

            {/* Packages Grid */}
            <div className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t('availablePackages')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Package 1 */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-xl transition text-center">
                        <h3 className="text-2xl font-bold mb-2">{t('packages.economy.title')}</h3>
                        <p className="text-4xl font-bold text-orange-500 mb-6">{t('packages.economy.price')}</p>
                        <ul className="text-left space-y-3 mb-8">
                            {[0, 1, 2, 3].map((i) => (
                                <li key={i} className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> <span>{t(`packages.economy.features.${i}`)}</span></li>
                            ))}
                        </ul>
                        <Link href="/booking" className="block w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-bold hover:bg-orange-500 transition">{t('bookNow')}</Link>
                    </div>

                    {/* Package 2 */}
                    <div className="border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-xl transition text-center relative transform md:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">{t('bestValue')}</div>
                        <h3 className="text-2xl font-bold mb-2">{t('packages.premium.title')}</h3>
                        <p className="text-4xl font-bold text-orange-500 mb-6">{t('packages.premium.price')}</p>
                        <ul className="text-left space-y-3 mb-8">
                            {[0, 1, 2, 3].map((i) => (
                                <li key={i} className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> <span>{t(`packages.premium.features.${i}`)}</span></li>
                            ))}
                        </ul>
                        <Link href="/booking" className="block w-full py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">{t('bookNow')}</Link>
                    </div>

                    {/* Package 3 */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:shadow-xl transition text-center">
                        <h3 className="text-2xl font-bold mb-2">{t('packages.vip.title')}</h3>
                        <p className="text-4xl font-bold text-orange-500 mb-6">{t('packages.vip.price')}</p>
                        <ul className="text-left space-y-3 mb-8">
                            {[0, 1, 2, 3].map((i) => (
                                <li key={i} className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> <span>{t(`packages.vip.features.${i}`)}</span></li>
                            ))}
                        </ul>
                        <Link href="/booking" className="block w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-bold hover:bg-orange-500 transition">{t('bookNow')}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
