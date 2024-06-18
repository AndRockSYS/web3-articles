import { useState } from 'react';

const useTags = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [freeTags, setFreeTags] = useState<string[]>([
        'DeFi',
        'AI',
        'Other',
        'GameFi',
        'RWA',
        'DAO',
    ]);

    const selectTag = (tag: string) => {
        const selected = [...selectedTags];
        selected.push(tag);

        const free = [...freeTags];
        free.splice(free.indexOf(tag), 1);
        console.log(free);

        setSelectedTags(selected);
        setFreeTags(free);
    };

    // const deselectTag = (tag: string) => {
    //     const free = [...freeTags];
    //     free.push(tag);

    //     const selected = [...selectedTags];
    //     selected.splice(selected.indexOf(tag), 1);

    //     setFreeTags(free);
    //     setSelectedTags(selected);
    // };

    return { selectedTags, freeTags, selectTag };
};

export default useTags;
