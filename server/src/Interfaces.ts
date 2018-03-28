export interface ServerResponse {
    success: boolean;
    error: string;
    data: any;
}

export interface File {
    name: string;
    created: Date;
    expired: Date;
}