'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('AboutPage');

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('title')}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('story')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1000"
                        alt="Team Meeting"
                        className="rounded-2xl shadow-xl"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-400">{t('missionTitle')}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {t('missionText')}
                    </p>

                    <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-400">{t('whyChooseUsTitle')}</h2>
                    <ul className="space-y-4">
                        {['guides', 'support', 'secure', 'custom'].map((key) => (
                            <li key={key} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                <span className="font-medium">{t(`values.${key}`)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
