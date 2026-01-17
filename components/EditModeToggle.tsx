'use client';

import { useEditMode } from '@/contexts/EditModeContext';
import { Edit3, Save } from 'lucide-react';

export default function EditModeToggle() {
    const { isEditMode, toggleEditMode } = useEditMode();

    return (
        <button
            onClick={toggleEditMode}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 rounded-full shadow-lg font-bold transition-all ${isEditMode
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        >
            {isEditMode ? (
                <>
                    <Save size={20} />
                    Exit Edit Mode
                </>
            ) : (
                <>
                    <Edit3 size={20} />
                    Edit Page
                </>
            )}
        </button>
    );
}
