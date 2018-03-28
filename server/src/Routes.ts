import { Request, Response } from 'express';
import { ServerApi } from './ServerApi';
import { FileService } from './FileService';
import { Middlewares } from './Middlewares';

export function assignRoutes(app: any) {
    app.post('/' + ServerApi.FILES, Middlewares.uploadMiddlewareSingle(), (req: Request, res: Response) => {
        FileService.uploadFile(req, res);
    });

    app.get('/' + ServerApi.FILES, (req: Request, res: Response) => {
        FileService.getFiles(req, res);
    });

    app.delete('/' + ServerApi.FILES, (req: Request, res: Response) => {
        FileService.deleteFile(req, res);
    });
}
