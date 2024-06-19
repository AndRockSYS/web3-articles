import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { child, get, getDatabase, ref, remove, update } from 'firebase/database';

import firebaseConfig from '@/config/firebase.json';

import { Article } from 'typings';

export default class KeyStore {
    private db = getDatabase(initializeApp(firebaseConfig));

    async authenticate() {
        const auth = getAuth(initializeApp(firebaseConfig));
        await signInWithEmailAndPassword(auth, 'marketmycoin@gmail.com', 'Bitcoin@$2024$').catch(
            (error) => console.log(error)
        );

        this.db = getDatabase(auth.app);
    }

    async getAllArticles(): Promise<{ [key: string]: Article }> {
        const snapshot = await get(child(ref(this.db), ''));
        return snapshot.val();
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
