export interface ICreateMemo {
    title: string;
    author: string;
    text: string;
    date: Date;
}

export interface IMemo extends ICreateMemo{
    id: string;
}