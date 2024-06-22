import { Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import { InputTransactionData, useWallet } from '@aptos-labs/wallet-adapter-react';

import CryptoJS from 'crypto-js';

const privateK = '0x04db08719c4351d684a13f70a0a973e8f014d5e2b13f0c09d698a56e563b648c';
const publicK = '4d031dfec57633364efc929e652b438ad100e89319f89cb6754aa347e6e38e5c';

const useAptos = () => {
    const { account, signAndSubmitTransaction } = useWallet();

    const signSignature = (message: string): [string, string] => {
        const privateKey = new Ed25519PrivateKey(privateK);
        const hashedMessage = CryptoJS.SHA256(message + Date.now()).toString(CryptoJS.enc.Hex);
        const signature = privateKey.sign(hashedMessage).toString();
        return [signature, hashedMessage];
    };

    const toVectorU8 = (signature: string): number[] => {
        const result: number[] = [];
        for (let i = 0; i < signature.length; i += 2) {
            result.push(Number(`0x${signature.slice(i, i + 2)}`));
        }
        return result;
    };

    const sendArticle = async (name: string, description: string): Promise<string> => {
        toVectorU8('4d031dfec57633364efc929e652b438ad100e89319f89cb6754aa347e6e38e5c');

        const [signature, hashedMessage] = signSignature(name + description);

        const tx: InputTransactionData = {
            data: {
                function: `${
                    process.env.NEXT_PUBLIC_MODULE_ADDRESS as string
                }::articles::add_article`,
                functionArguments: [
                    name,
                    description,
                    toVectorU8(signature.slice(2)),
                    toVectorU8(publicK),
                    toVectorU8(hashedMessage),
                ],
            },
        };

        const data = await signAndSubmitTransaction(tx);
        for (let event of data.output.events) {
            if (event.type.includes(process.env.NEXT_PUBLIC_MODULE_ADDRESS as string)) {
                return event.data.token_id;
            }
        }

        return '0x0';
    };

    return { sendArticle };
};

export default useAptos;
