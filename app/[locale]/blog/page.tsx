import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function BlogPage() {
    const t = useTranslations('BlogPage');
    const locale = useLocale();

    const postsData = {
        en: [
            {
                id: 1,
                title: 'Top 10 Destinations for 2026',
                excerpt: 'Discover the hidden gems and popular spots that should be on your travel bucket list this year.',
                image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
                date: 'Jan 10, 2026',
            },
            {
                id: 2,
                title: 'Umrah Guide for Beginners',
                excerpt: 'Everything you need to know before performing Umrah, from visa to rituals.',
                image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071&auto=format&fit=crop',
                date: 'Dec 25, 2025',
            },
            {
                id: 3,
                title: 'Packing Tips for Summer Trips',
                excerpt: 'Don’t forget these essentials when packing for your next summer vacation.',
                image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
                date: 'Nov 15, 2025',
            },
        ],
        ar: [
            {
                id: 1,
                title: 'أفضل 10 وجهات لعام 2026',
                excerpt: 'اسكتشف الجواهر الخفية والمواقع الشهيرة التي يجب أن تكون في قائمة سفرك هذا العام.',
                image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
                date: '10 يناير 2026',
            },
            {
                id: 2,
                title: 'دليل العمرة للمبتدئين',
                excerpt: 'كل ما تحتاج معرفته قبل أداء العمرة، من التأشيرة إلى المناسك.',
                image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2071&auto=format&fit=crop',
                date: '25 ديسمبر 2025',
            },
            {
                id: 3,
                title: 'نصائح التعبئة للرحلات الصيفية',
                excerpt: 'لا تنس هذه الضروريات عند تحضير حقيبتك لعطلتك الصيفية القادمة.',
                image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
                date: '15 نوفمبر 2025',
            },
        ]
    };

    const posts = locale === 'ar' ? postsData.ar : postsData.en;

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t('title')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <article key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <span className="text-orange-500 text-sm font-medium">{post.date}</span>
                            <h2 className="text-xl font-bold mt-2 mb-3 text-gray-900 dark:text-white">{post.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                            <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">{t('readMore')}</Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
