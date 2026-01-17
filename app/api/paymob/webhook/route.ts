import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { searchParams } = new URL(request.url);
        const hmac = searchParams.get('hmac');

        // Verify HMAC in real production
        // const calculatedHmac = crypto.createHmac('sha512', process.env.PAYMOB_HMAC_SECRET!).update(JSON.stringify(body)).digest('hex');

        console.log('PayMob Webhook received:', body);

        // Update booking status in DB based on body.success

        return NextResponse.json({ received: true });
    } catch (error) {
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}
