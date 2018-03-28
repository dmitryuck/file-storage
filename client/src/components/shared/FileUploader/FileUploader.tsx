import './FileUploader.css';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, ActionCreator } from 'react-redux';
import { Button } from 'material-ui';
import Input /*, { InputLabel }*/ from 'material-ui/Input';
import { FormControl /*, FormHelperText*/ } from 'material-ui/Form';
import { uploadRequest, ServerResponse, ServerApi, AppRootState, AppState } from '../../common';
import DateTimePicker from 'react-datetime-picker';
import { AppActions } from '../../actions';

interface Props {
    setFiles?: Function;
    dispatch?: ActionCreator<any>;
}

interface State {
    fileForUpload: any;
    date: Date;
}

@connect((state: AppRootState) => ({
    app: state.appState
}), (dispatch: ActionCreator<any>) => bindActionCreators({
    dispatch: dispatch,
    setFiles: AppActions.setFiles
}, dispatch))
export class FileUploader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            fileForUpload: null,
            date: new Date()
        };
    }

    onChange = date => this.setState({ date });

    uploadingFileChanged = (event: any) => {
        this.setState({
            fileForUpload: event.target.files[0]
        });
    }

    uploadFile = (event: any) => {
        if (!this.state.fileForUpload || !this.state.date) {
            alert('File not selected!');
        }

        const body = {
            fileName: this.state.fileForUpload,
            date: this.state.date
        };

        uploadRequest(ServerApi.FILES, body).then((res: ServerResponse) => {
            if (res.success) {
                this.props.setFiles(res.data);
            }
        });
    }

    render() {
        return (
            <>
                <FormControl className="" disabled={true}>
                <div className="FileUploader-file-name-container">
                    <Input
                        id="name-disabled"
                        className="FileUploader_file-name"
                        value={this.state.fileForUpload ? this.state.fileForUpload.name : 'No file selected'}
                    />
                </div>
                </FormControl>
                <input
                    className="FileUploader_upload-input"
                    id="raised-button-file"
                    multiple={false}
                    type="file"
                    onChange={this.uploadingFileChanged}
                />
                <label htmlFor="raised-button-file">
                    <Button className="" variant="raised" component="span">
                        Select
                    </Button>
                </label>
                <div className="FileUploader_upload-button">
                    <Button onClick={this.uploadFile} variant="raised" color="primary" component="span">
                        Upload
                    </Button>
                </div>
                <DateTimePicker
                    className="FileUploader_datetime-picker"
                    onChange={this.onChange}
                    value={this.state.date}
                />
            </>
        );
    }
}
