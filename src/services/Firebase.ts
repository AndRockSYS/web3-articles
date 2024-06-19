import { FirebaseApp, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { child, get, getDatabase, ref, remove, update } from 'firebase/database';

import firebaseConfig from '@/config/firebase.json';

import { Article } from 'typings';

export default class KeyStore {
    private app: FirebaseApp = initializeApp(firebaseConfig);
    private db = getDatabase(this.app);

    async initialize() {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
            auth,
            'tbp.world.aptos@gmail.com',
            'tbp-world-aptos'
        ).catch((error) => console.log(error));

        this.app = auth.app;
        this.db = getDatabase(this.app);
    }

    async getArtilce(articleAddress: string): Promise<Article | undefined> {
        const snapshot = await get(child(ref(this.db), `${articleAddress}`));
        return snapshot.exists() ? JSON.parse(snapshot.val()) : undefined;
    }

    async addArticle(articleAddress: string, article: Article) {
        const updates: any = {};
        updates[`${articleAddress}`] = article;
        await update(ref(this.db), updates);
    }

    async removeArticle(articleAddress: string) {
        await remove(ref(this.db, `${articleAddress}`));
    }
}
