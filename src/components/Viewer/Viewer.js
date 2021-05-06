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
// eslint-disable-next-line import/no-extraneous-dependencies
import SVG from 'react-inlinesvg';
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
    containerSVG: {
        position: 'relative',
        height: '85%',
        width: '98%',
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
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'flex-start',
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
        minWidth: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        cursor: 'pointer',
        border: '1px solid white',
    },
    jsonCardSelected: {
        minWidth: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        cursor: 'pointer',
        border: '1px solid tomato',
    },
}));

const Viewer = () => {
    const classes = useStyles();
    const [json, setJson] = useState();
    const [svg, setSVG] = useState();
    const [selection, setSelection] = useState('');
    const [selectedCards, setSelectedCards] = useState(new Set());

    const handleChange = event => {
        const sel = event.target.value;
        setSelection(sel);
    };

    const saveJSON = async file => {
        const text = await file.text();
        setJson(JSON.parse(text));
    };

    const readFileAsUrl = file => new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });

    const saveSVG = async files => {
        const url = await readFileAsUrl(files[0]);
        setSVG(url);
    };

    const onCardClick = index => {
        const tempSet = new Set(selectedCards);
        if (tempSet.has(index)) {
            tempSet.delete(index);
        } else {
            tempSet.add(index);
        }
        setSelectedCards(tempSet);
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
                            className={(selectedCards.has(index)) ? classes.jsonCardSelected : classes.jsonCard}
                            onClick={() => onCardClick(index)}
                        >
                            <CardContent>
                                {Object.entries(card).map((row, indexrow) => (
                                    <Typography
                                        key={indexrow}
                                        variant='body2'
                                    >
                                        <b>{row[0]}</b>
                                        {`: ${row[1]}`}
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                    {selection && !Array.isArray(json[selection]) && (
                        <Card
                            className={classes.jsonCard}
                        >
                            <CardContent>
                                {Object.entries(json[selection]).map((row, indexrow) => (
                                    <Typography
                                        key={indexrow}
                                        variant='body2'
                                    >
                                        <b>{row[0]}</b>
                                        {`: ${row[1]}`}
                                    </Typography>
                                ))}
                            </CardContent>
                        </Card>
                    )}
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
                {svg && (
                    <SVG
                        className={classes.containerSVG}
                        id='popup-svg'
                        src={svg}
                    />
                )}
                <FileUploader
                    acceptedFiles={[
                        'image/svg+xml',
                    ]}
                    caption='Load SVG'
                    className={classes.buttonLoad}
                    error='An error has occured'
                    onSave={saveSVG}
                />
            </Box>
        </Box>
    );
};

Viewer.propTypes = {};

Viewer.defaultProps = {};

export default Viewer;
