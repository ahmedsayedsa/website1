'use client';

import { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Plus, Trash, Save, GripVertical } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

const platformIcons: any = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    tiktok: FaTiktok,
    linkedin: Linkedin,
};

const platformColors: any = {
    facebook: 'bg-blue-600',
    instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
    twitter: 'bg-sky-500',
    youtube: 'bg-red-600',
    tiktok: 'bg-black',
    linkedin: 'bg-blue-700',
};

export default function SocialMediaPage() {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await fetch('/api/admin/settings/social');
            const data = await res.json();
            setLinks(data);
        } catch (error) {
            console.error('Failed to fetch links:', error);
        } finally {
            setLoading(false);
        }
    };

    const addLink = async (platform: string) => {
        try {
            const res = await fetch('/api/admin/settings/social', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    platform,
                    url: '',
                    enabled: true,
                    displayOrder: links.length,
                }),
            });
            if (res.ok) {
                fetchLinks();
            }
        } catch (error) {
            console.error('Failed to add link:', error);
        }
    };

    const updateLink = async (id: string, updates: any) => {
        try {
            await fetch('/api/admin/settings/social', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...updates }),
            });
        } catch (error) {
            console.error('Failed to update link:', error);
        }
    };

    const deleteLink = async (id: string) => {
        if (!confirm('Delete this social media link?')) return;
        try {
            await fetch(`/api/admin/settings/social?id=${id}`, { method: 'DELETE' });
            fetchLinks();
        } catch (error) {
            console.error('Failed to delete link:', error);
        }
    };

    const availablePlatforms = ['facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'linkedin'];
    const usedPlatforms = links.map(l => l.platform);
    const unusedPlatforms = availablePlatforms.filter(p => !usedPlatforms.includes(p));

    if (loading) {
        return <div className="flex items-center justify-center h-96">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Social Media Links</h1>
                <p className="text-gray-500 mt-2">Manage your social media presence across platforms</p>
            </div>

            <div className="space-y-4 mb-8">
                {links.map((link) => {
                    const Icon = platformIcons[link.platform];
                    const colorClass = platformColors[link.platform];

                    return (
                        <div key={link.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-4">
                                <GripVertical className="text-gray-400 cursor-move" size={20} />
                                <div className={`${colorClass} p-3 rounded-lg text-white`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold capitalize">{link.platform}</h3>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={link.enabled}
                                                onChange={(e) => {
                                                    const updated = [...links];
                                                    const index = updated.findIndex(l => l.id === link.id);
                                                    updated[index].enabled = e.target.checked;
                                                    setLinks(updated);
                                                    updateLink(link.id, { enabled: e.target.checked });
                                                }}
                                                className="w-4 h-4 rounded"
                                            />
                                            <span className="text-sm text-gray-500">Enabled</span>
                                        </label>
                                    </div>
                                    <input
                                        type="url"
                                        value={link.url}
                                        onChange={(e) => {
                                            const updated = [...links];
                                            const index = updated.findIndex(l => l.id === link.id);
                                            updated[index].url = e.target.value;
                                            setLinks(updated);
                                        }}
                                        onBlur={(e) => updateLink(link.id, { url: e.target.value })}
                                        placeholder={`https://${link.platform}.com/yourpage`}
                                        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                <button
                                    onClick={() => deleteLink(link.id)}
                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"
                                >
                                    <Trash size={20} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {unusedPlatforms.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Add Platform</h3>
                    <div className="flex flex-wrap gap-3">
                        {unusedPlatforms.map((platform) => {
                            const Icon = platformIcons[platform];
                            const colorClass = platformColors[platform];

                            return (
                                <button
                                    key={platform}
                                    onClick={() => addLink(platform)}
                                    className={`${colorClass} text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition`}
                                >
                                    <Icon size={18} />
                                    <span className="capitalize">{platform}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
