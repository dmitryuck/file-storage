import mongoose from 'mongoose';
import { File } from './Interfaces';

const FilesSchema = mongoose.Schema({
    name: String,
    created: Date,
    expired: Date,
    size: Number
});

interface FilesModelInterface extends File, mongoose.Document {}
export const FilesModel = mongoose.model<FilesModelInterface>('Files', FilesSchema);
