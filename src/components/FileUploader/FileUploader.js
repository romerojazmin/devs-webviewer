import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import Button from '../Button';

export const useStyles = makeStyles(theme => ({
    error: { color: theme.palette.error.main },
    button: { marginRight: theme.spacing(0) },
}));

const FileUploader = ({
    className,
    style,
    onSave,
    acceptedFiles,
    caption,
}) => {
    const classes = useStyles();
    const [filename, setFilename] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = files => {
        setOpen(false);
        setFilename(files[0].name);
        onSave(files);
        console.log(filename);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box
            alignItems='center'
            className={className}
            display='flex'
            flexDirection='row'
            style={style}
        >
            <Button
                className={classes.button}
                color='primary'
                onClick={handleOpen}
            >
                {caption}
            </Button>
            <DropzoneDialog
                acceptedFiles={acceptedFiles}
                filesLimit={1}
                maxFileSize={Infinity}
                onClose={handleClose}
                onSave={handleSave}
                open={open}
                showPreviews
            />
        </Box>
    );
};

FileUploader.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    acceptedFiles: PropTypes.array,
    caption: PropTypes.string,
};

FileUploader.defaultProps = {
    className: '',
    style: {},
    acceptedFiles: [],
    caption: '',
};

export default FileUploader;
