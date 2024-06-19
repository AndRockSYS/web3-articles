import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: '/api/firebase',
};

export function middleware(req: NextRequest) {
    if (!req.nextUrl.origin.includes(process.env.NEXT_PUBLIC_APP_URL as string))
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    return NextResponse.next();
}
