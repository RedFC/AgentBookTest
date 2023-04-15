export interface ISuccess {
    status: boolean;
    message?: string;
    msg?:string;
    code: number;
    data: object;
}

export interface ISuccessLogin extends ISuccess{
    accessToken : String
}

export interface IRejected {
    status: boolean;
    message?: string;
    msg?:string;
    code: number;
}