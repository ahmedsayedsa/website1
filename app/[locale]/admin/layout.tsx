'use client';

import { Link } from '@/i18n/routing';
import { usePathname, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import {
    LayoutDashboard,
    Package,
    Calendar,
    FileText,
    Users,
    Settings,
    LogOut
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    const menu = [
        { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
        { label: 'Packages', href: '/admin/packages', icon: <Package size={20} /> },
        { label: 'Bookings', href: '/admin/bookings', icon: <Calendar size={20} /> },
        { label: 'Blog', href: '/admin/blog', icon: <FileText size={20} /> },
        { label: 'Users', href: '/admin/users', icon: <Users size={20} /> },
        { label: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed h-full z-10 hidden md:block">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <Link href="/" className="text-2xl font-bold text-blue-900 dark:text-white">Al-Maali<span className="text-orange-500">Admin</span></Link>
                </div>
                <nav className="p-4 space-y-2">
                    {menu.map((item) => {
                        const isActive = pathname === `/en${item.href}` || pathname === `/ar${item.href}` || pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                                    isActive
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                )}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
