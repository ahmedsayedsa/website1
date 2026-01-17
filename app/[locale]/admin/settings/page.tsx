import { Link } from '@/i18n/routing';
import { Settings, CreditCard, Share2, Globe, Palette, Shield } from 'lucide-react';

export default function SettingsHubPage() {
    const settingsPages = [
        {
            title: 'API & Integrations',
            description: 'Payment gateways, email, SMS, WhatsApp, and automation',
            icon: CreditCard,
            href: '/admin/settings/api',
            color: 'bg-blue-500',
            stats: 'Paymob, Stripe, Fawry, n8n',
        },
        {
            title: 'Social Media Links',
            description: 'Manage your social media presence',
            icon: Share2,
            href: '/admin/settings/social',
            color: 'bg-purple-500',
            stats: 'Facebook, Instagram, Twitter, etc.',
        },
        {
            title: 'Site Settings',
            description: 'General site configuration and preferences',
            icon: Settings,
            href: '/admin/settings',
            color: 'bg-gray-500',
            stats: 'Site name, contact info, WhatsApp',
        },
        {
            title: 'Localization',
            description: 'Languages, translations, and regional settings',
            icon: Globe,
            href: '/admin/settings/localization',
            color: 'bg-green-500',
            stats: 'Arabic, English',
        },
        {
            title: 'Theme & Branding',
            description: 'Logo, colors, and visual identity',
            icon: Palette,
            href: '/admin/settings/branding',
            color: 'bg-pink-500',
            stats: 'Coming soon',
        },
        {
            title: 'Security',
            description: 'User permissions, API keys, and security settings',
            icon: Shield,
            href: '/admin/settings/security',
            color: 'bg-red-500',
            stats: 'Coming soon',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-gray-500 mt-2">Manage all aspects of your website configuration</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {settingsPages.map((page) => {
                    const Icon = page.icon;
                    return (
                        <Link
                            key={page.href}
                            href={page.href}
                            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`${page.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                                        {page.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3">{page.description}</p>
                                    <div className="text-xs text-gray-400 font-mono">{page.stats}</div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
                <h2 className="text-2xl font-bold mb-4">Quick Tips</h2>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>API Settings:</strong> Configure payment gateways and integrations to enable bookings and notifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-purple-600 font-bold">•</span>
                        <span><strong>Social Media:</strong> Add your social profiles to display them in the footer and contact pages</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold">•</span>
                        <span><strong>n8n Automation:</strong> Enable webhook integration to auto-generate SEO content</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
