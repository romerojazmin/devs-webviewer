import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '../Button';
import FileUploader from '../FileUploader';

export const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    jsonViewer: {
        position: 'relative',
        border: '1px solid black',
        height: '100%',
        width: '100%',
        margin: 10,
        minWidth: 450,
    },
    svgViewer: {
        position: 'relative',
        border: '1px solid black',
        height: '100%',
        width: '100%',
        margin: 10,
        minWidth: 450,
    },
    buttonLoad: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 10,
    },
    buttonAssign: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 10,
    },
    buttonDonwload: {
        position: 'absolute',
        top: 3,
        right: 50,
    },
    buttonReplay: {
        position: 'absolute',
        top: 3,
        right: 0,
    },
}));

const Viewer = () => {
    const classes = useStyles();
    const [json, setJson] = useState();

    return (
        <Box
            className={classes.root}
            flexDirection='row'
        >
            <Box
                className={classes.jsonViewer}
            >
                <FileUploader
                    acceptedFiles={[
                        'application/json',
                    ]}
                    caption='Load JSON'
                    className={classes.buttonLoad}
                    error='Msg error'
                    onSave={files => {
                        setJson(files[0]);
                        console.log(json);
                    }}
                />
            </Box>
            <Box
                className={classes.svgViewer}
            >
                <Button
                    className={classes.buttonAssign}
                    color='primary'
                    endIcon={<Icon>check</Icon>}
                    variant='contained'
                >
                    Assign
                </Button>
                <IconButton
                    aria-label='Download JSON and SVG'
                    className={classes.buttonDonwload}
                    color='primary'
                >
                    <GetAppIcon />
                </IconButton>
                <IconButton
                    aria-label='Reset the form'
                    className={classes.buttonReplay}
                    color='primary'
                >
                    <ReplayIcon />
                </IconButton>
                <Button
                    className={classes.buttonLoad}
                    color='primary'
                >
                    Load SVG
                </Button>
            </Box>
        </Box>
    );
};

Viewer.propTypes = {};

Viewer.defaultProps = {};

export default Viewer;
