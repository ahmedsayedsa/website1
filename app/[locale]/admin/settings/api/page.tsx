'use client';

import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import ApiSettingsTabs from '@/components/admin/ApiSettingsTabs';
import SecureInput from '@/components/admin/SecureInput';

export default function ApiSettingsPage() {
    const [activeTab, setActiveTab] = useState('payment');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings/api');
            const data = await res.json();
            setSettings(data);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings/api', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    updates: settings,
                    changedBy: 'admin', // TODO: Get from session
                }),
            });

            if (res.ok) {
                alert('Settings saved successfully!');
            } else {
                alert('Failed to save settings');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    const updateField = (field: string, value: any) => {
        setSettings({ ...settings, [field]: value });
    };

    if (loading) {
        return <div className="flex items-center justify-center h-96"><RefreshCw className="animate-spin" size={32} /></div>;
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">API & Integration Settings</h1>
                    <p className="text-gray-500 mt-2">Manage payment gateways, email, messaging, and automation integrations</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            <ApiSettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                {activeTab === 'payment' && <PaymentGatewaysTab settings={settings} updateField={updateField} />}
                {activeTab === 'email' && <EmailSmsTab settings={settings} updateField={updateField} />}
                {activeTab === 'messaging' && <MessagingTab settings={settings} updateField={updateField} />}
                {activeTab === 'services' && <GoogleCloudTab settings={settings} updateField={updateField} />}
                {activeTab === 'automation' && <AutomationTab settings={settings} updateField={updateField} />}
                {activeTab === 'general' && <GeneralTab settings={settings} updateField={updateField} />}
            </div>
        </div>
    );
}

// Payment Gateways Tab
function PaymentGatewaysTab({ settings, updateField }: any) {
    return (
        <div className="space-y-8">
            {/* Paymob */}
            <div className="border-b pb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">Paymob (Egypt)</h3>
                        <p className="text-sm text-gray-500">Accept payments via cards, wallets, and installments</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings?.paymobEnabled || false}
                            onChange={(e) => updateField('paymobEnabled', e.target.checked)}
                            className="w-5 h-5 rounded"
                        />
                        <span className="font-medium">Enabled</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Customer-Facing Label (Bilingual)</label>
                        <input
                            type="text"
                            value={settings?.paymobLabel || ''}
                            onChange={(e) => updateField('paymobLabel', e.target.value)}
                            placeholder="e.g., بطاقة الائتمان / Credit Card"
                            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">This label will be shown to customers during checkout</p>
                    </div>
                    <SecureInput label="API Key" name="paymobApiKey" value={settings?.paymobApiKey || ''} onChange={(e) => updateField('paymobApiKey', e.target.value)} />
                    <SecureInput label="Secret Key" name="paymobSecretKey" value={settings?.paymobSecretKey || ''} onChange={(e) => updateField('paymobSecretKey', e.target.value)} />
                    <SecureInput label="Public Key" name="paymobPublicKey" value={settings?.paymobPublicKey || ''} onChange={(e) => updateField('paymobPublicKey', e.target.value)} />
                    <div>
                        <label className="block text-sm font-medium mb-2">Integration ID</label>
                        <input type="text" value={settings?.paymobIntegrationId || ''} onChange={(e) => updateField('paymobIntegrationId', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">iFrame ID</label>
                        <input type="text" value={settings?.paymobIframeId || ''} onChange={(e) => updateField('paymobIframeId', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <SecureInput label="HMAC Secret" name="paymobHmacSecret" value={settings?.paymobHmacSecret || ''} onChange={(e) => updateField('paymobHmacSecret', e.target.value)} />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={settings?.paymobTestMode || false} onChange={(e) => updateField('paymobTestMode', e.target.checked)} className="w-5 h-5 rounded" />
                        <label className="text-sm font-medium">Test Mode (Sandbox)</label>
                    </div>
                </div>
            </div>

            {/* Stripe */}
            <div className="border-b pb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">Stripe</h3>
                        <p className="text-sm text-gray-500">International payment processing</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={settings?.stripeEnabled || false} onChange={(e) => updateField('stripeEnabled', e.target.checked)} className="w-5 h-5 rounded" />
                        <span className="font-medium">Enabled</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SecureInput label="Public Key" name="stripePublicKey" value={settings?.stripePublicKey || ''} onChange={(e) => updateField('stripePublicKey', e.target.value)} />
                    <SecureInput label="Secret Key" name="stripeSecretKey" value={settings?.stripeSecretKey || ''} onChange={(e) => updateField('stripeSecretKey', e.target.value)} />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={settings?.stripeTestMode || false} onChange={(e) => updateField('stripeTestMode', e.target.checked)} className="w-5 h-5 rounded" />
                        <label className="text-sm font-medium">Test Mode</label>
                    </div>
                </div>
            </div>

            {/* Fawry */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">Fawry</h3>
                        <p className="text-sm text-gray-500">Cash payment via Fawry kiosks</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={settings?.fawryEnabled || false} onChange={(e) => updateField('fawryEnabled', e.target.checked)} className="w-5 h-5 rounded" />
                        <span className="font-medium">Enabled</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Merchant Code</label>
                        <input type="text" value={settings?.fawryMerchantCode || ''} onChange={(e) => updateField('fawryMerchantCode', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <SecureInput label="Security Key" name="fawrySecurityKey" value={settings?.fawrySecurityKey || ''} onChange={(e) => updateField('fawrySecurityKey', e.target.value)} />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={settings?.fawryTestMode || false} onChange={(e) => updateField('fawryTestMode', e.target.checked)} className="w-5 h-5 rounded" />
                        <label className="text-sm font-medium">Test Mode</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Email & SMS Tab
function EmailSmsTab({ settings, updateField }: any) {
    return (
        <div className="space-y-8">
            <div className="border-b pb-8">
                <h3 className="text-xl font-bold mb-6">Email Service</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Provider</label>
                        <select value={settings?.emailProvider || 'resend'} onChange={(e) => updateField('emailProvider', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                            <option value="resend">Resend</option>
                            <option value="sendgrid">SendGrid</option>
                            <option value="smtp">SMTP</option>
                        </select>
                    </div>
                    <SecureInput label="API Key" name="emailApiKey" value={settings?.emailApiKey || ''} onChange={(e) => updateField('emailApiKey', e.target.value)} />
                    <div>
                        <label className="block text-sm font-medium mb-2">From Email</label>
                        <input type="email" value={settings?.emailFromAddress || ''} onChange={(e) => updateField('emailFromAddress', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">From Name</label>
                        <input type="text" value={settings?.emailFromName || ''} onChange={(e) => updateField('emailFromName', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">SMS (Twilio)</h3>
                        <p className="text-sm text-gray-500">Send booking confirmations via SMS</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={settings?.smsEnabled || false} onChange={(e) => updateField('smsEnabled', e.target.checked)} className="w-5 h-5 rounded" />
                        <span className="font-medium">Enabled</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SecureInput label="Account SID" name="twilioAccountSid" value={settings?.twilioAccountSid || ''} onChange={(e) => updateField('twilioAccountSid', e.target.value)} />
                    <SecureInput label="Auth Token" name="twilioAuthToken" value={settings?.twilioAuthToken || ''} onChange={(e) => updateField('twilioAuthToken', e.target.value)} />
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <input type="tel" value={settings?.twilioPhoneNumber || ''} onChange={(e) => updateField('twilioPhoneNumber', e.target.value)} placeholder="+1234567890" className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Messaging Tab
function MessagingTab({ settings, updateField }: any) {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold">WhatsApp Business API</h3>
                    <p className="text-sm text-gray-500">Send booking updates via WhatsApp</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={settings?.whatsappEnabled || false} onChange={(e) => updateField('whatsappEnabled', e.target.checked)} className="w-5 h-5 rounded" />
                    <span className="font-medium">Enabled</span>
                </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SecureInput label="API Key" name="whatsappApiKey" value={settings?.whatsappApiKey || ''} onChange={(e) => updateField('whatsappApiKey', e.target.value)} />
                <div>
                    <label className="block text-sm font-medium mb-2">Phone Number ID</label>
                    <input type="text" value={settings?.whatsappPhoneId || ''} onChange={(e) => updateField('whatsappPhoneId', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                </div>
            </div>
        </div>
    );
}

// Google & Cloud Tab
function GoogleCloudTab({ settings, updateField }: any) {
    return (
        <div className="space-y-8">
            <div className="border-b pb-8">
                <h3 className="text-xl font-bold mb-6">Google Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SecureInput label="Google Maps API Key" name="googleMapsApiKey" value={settings?.googleMapsApiKey || ''} onChange={(e) => updateField('googleMapsApiKey', e.target.value)} />
                    <div>
                        <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
                        <input type="text" value={settings?.googleAnalyticsId || ''} onChange={(e) => updateField('googleAnalyticsId', e.target.value)} placeholder="G-XXXXXXXXXX" className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">Cloudinary</h3>
                        <p className="text-sm text-gray-500">Image hosting and optimization</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={settings?.cloudinaryEnabled || false} onChange={(e) => updateField('cloudinaryEnabled', e.target.checked)} className="w-5 h-5 rounded" />
                        <span className="font-medium">Enabled</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Cloud Name</label>
                        <input type="text" value={settings?.cloudinaryCloudName || ''} onChange={(e) => updateField('cloudinaryCloudName', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <SecureInput label="API Key" name="cloudinaryApiKey" value={settings?.cloudinaryApiKey || ''} onChange={(e) => updateField('cloudinaryApiKey', e.target.value)} />
                    <SecureInput label="API Secret" name="cloudinaryApiSecret" value={settings?.cloudinaryApiSecret || ''} onChange={(e) => updateField('cloudinaryApiSecret', e.target.value)} />
                </div>
            </div>
        </div>
    );
}

// Automation Tab (n8n)
function AutomationTab({ settings, updateField }: any) {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold">n8n Webhook Integration</h3>
                    <p className="text-sm text-gray-500">Automate SEO content creation and publishing</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={settings?.n8nEnabled || false} onChange={(e) => updateField('n8nEnabled', e.target.checked)} className="w-5 h-5 rounded" />
                    <span className="font-medium">Enabled</span>
                </label>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Webhook URL</label>
                    <input type="url" value={settings?.n8nWebhookUrl || ''} onChange={(e) => updateField('n8nWebhookUrl', e.target.value)} placeholder="https://your-n8n-instance.com/webhook/..." className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <SecureInput label="API Key (Optional)" name="n8nApiKey" value={settings?.n8nApiKey || ''} onChange={(e) => updateField('n8nApiKey', e.target.value)} />
                <div className="flex items-center gap-2">
                    <input type="checkbox" checked={settings?.n8nAutoPublish || false} onChange={(e) => updateField('n8nAutoPublish', e.target.checked)} className="w-5 h-5 rounded" />
                    <label className="text-sm font-medium">Auto-publish content from n8n</label>
                </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>How it works:</strong> n8n can automatically generate SEO-optimized blog posts and send them to this webhook. Enable auto-publish to make them live immediately.
                </p>
            </div>
        </div>
    );
}

// General Tab
function GeneralTab({ settings, updateField }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium mb-2">Default Currency</label>
                <select value={settings?.currency || 'EGP'} onChange={(e) => updateField('currency', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                    <option value="EGP">EGP - Egyptian Pound</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="SAR">SAR - Saudi Riyal</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select value={settings?.timezone || 'Africa/Cairo'} onChange={(e) => updateField('timezone', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                    <option value="Africa/Cairo">Cairo (GMT+2)</option>
                    <option value="Asia/Dubai">Dubai (GMT+4)</option>
                    <option value="Asia/Riyadh">Riyadh (GMT+3)</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Default Language</label>
                <select value={settings?.defaultLanguage || 'ar'} onChange={(e) => updateField('defaultLanguage', e.target.value)} className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                    <option value="ar">Arabic</option>
                    <option value="en">English</option>
                </select>
            </div>
        </div>
    );
}
