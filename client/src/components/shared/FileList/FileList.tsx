import './FileList.css';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, ActionCreator } from 'react-redux';
import { AppRootState, ServerResponse } from '../../common';
import List, { ListItem /*, ListItemIcon*/, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import { File } from '../../common';
import { AppThunks } from '../../thunks';
import { AppActions } from '../../actions';
import { Config } from '../../common';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

interface Props {
    files: File[];
    dispatch?: ActionCreator<any>;
    deleteFile?: Function;
    setFiles?: Function;
}

interface State {
    expandFile: number;
    selectedFile: any;
    showDeleteDialog: boolean;
}

@connect((state: AppRootState) => ({
    app: state.appState
}), (dispatch: ActionCreator<any>) => bindActionCreators({
    dispatch: dispatch,
    deleteFile: AppThunks.deleteFile,
    setFiles: AppActions.setFiles
}, dispatch))
export class FileList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            expandFile: -1,
            selectedFile: null,
            showDeleteDialog: false
        };
    }

    toggleExpand = (itemIndex: number) => {
        this.setState((state) => ({ expandFile: state.expandFile !== itemIndex ? itemIndex : -1 }));
    }

    deleteFile = (e: MouseEvent, file: File) => {
        e.stopPropagation();
        this.setState({showDeleteDialog: true});
        this.setState({selectedFile: file});
    }

    downloadFile = (e: MouseEvent, file: File) => {
        e.stopPropagation();
    }

    confirmClose = () => {
        this.setState({showDeleteDialog: false});
    }

    confirmDelete = () => {
        this.props.deleteFile(this.state.selectedFile._id).then((res: ServerResponse) => {
            if (res.success) {
                this.props.setFiles(res.data);
                this.setState({showDeleteDialog: false});
            }
        });
    }

    drawFileList = (files: File[]) => (
        files.map((file: File, index: number) => (
            <div key={index}>
                <ListItem button={true} onClick={() => this.toggleExpand(index)}>
                    <Icon>insert_drive_file</Icon>
                    <ListItemText inset={true} primary={file.name} />
                    {this.state.expandFile === index ? <ExpandLess /> : <ExpandMore />}
                    <Button
                            variant="fab"
                            color="primary"
                            aria-label="add"
                            onClick={(e: any) => this.deleteFile(e, file)}
                    >
                        <Icon>delete</Icon>
                    </Button>
                    <a href={Config.hostUrl + '/uploads/' + file.name} target="__blank">
                        <Button
                                variant="fab"
                                color="primary"
                                aria-label="add"
                                onClick={(e: any) => this.downloadFile(e, file)}
                        >
                            <Icon>play_for_work</Icon>
                        </Button>
                    </a>
                </ListItem>
                {this.state.expandFile === index && <Collapse in={true} timeout="auto" unmountOnExit={true}>
                    <List component="div" disablePadding={true}>
                        <ListItem button={false}>
                            <ListItemText inset={true} primary={`Size: ${file.size} Bytes`} />
                        </ListItem>
                        <ListItem button={false}>
                            <ListItemText inset={true} primary={`Expiration: ${file.expired}`} />
                        </ListItem>
                    </List>
                </Collapse>}
            </div>
        ))
    )

    render() {
        return (
            <>
            <List component="nav">
                {this.drawFileList(this.props.files)}
            </List>
            <Dialog
                open={this.state.showDeleteDialog}
                onClose={this.confirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Delete current file?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.confirmClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={this.confirmDelete} color="primary" autoFocus={true}>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
            </>
        );
    }
}