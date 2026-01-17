'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const t = useTranslations();

    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">
                            Al-Maali<span className="text-orange-500">Tours</span>
                        </h3>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            {t('HomePage.description')}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 transition">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-blue-400 transition">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-orange-500">{t('Navigation.tours')}</h4>
                        <ul className="space-y-3 text-slate-300">
                            <li><Link href="/tours?cat=domestic" className="hover:text-white transition">Domestic Tours</Link></li>
                            <li><Link href="/tours?cat=international" className="hover:text-white transition">International Tours</Link></li>
                            <li><Link href="/hajj-umrah" className="hover:text-white transition">Hajj & Umrah</Link></li>
                            <li><Link href="/tours" className="hover:text-white transition">Special Offers</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-orange-500">Support</h4>
                        <ul className="space-y-3 text-slate-300">
                            <li><Link href="/about" className="hover:text-white transition">{t('Navigation.about')}</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition">{t('Navigation.contact')}</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-orange-500">{t('Navigation.contact')}</h4>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-orange-500 mt-1" size={18} />
                                <span>Cairo, Egypt</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-orange-500" size={18} />
                                <span dir="ltr">+20 100 000 0000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-orange-500" size={18} />
                                <span>info@elmaali.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} Al-Maali Tours. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
