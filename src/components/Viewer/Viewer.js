import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import ReplayIcon from '@material-ui/icons/Replay';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FileUploader from '../FileUploader';
import Button from '../Button';

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
    containerCards: {
        position: 'relative',
        height: '86%',
        width: '98%',
        margin: 10,
        minWidth: 450,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'auto',
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
    jsonCard: {
        minHeight: 40,
        width: 170,
        margin: 10,
        height: 'fit-content',
        cursor: 'pointer',
    },
}));

const Viewer = () => {
    const classes = useStyles();
    const [json, setJson] = useState();
    const [selection, setSelection] = useState('');

    const handleChange = event => {
        const sel = event.target.value;
        setSelection(sel);
    };

    const saveJSON = async file => {
        const text = await file.text();
        setJson(JSON.parse(text));
    };

    return (
        <Box
            className={classes.root}
            flexDirection='row'
        >
            <Box
                className={classes.jsonViewer}
            >
                <Select
                    className={classes.selectEmpty}
                    defaultValue=''
                    disabled={!(json && Object.keys(json).length)}
                    onChange={handleChange}
                >
                    {json && Object.keys(json).length && Object.keys(json).map(item => (
                        <MenuItem
                            key={item}
                            value={item}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
                <Box
                    className={classes.containerCards}
                >
                    {selection && Array.isArray(json[selection]) && json[selection].map((card, index) => (
                        <Card
                            key={index}
                            className={classes.jsonCard}
                            variant='outlined'
                        >
                            <CardContent>
                                {Object.entries(card).map((row, indexrow) => (
                                    <Typography
                                        key={indexrow}
                                        variant='body2'
                                    >
                                        {`${row[0]}: ${row[1]}`}
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <FileUploader
                    acceptedFiles={[
                        'application/json',
                    ]}
                    caption='Load JSON'
                    className={classes.buttonLoad}
                    error='An error has occured'
                    onSave={files => {
                        saveJSON(files[0]);
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
