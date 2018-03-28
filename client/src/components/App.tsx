import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { Header, Footer, Body } from './shared';
// import { AppRootState, AppState } from './common';

interface Props {
}

interface State {
    store: any;
}

/*@connect(
    (state: AppRootState) => ({
        app: state.appState
    }),
    (dispatch: ActionCreator<any>) => bindActionCreators({
        dispatch: dispatch
    }, dispatch)
)*/
export class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            store: createStore(rootReducer, {}, applyMiddleware(thunk))
        };
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <div>
                    <Header />
                    <Body />
                    <Footer />
                </div>
            </Provider>
        );
    }
}
