'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

export default function Hero() {
    const t = useTranslations('HomePage');

    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full opacity-60"
                    // Placeholder video or image logic. Using a darker bg color for now if video fails
                    poster="/images/hero-poster.jpg"
                >
                    {/* <source src="/videos/hero.mp4" type="video/mp4" /> */}
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
                {/* Fallback image if video not available */}
                <div
                    className="absolute inset-0 bg-cover bg-center -z-10"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536704689578-8f32143e8093?q=80&w=1964&auto=format&fit=crop')" }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        {t('title')} <br />
                        <span className="text-orange-500">{t('subtitle').split(' ').slice(-2).join(' ')}</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        {t('description')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/tours"
                            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-lg transition-transform transform hover:scale-105 shadow-lg"
                        >
                            {t('startJourney') || 'Explore Tours'}
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/50 rounded-full font-bold text-lg transition-all"
                        >
                            {t('contact') || 'Contact Us'}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
