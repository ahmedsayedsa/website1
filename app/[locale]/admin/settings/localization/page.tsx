import { Globe, Languages, MapPin } from 'lucide-react';

export default function LocalizationSettingsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Localization Settings</h1>
                <p className="text-gray-500 mt-2">Manage languages, translations, and regional settings</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-12 text-center border border-green-200 dark:border-green-800">
                <Globe className="mx-auto mb-4 text-green-600" size={64} />
                <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                    Advanced localization features including translation management, RTL support configuration, and regional settings will be available soon.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Languages className="mx-auto mb-2 text-blue-600" size={32} />
                        <h3 className="font-bold text-sm">Translations</h3>
                        <p className="text-xs text-gray-500 mt-1">Manage translation keys</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <MapPin className="mx-auto mb-2 text-green-600" size={32} />
                        <h3 className="font-bold text-sm">Regions</h3>
                        <p className="text-xs text-gray-500 mt-1">Regional preferences</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Globe className="mx-auto mb-2 text-purple-600" size={32} />
                        <h3 className="font-bold text-sm">Languages</h3>
                        <p className="text-xs text-gray-500 mt-1">Add/remove languages</p>
                    </div>
                </div>

                <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Current Setup:</strong> Arabic (AR) and English (EN) via next-intl</p>
                </div>
            </div>
        </div>
    );
}
