import { prisma } from '@/lib/prisma';
import { Link } from '@/i18n/routing';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

export default async function BookingsPage() {
    const bookings = await prisma.booking.findMany({
        include: {
            package: true,
            // User relation is optional now
        },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Bookings Management</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-750">
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
                            <th className="p-6">Reference ID</th>
                            <th className="p-6">Customer</th>
                            <th className="p-6">Package</th>
                            <th className="p-6">Travel Date</th>
                            <th className="p-6">Status</th>
                            <th className="p-6">Total Price</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-12 text-center text-gray-500">
                                    No bookings found.
                                </td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                    <td className="p-6 font-mono text-xs text-gray-500">
                                        {booking.id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="p-6">
                                        <div className="font-bold text-sm">{booking.customerName}</div>
                                        <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                                    </td>
                                    <td className="p-6 text-sm font-medium">
                                        {booking.package.titleEn}
                                    </td>
                                    <td className="p-6 text-sm text-gray-500">
                                        {new Date(booking.travelDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1 w-fit
                                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'}`}>
                                            {booking.status === 'confirmed' && <CheckCircle size={12} />}
                                            {booking.status === 'cancelled' && <XCircle size={12} />}
                                            {booking.status === 'pending' && <Clock size={12} />}
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-6 font-bold text-sm">
                                        EGP {Number(booking.totalPrice).toLocaleString()}
                                    </td>
                                    <td className="p-6 text-right">
                                        <Link href={`/admin/bookings/${booking.id}`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-blue-600 inline-block">
                                            <Eye size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
