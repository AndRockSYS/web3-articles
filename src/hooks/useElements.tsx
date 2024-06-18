const useElements = () => {
    const getElements = (): NodeListOf<HTMLElement> => {
        return document.querySelectorAll('.add-article div.article > *');
    };

    const handleRows = (key: string, tag: string) => {
        if (key == 'Enter' && tag != 'p') addElement('p');
        if (key == 'Backspace' || key == 'Delete') {
            const elements = getElements();
            elements.forEach((item, index) => {
                console.log(item.tagName);
                if (!item.textContent?.length && item.id != 'article' && item.tagName != 'IMG') {
                    item.remove();
                    elements[index - 1].focus();
                }
            });
        }
    };

    const addImage = async (image: File) => {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const src = `data:image/png;base64,${buffer.toString('base64')}`;

        const img = document.createElement('img');
        img.onclick = () => img.remove();
        img.src = src;

        const parent = document.querySelector('.add-article div.article');
        parent?.appendChild(img);

        addElement('p');
    };

    const addText = (value: string) => {
        const newElement = document.createElement(value);
        return newElement;
    };

    const addLink = () => {
        const newElement = document.createElement('a');
        newElement.textContent = 'Your Link';
        return newElement;
    };

    const addElement = (value: string) => {
        const newElement = value == 'link' ? addLink() : addText(value);

        newElement.contentEditable = 'true';
        newElement.onkeydown = (event) => handleRows(event.key, value);

        const parent = document.querySelector('.add-article div.article');
        parent?.appendChild(newElement);

        newElement.focus();
    };

    return { addElement, addImage, getElements };
};

export default useElements;
