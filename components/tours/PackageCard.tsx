'use client';

import { Link } from '@/i18n/routing';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface PackageProps {
    id: string;
    name: string;
    image: string;
    price: number;
    duration: number;
    destination: string;
    category: string;
}

export default function PackageCard({ pkg }: { pkg: PackageProps }) {
    const t = useTranslations('ToursPage.card');
    const locale = useLocale();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 dark:border-gray-700">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {pkg.category}
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2">
                    <MapPin size={16} />
                    {pkg.destination}
                </div>

                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white line-clamp-2">
                    {pkg.name}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                    <div className="flex items-center gap-1">
                        <Clock size={16} className="text-blue-500" />
                        <span>{pkg.duration} {t('days')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users size={16} className="text-green-500" />
                        <span>{t('groupTour')}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500">{t('startingFrom')}</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {t('currency')} {pkg.price.toLocaleString(locale)}
                        </p>
                    </div>
                    <Link
                        href={`/tours/${pkg.id}`}
                        className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-colors"
                    >
                        {t('details')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
