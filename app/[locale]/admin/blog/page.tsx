import { prisma } from '@/lib/prisma';
import { Link } from '@/i18n/routing';
import { Plus, Edit, Trash, Calendar, Globe } from 'lucide-react';

export default async function BlogAdminPage() {
    const posts = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog Management</h1>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                    <Plus size={20} /> Add New Post
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-750">
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
                            <th className="p-6">Title</th>
                            <th className="p-6">Slug</th>
                            <th className="p-6">Status</th>
                            <th className="p-6">Published Date</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500">
                                    No blog posts found. Click "Add New Post" to start writing.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                                    <td className="p-6 font-medium max-w-xs truncate">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                {post.featuredImage && (
                                                    <img src={post.featuredImage} alt={post.titleEn} className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold">{post.titleEn}</div>
                                                <div className="text-xs text-gray-400 font-arabic">{post.titleAr}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-gray-500 text-sm font-mono">
                                        {post.slug}
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/blog/${post.id}`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-blue-600">
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
