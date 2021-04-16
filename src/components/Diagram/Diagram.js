import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import * as d3 from 'd3';
import { ReactComponent as SVGDiagram } from '../../assets/images/diagram.svg';

export const useStyles = makeStyles(() => ({ root: { padding: 30 } }));

const Diagram = () => {
    const classes = useStyles();

    React.useEffect(() => {
        d3.select('g')
            .selectAll('*')
            .on('click', function() {
                console.log(this);
                d3.select(this)
                    .attr('stroke', 'tomato');
            })
            .attr('pointer-events', 'fill')
            .style('cursor', 'pointer');
    }, []);

    return (
        <Box
            alignItems='center'
            className={classes.root}
            display='flex'
            flexDirection='row'
        >
            <SVGDiagram />
        </Box>
    );
};

Diagram.propTypes = {};

Diagram.defaultProps = {};

export default Diagram;
