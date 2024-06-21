import Image from 'next/image';

import './banner.css';

export default function Banner() {
    return <Image className='banner' src={'/banner.png'} alt='banner' height={500} width={2500} />;
}
