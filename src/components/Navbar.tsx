import Image from 'next/image';

import './navbar.css';

export default function Navbar() {
    return (
        <nav>
            <h1>Mirror Copy</h1>
            <button>
                <Image src='/icons/wallet.svg' alt='wallet' height={32} width={32} />
                Connect
            </button>
        </nav>
    );
}
