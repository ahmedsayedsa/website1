'use client';

import { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Save, X } from 'lucide-react';

interface EditableTextProps {
    id: string;
    value: string;
    onSave: (newValue: string) => Promise<void>;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
}

export default function EditableText({
    id,
    value,
    onSave,
    className = '',
    multiline = false,
    placeholder = 'Click to edit...'
}: EditableTextProps) {
    const { isEditMode, editingElement, setEditingElement } = useEditMode();
    const [editValue, setEditValue] = useState(value);
    const [isSaving, setIsSaving] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const isEditing = isEditMode && editingElement === id;

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleClick = () => {
        if (isEditMode && !isEditing) {
            setEditingElement(id);
            setEditValue(value);
        }
    };

    const handleSave = async () => {
        if (editValue !== value) {
            setIsSaving(true);
            try {
                await onSave(editValue);
            } catch (error) {
                console.error('Failed to save:', error);
                alert('Failed to save changes');
                setEditValue(value);
            } finally {
                setIsSaving(false);
            }
        }
        setEditingElement(null);
    };

    const handleCancel = () => {
        setEditValue(value);
        setEditingElement(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleCancel();
        } else if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            handleSave();
        }
    };

    if (!isEditMode) {
        return <span className={className}>{value || placeholder}</span>;
    }

    if (isEditing) {
        return (
            <div className="relative inline-block w-full">
                {multiline ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`${className} border-2 border-blue-500 rounded px-2 py-1 w-full min-h-[100px]`}
                        disabled={isSaving}
                    />
                ) : (
                    <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`${className} border-2 border-blue-500 rounded px-2 py-1 w-full`}
                        disabled={isSaving}
                    />
                )}
                <div className="absolute -right-20 top-0 flex gap-1">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-green-500 text-white p-1 rounded hover:bg-green-600 disabled:opacity-50"
                        title="Save (Enter)"
                    >
                        <Save size={16} />
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600 disabled:opacity-50"
                        title="Cancel (Esc)"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <span
            onClick={handleClick}
            className={`${className} cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 rounded px-1 transition`}
            title="Click to edit"
        >
            {value || placeholder}
        </span>
    );
}
