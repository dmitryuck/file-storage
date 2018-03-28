import { getRequest, ServerApi, deleteRequest } from '../common';

export class AppThunks {
    static getFiles() {
        return (dispatch, getState) => {
            return getRequest(ServerApi.FILES);
        };
    }

    static deleteFile(fileId: string) {
        return (dispatch, getState) => {
            return deleteRequest(ServerApi.FILES, fileId);
        };
    }
}
