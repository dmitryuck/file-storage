import { File } from '../common';

export class AppActions {
    static SET_FILES = 'SET_FILES';

    static setFiles = (files: File[]) => ({ type: AppActions.SET_FILES, payload: files });
}
