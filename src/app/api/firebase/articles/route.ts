import { NextRequest, NextResponse } from 'next/server';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { child, Database, get, getDatabase, ref, remove, update } from 'firebase/database';

import firebaseConfig from '@/config/firebase.json';

async function authenticateFirebase(): Promise<Database> {
    const auth = getAuth(initializeApp(firebaseConfig));
    await signInWithEmailAndPassword(auth, 'marketmycoin@gmail.com', 'Bitcoin@$2024$').catch(
        (error) => console.log(error)
    );
    return getDatabase(auth.app);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const database = await authenticateFirebase();
        const snapshot = !body.articleAddress
            ? await get(ref(database))
            : await get(child(ref(database), `/${body.articleAddress}`));

        if (!snapshot.exists()) throw new Error('Snapshot does not exist');

        return NextResponse.json({ data: snapshot.val() }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error, data: undefined },
            { status: 500, statusText: 'Internal Error' }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.article) throw new Error('No article data was provided');
        if (!body.articleAddress) throw new Error('No article address was provided');

        const database = await authenticateFirebase();
        const updates: any = {};
        updates[`/${body.articleAddress}`] = body.article;
        await update(ref(database), updates);

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500, statusText: 'Internal Error' });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.articleAddress) throw new Error('No article address was provided');

        const database = await authenticateFirebase();
        await remove(ref(database, `/${body.articleAddress}`));

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500, statusText: 'Internal Error' });
    }
}
