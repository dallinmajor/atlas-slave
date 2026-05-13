import { NextRequest, NextResponse } from 'next/server';
import { BrevoClient } from '@getbrevo/brevo';

type SignupPayload = {
    email?: string;
    firstName?: string;
    lastName?: string;
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: NextRequest) {
    let payload: SignupPayload;

    try {
        payload = (await request.json()) as SignupPayload;
    } catch {
        return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    const email = payload.email?.trim() || '';
    const firstName = payload.firstName?.trim() || '';
    const lastName = payload.lastName?.trim() || '';

    if (!email || !firstName || !lastName) {
        return NextResponse.json(
            { error: 'Email, first name, and last name are required.' },
            { status: 400 }
        );
    }

    if (!isValidEmail(email)) {
        return NextResponse.json(
            { error: 'Please provide a valid email address.' },
            { status: 400 }
        );
    }

    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!brevoApiKey) {
        return NextResponse.json(
            { error: 'Missing BREVO_API_KEY environment variable.' },
            { status: 500 }
        );
    }

    try {
        const client = new BrevoClient({ apiKey: brevoApiKey });

        await client.contacts.createContact({
            email,
            attributes: {
                FNAME: firstName,
                LNAME: lastName,
            },
            updateEnabled: true,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Brevo request failed.';

        return NextResponse.json(
            { error: 'Failed to create contact in Brevo.', detail: message },
            { status: 502 }
        );
    }

    return NextResponse.json(
        {
            success: true,
            data: {
                email,
                firstName,
                lastName,
            },
        },
        { status: 200 }
    );
}
