import { prisma } from '@/lib/prisma';
import { Link } from '@/i18n/routing';
import { Plus, Edit, Trash, MapPin } from 'lucide-react';

export default async function PackagesPage() {
    const packages = await prisma.package.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Packages Management</h1>
                <Link
                    href="/admin/packages/new"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                    <Plus size={20} /> Add New Package
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-750">
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
                            <th className="p-6">Package Title</th>
                            <th className="p-6">Category</th>
                            <th className="p-6">Price</th>
                            <th className="p-6">Status</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500">
                                    No packages found. Click "Add New Package" to get started.
                                </td>
                            </tr>
                        ) : (
                            packages.map((pkg) => (
                                <tr key={pkg.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                    <td className="p-6 font-medium flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                            {pkg.featuredImage && (
                                                <img src={pkg.featuredImage} alt={pkg.titleEn} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">{pkg.titleEn}</div>
                                            <div className="text-xs text-gray-400 font-arabic">{pkg.titleAr}</div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">
                                            {pkg.category}
                                        </span>
                                    </td>
                                    <td className="p-6 font-bold">EGP {Number(pkg.price).toLocaleString()}</td>
                                    <td className="p-6">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${pkg.published ? 'text-green-500 bg-green-50' : 'text-gray-500 bg-gray-50'}`}>
                                            {pkg.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/packages/${pkg.id}`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-blue-600">
                                                <Edit size={18} />
                                            </Link>
                                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500">
                                                <Trash size={18} />
                                            </button>
                                        </div>
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
