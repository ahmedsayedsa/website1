'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Save, X } from 'lucide-react';

export default function NewPackagePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        titleEn: '', titleAr: '',
        descriptionEn: '', descriptionAr: '',
        price: '',
        duration: '',
        category: 'domestic',
        featuredImage: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/packages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    duration: parseInt(formData.duration),
                    price: parseFloat(formData.price),
                    // Defaults
                    featured: false,
                    published: true,
                    gallery: [],
                    itineraryEn: '',
                    itineraryAr: ''
                }),
            });

            if (res.ok) {
                router.push('/admin/packages');
                router.refresh();
            } else {
                alert('Failed to create package');
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
                <h1 className="text-3xl font-bold">Add New Package</h1>
                <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Package Title (English)</label>
                        <input name="titleEn" value={formData.titleEn} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Package Title (Arabic)</label>
                        <input name="titleAr" value={formData.titleAr} onChange={handleChange} dir="rtl" required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                            <option value="domestic">Domestic</option>
                            <option value="international">International</option>
                            <option value="hajj">Hajj</option>
                            <option value="umrah">Umrah</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Price (EGP)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Duration (Days)</label>
                        <input type="number" name="duration" value={formData.duration} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>

                {/* Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Description (English)</label>
                        <textarea name="descriptionEn" value={formData.descriptionEn} onChange={handleChange} rows={4} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Description (Arabic)</label>
                        <textarea name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} dir="rtl" rows={4} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                    <input name="featuredImage" value={formData.featuredImage} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" placeholder="https://..." />
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                        {loading ? 'Creating...' : <><Save size={20} /> Create Package</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
