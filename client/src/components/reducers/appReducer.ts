import { AppActions } from '../actions';
import { Action, AppState } from '../common';

const initialState: AppState = {
    files: []
};

export function appReducer(state: AppState = initialState, action: Action) {
    switch (action.type) {
        case AppActions.SET_FILES: {
            return Object.assign({}, state, {files: action.payload});
        }
        default: {
            return state;
        }
    }
}
