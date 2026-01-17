import { prisma } from '@/lib/prisma';
import { User, Shield } from 'lucide-react';

export default async function UsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">User Management</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-750">
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
                            <th className="p-6">Name</th>
                            <th className="p-6">Email</th>
                            <th className="p-6">Role</th>
                            <th className="p-6">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                    <td className="p-6 font-medium flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                            <User size={16} />
                                        </div>
                                        {user.name || 'N/A'}
                                    </td>
                                    <td className="p-6 text-gray-500">{user.email}</td>
                                    <td className="p-6">
                                        <span className={`flex items-center gap-1 w-fit px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {user.role === 'admin' && <Shield size={12} />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
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
