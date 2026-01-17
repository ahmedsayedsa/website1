'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface EditModeContextType {
    isEditMode: boolean;
    toggleEditMode: () => void;
    editingElement: string | null;
    setEditingElement: (id: string | null) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export function EditModeProvider({ children }: { children: ReactNode }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingElement, setEditingElement] = useState<string | null>(null);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
        setEditingElement(null);
    };

    return (
        <EditModeContext.Provider value={{ isEditMode, toggleEditMode, editingElement, setEditingElement }}>
            {children}
        </EditModeContext.Provider>
    );
}

export function useEditMode() {
    const context = useContext(EditModeContext);
    if (context === undefined) {
        throw new Error('useEditMode must be used within EditModeProvider');
    }
    return context;
}
