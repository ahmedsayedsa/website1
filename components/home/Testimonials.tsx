'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

export default function Testimonials() {
    const t = useTranslations('HomePage.testimonials');

    const reviews = ['review1', 'review2', 'review3'];

    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    {t('title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((key, index) => (
                        <div key={key} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < (index === 2 ? 4 : 5) ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{t(`reviews.${key}.text`)}"</p>

                            <div className="flex items-center gap-4">
                                {/* Placeholder images for now, kept hardcoded or could be mapped if needed */}
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{t(`reviews.${key}.name`)}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t(`reviews.${key}.role`)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
