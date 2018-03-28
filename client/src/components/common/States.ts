import { File } from './Interfaces';

export interface AppRootState {
    appState: AppState;
}

export interface AppState {
    files: File[];
}