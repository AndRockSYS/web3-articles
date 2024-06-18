import Image from 'next/image';
import { useMemo, useState } from 'react';

import useArticle from '@/hooks/useArticle';

import './edit-tools.css';

export default function EditTools() {
    const { addElement, getElements } = useArticle();

    const [linkInputOpened, setLinkInputOpened] = useState(false);

    const openCloseTools = () => {
        const list = document.querySelector('main.add-article > div.tool > ul') as HTMLElement;
        list.style.display = list.style.display.includes('none') ? 'block' : 'none';
    };

    const elements = [
        { value: 'img', name: 'Image' },
        { value: 'h2', name: 'Heading 2' },
        { value: 'h3', name: 'Heading 3' },
        { value: 'a', name: 'Link' },
    ];

    return (
        <>
            {useMemo(() => {
                if (!linkInputOpened) return <></>;

                return (
                    <input
                        className='link-input'
                        type='text'
                        placeholder='Paste the link'
                        onChange={(event) => {
                            getElements().forEach((item) => {
                                const anchor = item as HTMLAnchorElement;
                                if (anchor.tagName == 'A' && anchor.href == '')
                                    (item as HTMLAnchorElement).href = event.target.value;
                            });
                            setLinkInputOpened(false);
                        }}
                    />
                );
            }, [linkInputOpened])}

            <div className='tool'>
                <ul>
                    {elements.map((element) => (
                        <li
                            key={element.name}
                            value={element.value}
                            onClick={() => {
                                if (element.value == 'img') return;

                                setLinkInputOpened(element.value == 'a');
                                addElement(element.value);
                                openCloseTools();
                            }}
                        >
                            {element.value == 'img' ? (
                                <input
                                    type='file'
                                    accept='image/png, image/jpeg'
                                    onChange={(event) => addElement('img', event.target.files?.[0])}
                                />
                            ) : (
                                <></>
                            )}

                            <Image
                                src={`/icons/elements/${
                                    element.value.includes('h') ? 'heading' : element.value
                                }.svg`}
                                alt='add'
                                width={32}
                                height={32}
                            />
                            {element.name}
                        </li>
                    ))}
                </ul>
                <button id='gray-button' onClick={openCloseTools}>
                    <Image src={'/icons/add.svg'} alt='add' width={32} height={32} />
                    Add Element
                </button>
            </div>
        </>
    );
}
