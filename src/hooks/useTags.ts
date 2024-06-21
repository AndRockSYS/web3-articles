import { useState } from 'react';

const useTags = () => {
    const tags = ['DeFi', 'AI', 'GameFi', 'RWA', 'Other'];

    const [selectedTag, setSelectedTag] = useState('');

    return { selectedTag, tags, setSelectedTag };
};

export default useTags;
