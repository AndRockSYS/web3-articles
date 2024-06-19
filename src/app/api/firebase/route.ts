import { NextRequest, NextResponse } from 'next/server';

import Firebase from '@/services/Firebase';

import { Article } from 'typings';

interface Body {
    articleAddress?: string;
    article?: Article;
}

const firebase = new Firebase();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        await firebase.authenticate();

        const data = body.articleAddress
            ? await firebase.getArtilce(body.articleAddress)
            : await firebase.getAllArticles();

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error, data: undefined },
            { status: 500, statusText: 'Internal Error' }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body: Body = await req.json();

        if (!body.article) throw new Error('No article data was provided');
        if (!body.articleAddress) throw new Error('No article address was provided');

        await firebase.authenticate();

        await firebase.addArticle(body.articleAddress, body.article);

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500, statusText: 'Internal Error' });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body: Body = await req.json();

        if (!body.articleAddress) throw new Error('No article address was provided');

        await firebase.authenticate();
        await firebase.removeArticle(body.articleAddress);

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500, statusText: 'Internal Error' });
    }
}
