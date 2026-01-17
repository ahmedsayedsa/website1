'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export default function QuickTours() {
    const t = useTranslations('HomePage.quickTours');

    const categories = [
        {
            id: 'domestic',
            title: t('domestic'),
            image: 'https://images.unsplash.com/photo-1562094254-2c702580a80e?q=80&w=1974&auto=format&fit=crop', // Aswan
            count: `12 ${t('packages')}`,
            link: '/tours?cat=domestic',
        },
        {
            id: 'international',
            title: t('international'),
            image: 'https://images.unsplash.com/photo-1528123280826-5d633036e6c7?q=80&w=2070&auto=format&fit=crop', // Turkey/Greece
            count: `8 ${t('packages')}`,
            link: '/tours?cat=international',
        },
        {
            id: 'religious',
            title: t('religious'),
            image: 'https://images.unsplash.com/photo-1565552684695-1e35581ab347?q=80&w=1974&auto=format&fit=crop', // Makkah
            count: `5 ${t('packages')}`,
            link: '/hajj-umrah',
        },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link key={cat.id} href={cat.link} className="group relative h-96 rounded-3xl overflow-hidden block">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${cat.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <span className="text-orange-400 font-medium text-sm mb-2 block">{cat.count}</span>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-3xl font-bold text-white group-hover:text-orange-400 transition-colors">
                                        {cat.title}
                                    </h3>
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-orange-500 transition-colors">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
