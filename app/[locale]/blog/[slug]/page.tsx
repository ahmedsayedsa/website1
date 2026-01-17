import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { Calendar, User } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const t = useTranslations('BlogPage');
    const locale = useLocale();

    // Mock Data (would typically fetch based on params.slug)
    const postData = {
        en: {
            title: 'Top 10 Destinations for 2026',
            content: `
                <p>Planning your travels for 2026? Here are the top destinations you shouldn't miss.</p>
                <p>From the pristine beaches of Maldives to the historic streets of Rome, the world is full of wonders waiting to be explored...</p>
                <h3>1. Kyoto, Japan</h3>
                <p>Experience the blend of tradition and modernity...</p>
            `,
            author: 'Admin',
            date: 'Jan 10, 2026'
        },
        ar: {
            title: 'أفضل 10 وجهات لعام 2026',
            content: `
                <p>هل تخطط لرحلاتك لعام 2026؟ إليك أفضل الوجهات التي لا ينبغي أن تفوتها.</p>
                <p>من شواطئ المالديف البكر إلى شوارع روما التاريخية، العالم مليء بالعجائب التي تنتظر استكشافها...</p>
                <h3>1. كيوتو، اليابان</h3>
                <p>جرب مزيج التقاليد والحداثة...</p>
            `,
            author: 'المشرف',
            date: '10 يناير 2026'
        }
    };

    const post = locale === 'ar' ? postData.ar : postData.en;

    return (
        <div className="container mx-auto px-4 py-16">
            <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                    alt={post.title}
                    className="w-full h-[400px] object-cover"
                />
                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
                        <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">{post.title}</h1>

                    <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
                        <Link
                            href="/blog"
                            className="text-orange-500 font-bold hover:text-orange-600 transition"
                        >
                            ← {t('backToBlog')}
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
