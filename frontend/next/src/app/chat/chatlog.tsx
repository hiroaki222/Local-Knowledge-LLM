import {atom} from 'recoil'

interface  Message {
    id: number;
    content: string;
    sender: string;
}

export const chatLogState = atom<Message[]>({
    key: 'chatLogState',
    default:[
        {id: 1, content: "こんにちは", sender: "user"},
        {id: 2, content: "黙れ", sender: "other"}

    ],
});