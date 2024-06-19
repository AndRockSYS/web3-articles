import imageCompressor from '@/utils/imageCompressor';

const useArticle = () => {
    const getElements = (): NodeListOf<HTMLElement> => {
        return document.querySelectorAll('.add-article div.article > *');
    };

    const handleRows = (key: string, tag: string) => {
        if (key == 'Enter' && tag != 'p') addElement('p');

        if (key == 'Backspace' || key == 'Delete') {
            const elements = getElements();
            elements.forEach((item, index) => {
                if (!item.textContent?.length && item.id != 'article' && item.tagName != 'IMG') {
                    item.remove();
                    elements[index - 1].focus();
                }
            });
        }
    };

    const addImage = async (image: File) => {
        const img = document.createElement('img');
        img.onclick = () => img.remove();
        img.src = await imageCompressor(image);
        return img;
    };

    const addElement = async (value: string, imageFile?: File | null) => {
        let newElement = document.createElement(value);

        if (value == 'img' && imageFile) {
            newElement = await addImage(imageFile);
        } else {
            if (value == 'a') newElement.textContent = 'Text with Link';

            newElement.contentEditable = 'true';
            newElement.onkeydown = (event) => handleRows(event.key, value);
        }

        const parent = document.querySelector('.add-article div.article');
        parent?.appendChild(newElement);

        if (value == 'img') {
            addElement('p');
        }

        newElement.focus();
    };

    return { addElement, addImage, getElements };
};

export default useArticle;
