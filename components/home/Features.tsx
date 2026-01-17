'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, Clock, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
    const t = useTranslations('HomePage.features');

    const features = [
        {
            icon: <Award className="w-10 h-10 text-orange-500" />,
            title: t('experienceTitle'),
            description: t('experienceDesc'),
        },
        {
            icon: <Clock className="w-10 h-10 text-blue-500" />,
            title: t('supportTitle'),
            description: t('supportDesc'),
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
            title: t('guidesTitle'),
            description: t('guidesDesc'),
        },
        {
            icon: <Users className="w-10 h-10 text-purple-500" />,
            title: t('priceTitle'),
            description: t('priceDesc'),
        },
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 text-center"
                        >
                            <div className="mb-4 flex justify-center">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
