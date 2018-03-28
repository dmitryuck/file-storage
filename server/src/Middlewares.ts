import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { Const } from './Const';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, Const.UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage});

export class Middlewares {
    static uploadMiddlewareSingle() {
        return upload.single(Const.FILE_REQUEST_FIELD);
    }
}