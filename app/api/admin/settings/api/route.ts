import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

async function checkAuth(request: NextRequest) {
    const token = request.cookies.get('session')?.value;
    if (!token) return false;
    return await verifyToken(token);
}

export async function GET(request: NextRequest) {
    const isAuth = await checkAuth(request);
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let settings = await prisma.apiSettings.findFirst();

        // Create default settings if none exist
        if (!settings) {
            settings = await prisma.apiSettings.create({
                data: {},
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching API settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const isAuth = await checkAuth(request);
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { updates, changedBy } = body;

        // Get current settings
        let settings = await prisma.apiSettings.findFirst();

        if (!settings) {
            settings = await prisma.apiSettings.create({ data: {} });
        }

        // Log changes to history
        const historyEntries = Object.entries(updates).map(([field, newValue]) => ({
            settingId: settings!.id,
            field,
            oldValue: (settings as any)[field]?.toString() || null,
            newValue: newValue?.toString() || null,
            changedBy: changedBy || 'admin',
            ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        }));

        await prisma.apiSettingsHistory.createMany({
            data: historyEntries,
        });

        // Update settings
        const updatedSettings = await prisma.apiSettings.update({
            where: { id: settings.id },
            data: {
                ...updates,
                updatedBy: changedBy || 'admin',
            },
        });

        return NextResponse.json(updatedSettings);
    } catch (error) {
        console.error('Error updating API settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
