'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone, User } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { clsx } from 'clsx';

export default function Header() {
    const t = useTranslations('Navigation');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: t('home'), href: '/' },
        { label: t('about'), href: '/about' },
        { label: t('tours'), href: '/tours' },
        { label: t('hajjUmrah'), href: '/hajj-umrah' },
        { label: t('blog'), href: '/blog' },
        { label: t('contact'), href: '/contact' },
    ];

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md py-2 dark:bg-gray-900/95'
                    : 'bg-transparent py-4'
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            src="/logo.svg"
                            alt="Al-Maali Tours"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    'text-sm font-medium transition-colors hover:text-orange-500',
                                    isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-gray-800 dark:text-white' // Assuming hero has overlay, else adjust
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link
                            href="/booking"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-transform transform hover:scale-105"
                        >
                            {t('common.bookNow') || 'Book Now'}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-800 dark:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg py-4 px-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 dark:text-gray-200 hover:text-orange-500 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                    <div className="flex items-center justify-between">
                        <LanguageSwitcher />
                        <Link
                            href="/booking"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
