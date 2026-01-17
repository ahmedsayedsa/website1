'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
    const t = useTranslations('ContactPage');

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">{t('title')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-8">{t('infoTitle')}</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{t('visitUs')}</h3>
                                <p className="text-gray-600 dark:text-gray-400">123 Tourism St, Downtown, Cairo, Egypt</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{t('callUs')}</h3>
                                <p className="text-gray-600 dark:text-gray-400">+20 100 000 0000</p>
                                <p className="text-gray-600 dark:text-gray-400">+20 2 2000 0000</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{t('emailUs')}</h3>
                                <p className="text-gray-600 dark:text-gray-400">info@elmaali.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{t('workingHours')}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{t('days')}: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-600 dark:text-gray-400">{t('closed')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">{t('formTitle')}</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">{t('form.name')}</label>
                                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('form.placeholders.name')} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{t('form.email')}</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('form.placeholders.email')} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('form.subject')}</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('form.placeholders.subject')} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t('form.message')}</label>
                            <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('form.placeholders.message')}></textarea>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                            {t('form.send')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
