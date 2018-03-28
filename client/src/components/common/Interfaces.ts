export interface File {
    _id: string;
    name: string;
    size: number;
    expired: Date;
    created: Date;
}

export interface ServerResponse {
    success: boolean;
    error: string;
    data: any;
}

export interface Action {
    type: string;
    payload?: any;
}