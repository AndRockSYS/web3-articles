import { NextRequest, NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const ownerMail = 'marketmycoin@gmail.com';

        const body = await req.json();

        if (!body.account) throw new Error('Account was not provided');
        if (!body.name) throw new Error('Name was not provided');
        if (!body.message) throw new Error('Message was not provided');
        if (!body.date) throw new Error('Date was not provided');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: ownerMail,
                pass: 'ctja jlxm hjtd fnbd',
            },
        });

        await transporter.sendMail({
            from: ownerMail,
            to: ownerMail,
            subject: `Name - ${body.name}, X - ${body.account}`,
            text: `Message - ${body.message}. Date - ${body.date}`,
        });
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
