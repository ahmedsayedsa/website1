'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface SecureInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

export default function SecureInput({ label, name, value, onChange, placeholder, required }: SecureInputProps) {
    const [showValue, setShowValue] = useState(false);

    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="relative">
                <input
                    type={showValue ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full px-4 py-2 pr-10 rounded-lg border dark:bg-gray-700 dark:border-gray-600 font-mono text-sm"
                />
                <button
                    type="button"
                    onClick={() => setShowValue(!showValue)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showValue ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
}
