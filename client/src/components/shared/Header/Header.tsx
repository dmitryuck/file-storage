import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

export class Header extends React.Component {
    render() {
        return (
            <>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            File Storage DEMO
                        </Typography>
                    </Toolbar>
                </AppBar>
            </>
        );
    }
}
