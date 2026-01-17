import { Palette, Image, Type, Sparkles } from 'lucide-react';

export default function BrandingSettingsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Theme & Branding</h1>
                <p className="text-gray-500 mt-2">Customize your logo, colors, and visual identity</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-12 text-center border border-pink-200 dark:border-pink-800">
                <Palette className="mx-auto mb-4 text-pink-600" size={64} />
                <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                    Brand customization features including logo upload, color scheme editor, font selection, and theme builder will be available in the next update.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Image className="mx-auto mb-2 text-blue-600" size={32} />
                        <h3 className="font-bold text-sm">Logo</h3>
                        <p className="text-xs text-gray-500 mt-1">Upload & manage</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Palette className="mx-auto mb-2 text-pink-600" size={32} />
                        <h3 className="font-bold text-sm">Colors</h3>
                        <p className="text-xs text-gray-500 mt-1">Brand palette</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Type className="mx-auto mb-2 text-purple-600" size={32} />
                        <h3 className="font-bold text-sm">Typography</h3>
                        <p className="text-xs text-gray-500 mt-1">Font selection</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Sparkles className="mx-auto mb-2 text-yellow-600" size={32} />
                        <h3 className="font-bold text-sm">Themes</h3>
                        <p className="text-xs text-gray-500 mt-1">Light/Dark mode</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
