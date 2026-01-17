import { prisma } from '@/lib/prisma';
import { Package, Calendar, Users, DollarSign } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default async function AdminDashboard() {
    // Parallel data fetching for performance
    const [
        totalBookings,
        confirmedBookings,
        activePackages,
    ] = await Promise.all([
        prisma.booking.count(),
        prisma.booking.findMany({
            where: { status: 'confirmed' },
            select: { totalPrice: true }
        }),
        prisma.package.count({ where: { published: true } }),
    ]);

    const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + Number(booking.totalPrice), 0);

    // TODO: Localization for Admin Dashboard needed in future step
    // const t = await getTranslations('AdminDashboard'); 

    const stats = [
        { label: 'Total Bookings', value: totalBookings.toString(), icon: <Calendar className="text-blue-500" />, change: 'Real Data' },
        { label: 'Total Revenue', value: `EGP ${totalRevenue.toLocaleString()}`, icon: <DollarSign className="text-green-500" />, change: 'Real Data' },
        { label: 'Active Packages', value: activePackages.toString(), icon: <Package className="text-orange-500" />, change: 'Real Data' },
        { label: 'New Users', value: '0', icon: <Users className="text-purple-500" />, change: 'Coming Soon' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">{stat.icon}</div>
                            <span className="text-sm font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">{stat.change}</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold mb-6">Recent Bookings (Mock Data - Connect DB Next)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
                                <th className="pb-4">Booking ID</th>
                                <th className="pb-4">Customer</th>
                                <th className="pb-4">Package</th>
                                <th className="pb-4">Date</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[1].map((i) => (
                                <tr key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                    <td className="py-4 font-mono">#BK-TEST</td>
                                    <td className="py-4 font-medium">Test User</td>
                                    <td className="py-4">Test Package</td>
                                    <td className="py-4">Today</td>
                                    <td className="py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Pending</span></td>
                                    <td className="py-4 font-bold">EGP 0</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
