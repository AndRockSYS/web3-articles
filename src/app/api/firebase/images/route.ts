import { NextRequest, NextResponse } from 'next/server';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
    deleteObject,
    FirebaseStorage,
    getDownloadURL,
    getStorage,
    listAll,
    ref,
    uploadString,
} from 'firebase/storage';

import firebaseConfig from '@/config/firebase.json';

async function authenticate(): Promise<FirebaseStorage> {
    const auth = getAuth(initializeApp(firebaseConfig));
    await signInWithEmailAndPassword(auth, 'marketmycoin@gmail.com', 'Bitcoin@$2024$').catch(
        (error) => console.log(error)
    );
    return getStorage(auth.app);
}

export async function POST(req: NextRequest) {
    try {
        const storage = await authenticate();

        const reference = ref(storage, `banner`);
        const list = await listAll(reference);

        const urls: string[] = [];

        for (let item of list.items) {
            urls.push(await getDownloadURL(item));
        }

        return NextResponse.json({ link: urls });
    } catch (error) {
        return NextResponse.json(
            { error, link: undefined },
            { status: 500, statusText: 'Internal Error' }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.articleAddress) throw new Error('No article address was provided');
        if (!body.image) throw new Error('No image was provided');

        const storage = await authenticate();

        const timestamp = Date.now();
        const reference = ref(storage, `${body.articleAddress}/${timestamp}.jpg`);
        await uploadString(reference, body.image, 'data_url');

        const link = await getDownloadURL(ref(storage, `${body.articleAddress}/${timestamp}.jpg`));

        return NextResponse.json({ link }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error, link: undefined },
            { status: 500, statusText: 'Internal Error' }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.articleAddress) throw new Error('No article address was provided');

        const storage = await authenticate();

        const reference = ref(storage, `${body.articleAddress}`);
        const list = await listAll(reference);
        list.items.forEach(async (image) => {
            await deleteObject(ref(storage, image.fullPath));
        });
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500, statusText: 'Internal Error' });
    }
}
