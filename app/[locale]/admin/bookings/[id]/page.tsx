import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CheckCircle, XCircle, Calendar, User, MapPin, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default async function BookingDetailsPage({ params }: { params: { id: string } }) {
    const booking = await prisma.booking.findUnique({
        where: { id: params.id },
        include: {
            package: true,
        },
    });

    if (!booking) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/bookings" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition w-fit">
                    <ArrowLeft size={18} /> Back to Bookings
                </Link>
            </div>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        Booking #{booking.id.slice(-6).toUpperCase()}
                        <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase
                             ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'}`}>
                            {booking.status}
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-2">Created on {new Date(booking.createdAt).toLocaleString()}</p>
                </div>

                <div className="flex gap-3">
                    <form action={`/api/admin/bookings/${booking.id}/approve`} method="POST">
                        <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition">
                            <CheckCircle size={20} /> Approve Booking
                        </button>
                    </form>
                    <form action={`/api/admin/bookings/${booking.id}/cancel`} method="POST">
                        <button className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200 transition">
                            <XCircle size={20} /> Cancel
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Customer Details */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <User size={20} className="text-blue-600" /> Customer Info
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Name</label>
                            <div className="font-medium">{booking.customerName}</div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Email</label>
                            <div className="font-medium">{booking.customerEmail}</div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Phone</label>
                            <div className="font-medium">{booking.customerPhone}</div>
                        </div>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-purple-600" /> Trip Details
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Package</label>
                            <div className="font-medium text-lg">{booking.package.titleEn}</div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Travel Date</label>
                            <div className="font-medium flex items-center gap-2">
                                <Calendar size={16} />
                                {new Date(booking.travelDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold">Travelers</label>
                                <div className="font-medium">{booking.numberOfPeople} People</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CreditCard size={20} className="text-green-600" /> Payment
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                            <span className="text-gray-500">Total Price</span>
                            <span className="text-2xl font-bold">EGP {Number(booking.totalPrice).toLocaleString()}</span>
                        </div>
                        <div className="pt-2">
                            <label className="text-xs text-gray-500 uppercase font-bold">Payment Status</label>
                            <div className="mt-1">
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes */}
            {booking.notes && (
                <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Special Requests / Notes</h2>
                    <p className="text-gray-600 dark:text-gray-300">{booking.notes}</p>
                </div>
            )}
        </div>
    );
}
