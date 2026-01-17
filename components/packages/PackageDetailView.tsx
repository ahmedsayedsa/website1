import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { Calendar, Clock, MapPin, Users, Check, X as XIcon } from 'lucide-react';

export default function PackageDetailView({ pkgId }: { pkgId: string }) {
    const t = useTranslations('PackageDetails');
    const locale = useLocale();

    // Mock Bilingual Data
    const pkgData = {
        en: {
            name: 'Magical 7-Day Turkey Tour',
            description: 'Experience the history and beauty of Turkey. Visit Istanbul, Cappadocia, and more in this all-inclusive package.',
            destination: 'Istanbul & Cappadocia',
            inclusions: ['4-Star Hotel Accommodation', 'Daily Breakfast', 'Domestic Flights', 'English Speaking Guide', 'Airport Transfers'],
            exclusions: ['International Flights', 'Lunch & Dinner', 'Personal Expenses', 'Tips'],
            itinerary: [
                { day: 1, title: 'Arrival in Istanbul', desc: 'Airport pickup and transfer to hotel.' },
                { day: 2, title: 'Old City Tour', desc: 'Visit Hagia Sophia, Blue Mosque, and Topkapi Palace.' },
                { day: 3, title: 'Flight to Cappadocia', desc: 'Early flight and cave hotel check-in.' },
            ],
        },
        ar: {
            name: 'رحلة سحرية لمدة 7 أيام في تركيا',
            description: 'استمتع بتاريخ وجمال تركيا. قم بزيارة اسطنبول وكابادوكيا والمزيد في هذه الباقة الشاملة.',
            destination: 'اسطنبول وكابادوكيا',
            inclusions: ['إقامة في فندق 4 نجوم', 'إفطار يومي', 'طيران داخلي', 'مرشد يتحدث العربية', 'نقل من وإلى المطار'],
            exclusions: ['الطيران الدولي', 'الغداء والعشاء', 'المصاريف الشخصية', 'الإكراميات'],
            itinerary: [
                { day: 1, title: 'الوصول إلى اسطنبول', desc: 'الاستقبال في المطار والنقل إلى الفندق.' },
                { day: 2, title: 'جولة المدينة القديمة', desc: 'زيارة آيا صوفيا والمسجد الأزرق وقصر توبكابي.' },
                { day: 3, title: 'الطيران إلى كابادوكيا', desc: 'رحلة مبكرة وتسجيل الدخول في فندق الكهف.' },
            ],
        }
    };

    const currentPkg = locale === 'ar' ? pkgData.ar : pkgData.en;

    // Shared data
    const pkg = {
        ...currentPkg,
        price: 18000,
        images: ['https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071', 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070'],
        duration: 7,
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero Header */}
            <div className="relative h-[50vh]">
                <img src={pkg.images[0]} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{pkg.name}</h1>
                        <div className="flex flex-wrap gap-6 text-sm md:text-base">
                            <span className="flex items-center gap-2"><MapPin size={18} className="text-orange-500" /> {pkg.destination}</span>
                            <span className="flex items-center gap-2"><Clock size={18} className="text-blue-500" /> {pkg.duration} {t('heroStats.days')}</span>
                            <span className="flex items-center gap-2"><Users size={18} className="text-green-500" /> {t('heroStats.group')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('overview')}</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{pkg.description}</p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t('itinerary')}</h2>
                            <div className="space-y-6">
                                {pkg.itinerary.map((item) => (
                                    <div key={item.day} className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                            {item.day}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800">
                                <h3 className="font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                                    <Check size={20} /> {t('included')}
                                </h3>
                                <ul className="space-y-2">
                                    {pkg.inclusions.map((inc) => <li key={inc} className="text-gray-700 dark:text-gray-300 text-sm">• {inc}</li>)}
                                </ul>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-100 dark:border-red-800">
                                <h3 className="font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                                    <XIcon size={20} /> {t('excluded')}
                                </h3>
                                <ul className="space-y-2">
                                    {pkg.exclusions.map((exc) => <li key={exc} className="text-gray-700 dark:text-gray-300 text-sm">• {exc}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl sticky top-24 border border-gray-100 dark:border-gray-700">
                            <div className="mb-6">
                                <span className="text-sm text-gray-500">{t('startingFrom')}</span>
                                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                                    {locale === 'ar' ? 'ج.م' : 'EGP'} {pkg.price.toLocaleString(locale)}
                                </p>
                                <span className="text-sm text-gray-500">{t('perPerson')}</span>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="block text-xs text-gray-500 mb-1">{t('selectDate')}</span>
                                    <select className="w-full bg-transparent font-medium outline-none">
                                        <option>June 15, 2026</option>
                                        <option>July 20, 2026</option>
                                        <option>August 10, 2026</option>
                                    </select>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="block text-xs text-gray-500 mb-1">{t('guests')}</span>
                                    <select className="w-full bg-transparent font-medium outline-none">
                                        <option>1 Adult</option>
                                        <option>2 Adults</option>
                                        <option>2 Adults, 1 Child</option>
                                    </select>
                                </div>
                            </div>

                            <Link
                                href="/booking"
                                className="block w-full py-4 bg-orange-500 text-white text-center rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/30"
                            >
                                {t('bookNow')}
                            </Link>

                            <p className="text-xs text-center text-gray-400 mt-4">{t('noPayment')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
