'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PackageCard from '@/components/tours/PackageCard';

// Mock Data (Replace with API call)
const packages = [
    {
        id: '1',
        name: 'Sharm El Sheikh Relaxation',
        image: 'https://images.unsplash.com/photo-1544521750-d70be5fbedc5?q=80&w=2069&auto=format&fit=crop',
        price: 4500,
        duration: 5,
        destination: 'Sharm El Sheikh',
        category: 'Domestic',
    },
    {
        id: '2',
        name: 'Magical Turkey Tour',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
        price: 18000,
        duration: 7,
        destination: 'Istanbul',
        category: 'International',
    },
    {
        id: '3',
        name: 'Umrah Package Gold',
        image: 'https://images.unsplash.com/photo-1565552684695-1e35581ab347?q=80&w=1974&auto=format&fit=crop',
        price: 32000,
        duration: 10,
        destination: 'Makkah',
        category: 'Religious',
    },
    {
        id: '4',
        name: 'Luxor & Aswan Cruise',
        image: 'https://images.unsplash.com/photo-1628549990159-a764d7c07222?q=80&w=2070&auto=format&fit=crop',
        price: 3800,
        duration: 4,
        destination: 'Luxor',
        category: 'Domestic',
    },
];

export default function ToursPage() {
    const t = useTranslations('ToursPage');
    const searchParams = useSearchParams();
    const category = searchParams.get('cat');

    const filteredPackages = category
        ? packages.filter((pkg) => pkg.category.toLowerCase() === category.toLowerCase())
        : packages;

    const filters = [
        { key: 'All', label: t('filters.all') },
        { key: 'Domestic', label: t('filters.domestic') },
        { key: 'International', label: t('filters.international') },
        { key: 'Religious', label: t('filters.religious') },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white capitalize">
                        {category ? `${category} ${t('subtitle').split(' ').slice(0, 0)}` : t('allTours')}
                        {/* Note: Logic for category title might need adjusting for full translations, sticking to All Tours primarily for now or doing key mapping if category is programmatic */}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Simple Filter Placeholder */}
                <div className="flex gap-2 mt-4 md:mt-0">
                    {filters.map((filter) => (
                        <button key={filter.key} className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-orange-500 hover:text-white transition">
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                ))}
            </div>
        </div>
    );
}
