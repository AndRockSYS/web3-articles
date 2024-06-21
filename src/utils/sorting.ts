import { Article } from 'typings';

export const sortByTag = (input: Article[], tag: string): Article[] => {
    return input.sort((a, b) => {
        if (a.tags.includes(tag) && !b.tags.includes(tag)) return -1;
        if (!a.tags.includes(tag) && b.tags.includes(tag)) return 1;
        return 0;
    });
};
