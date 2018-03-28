import { Request, Response } from 'express';
import fs from 'fs';
import { Const } from './Const';
import { ResponseObject } from './ResponseObject';
import { FilesModel } from './Models';

export class FileService {
    static async uploadFile(req: Request, res: Response) {
        const inputFile = (req as any).file;
        const expDate = req.body.date;

        try {
            const file = {
                name: inputFile.filename,
                created: Date.now(),
                expired: expDate,
                size: inputFile.size
            };
            const File = new FilesModel(file);
            await File.save();
            const files = await FilesModel.find({});
            ResponseObject.makeSuccess(res, files);
        } catch(e) {
            ResponseObject.makeError(res, e);
        }
    }

    static async getFiles(req: Request, res: Response) {
        try {
            const files = await FilesModel.find({});
            ResponseObject.makeSuccess(res, files);
        } catch (e) {
            ResponseObject.makeError(res, e);
        }
    }

    static async deleteFile(req: Request, res: Response) {
        try {
            const id = req.body.id;
            const fileForDelete = await FilesModel.findById(id);

            fs.unlink(Const.UPLOAD_FOLDER + fileForDelete.name, (e) => {
                console.log(e);
            });

            await FilesModel.remove({_id: id});

            const files = await FilesModel.find({});
            ResponseObject.makeSuccess(res, files);
        } catch (e) {
            ResponseObject.makeError(res, e);
        }
    }

    static async checkFilesExpired() {
        const files = await FilesModel.find({});
        files.forEach(async (file) => {
            if (file.expired < Date.now()) {
                fs.unlink(Const.UPLOAD_FOLDER + file.name, (e) => {
                    console.log(e);
                });
                await FilesModel.remove({_id: file.id});
            }
        });
    }
}
