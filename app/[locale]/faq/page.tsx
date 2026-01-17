'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
    const t = useTranslations('FAQPage');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const questions = ['q1', 'q2', 'q3', 'q4'];

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">{t('title')}</h1>

            <div className="max-w-3xl mx-auto space-y-6">
                {questions.map((q, index) => (
                    <div
                        key={q}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            <span className="font-bold text-lg text-gray-900 dark:text-white">{t(`questions.${q}.question`)}</span>
                            {openIndex === index ? <ChevronUp className="text-orange-500" /> : <ChevronDown className="text-gray-400" />}
                        </button>

                        {openIndex === index && (
                            <div className="p-6 pt-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                                    {t(`questions.${q}.answer`)}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
