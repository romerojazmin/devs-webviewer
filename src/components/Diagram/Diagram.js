import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import * as d3 from 'd3';
import { ReactComponent as SVGDiagram } from '../../assets/images/diagram.svg';

export const useStyles = makeStyles(() => ({ 
    root: { 
        padding: 10,
        height: '91vh'
    }, 
    inner: { 
        padding: 5,
        border: '2px solid black',
    } 

}));

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
            className={classes.root}
            display='flex'
            flexDirection='row'
            justifyContent = 'space-between'
            alignItems='stretch'
        >
            <Box
                className={classes.inner}
                alignItems='left'
                alignContent='stretch'
                width = {0.4}
             
            >   
            </Box>
            <Box
                className={classes.inner}
                alignItems='right'
                alignContent='stretch'
                width = {0.59}
            >
            </Box>
        </Box>    
    );
};

Diagram.propTypes = {};

Diagram.defaultProps = {};

export default Diagram;

