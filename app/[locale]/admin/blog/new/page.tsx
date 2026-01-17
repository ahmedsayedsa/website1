'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Save, X, Image as ImageIcon } from 'lucide-react';

export default function NewBlogPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        locale: 'en', // Default to English
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
            .replace(/\s+/g, '-')         // Replace spaces with hyphens
            .replace(/-+/g, '-');         // Avoid multiple hyphens
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/blog');
                router.refresh();
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Write New Post</h1>
                <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Post Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 text-lg font-bold"
                            placeholder="Enter post title..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <select
                            name="locale"
                            value={formData.locale}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="en">English (EN)</option>
                            <option value="ar">Arabic (AR)</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Slug (URL Friendly)</label>
                    <input
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 font-mono text-sm text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Excerpt (Short Description)</label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows={3}
                        required
                        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Content (Markdown Supported)</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={15}
                        required
                        className="w-full px-4 py-4 rounded-lg border dark:bg-gray-700 dark:border-gray-600 font-mono text-sm"
                        placeholder="# Write your content here..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                name="featuredImage"
                                value={formData.featuredImage}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                placeholder="https://..."
                            />
                        </div>
                        {formData.featuredImage && (
                            <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden">
                                <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        {loading ? 'Publishing...' : <><Save size={20} /> Publish Post</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
