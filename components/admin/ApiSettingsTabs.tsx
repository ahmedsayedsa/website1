'use client';

import { useState } from 'react';
import { CreditCard, Mail, MessageSquare, Globe, Cloud, Webhook, Settings as SettingsIcon } from 'lucide-react';

interface TabProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function ApiSettingsTabs({ activeTab, setActiveTab }: TabProps) {
    const tabs = [
        { id: 'payment', label: 'Payment Gateways', icon: CreditCard },
        { id: 'email', label: 'Email & SMS', icon: Mail },
        { id: 'messaging', label: 'Messaging', icon: MessageSquare },
        { id: 'services', label: 'Google & Cloud', icon: Cloud },
        { id: 'automation', label: 'n8n Automation', icon: Webhook },
        { id: 'general', label: 'General', icon: SettingsIcon },
    ];

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition
                ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
              `}
                        >
                            <Icon size={18} />
                            {tab.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
