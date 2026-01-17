import { Shield, Key, Lock, Users } from 'lucide-react';

export default function SecuritySettingsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Security Settings</h1>
                <p className="text-gray-500 mt-2">Manage user permissions, API keys, and security settings</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-12 text-center border border-purple-200 dark:border-purple-800">
                <Shield className="mx-auto mb-4 text-purple-600" size={64} />
                <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                    Security settings including user permissions, two-factor authentication, API key management, and audit logs will be available in the next update.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Key className="mx-auto mb-2 text-blue-600" size={32} />
                        <h3 className="font-bold text-sm">2FA</h3>
                        <p className="text-xs text-gray-500 mt-1">Two-factor authentication</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Users className="mx-auto mb-2 text-green-600" size={32} />
                        <h3 className="font-bold text-sm">Roles</h3>
                        <p className="text-xs text-gray-500 mt-1">User role management</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Lock className="mx-auto mb-2 text-red-600" size={32} />
                        <h3 className="font-bold text-sm">Audit Logs</h3>
                        <p className="text-xs text-gray-500 mt-1">Track all admin actions</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
