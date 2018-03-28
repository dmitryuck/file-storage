import { Request, Response } from 'express';
import { ServerResponse } from './Interfaces';

export class ResponseObject {
    static success(data: any): ServerResponse {
        return { success: true, error: null, data: data }
    }

    static error(error: string): ServerResponse {
        return { success: false, error: error, data: null }
    }

    static makeSuccess(res: Response, data): Response {
        return res.json(ResponseObject.success(data));
    }

    static makeError(res: Response, error: string): Response {
        return res.json(ResponseObject.error(error));
    }
}
