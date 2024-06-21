import { Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import { InputTransactionData, useWallet } from '@aptos-labs/wallet-adapter-react';

import CryptoJS from 'crypto-js';

const [publicK, privateK] = [
    '0x4d031dfec57633364efc929e652b438ad100e89319f89cb6754aa347e6e38e5c',
    '0x04db08719c4351d684a13f70a0a973e8f014d5e2b13f0c09d698a56e563b648c',
];

const useAptos = () => {
    const { account, signAndSubmitTransaction } = useWallet();

    const signSignature = (message: string): [string, string, string] => {
        const privateKey = new Ed25519PrivateKey(privateK);
        const hashedMessage = CryptoJS.SHA256(message + Date.now()).toString(CryptoJS.enc.Hex);
        const signature = privateKey.sign(hashedMessage).toString();
        return [signature, publicK, hashedMessage];
    };

    const sendArticle = async (name: string, description: string): Promise<string | undefined> => {
        if (!account) {
            alert('Connect Wallet!');
            return;
        }

        const [signature, publicKey, hashedMessage] = signSignature(name + description);

        const utf8Encode = new TextEncoder();
        utf8Encode.encode('abc');

        const tx: InputTransactionData = {
            data: {
                function: `${
                    process.env.NEXT_PUBLIC_MODULE_ADDRESS as string
                }::articles::add_article`,
                functionArguments: [
                    name,
                    description,
                    utf8Encode.encode(signature),
                    utf8Encode.encode(publicKey),
                    utf8Encode.encode(hashedMessage),
                ],
            },
        };

        const data = await signAndSubmitTransaction(tx);
        console.log(data);
    };

    return { sendArticle };
};

export default useAptos;
