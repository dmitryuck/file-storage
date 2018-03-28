import './Body.css';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, ActionCreator } from 'react-redux';
// import Grid from 'material-ui/Grid';
// import Paper from 'material-ui/Paper';
// import { Button } from 'material-ui';
import { FileUploader } from '../FileUploader/FileUploader';
import { FileList } from '../FileList/FileList';
import { AppRootState, AppState, ServerResponse } from '../../common';
import { AppActions } from '../../actions';
import { AppThunks } from '../../thunks';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

interface State {

}

interface Props {
    app?: AppState;
    dispatch?: ActionCreator<any>;
    getFiles?: Function;
    setFiles?: Function;
}

@connect((state: AppRootState) => ({
    app: state.appState
}), (dispatch: ActionCreator<any>) => bindActionCreators({
    dispatch: dispatch,
    getFiles: AppThunks.getFiles,
    setFiles: AppActions.setFiles
}, dispatch))
export class Body extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.props.getFiles().then((res: ServerResponse) => {
            if (res.success) {
                this.props.setFiles(res.data);
            }
        });
    }

    render() {
        return (
            <Grid className="Body_root">
                <Row>
                    <Col xs={12}>
                        <FileUploader />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FileList files={this.props.app.files}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
