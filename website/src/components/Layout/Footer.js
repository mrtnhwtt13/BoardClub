import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const Footer = ({ classes }) => (
    <div className={classes.root}>
        <p className={classes.text}>By Sebastion Choubrac, Vincent Contamine, Martin Hewitt / Coding Academy Lyon 2020</p>
    </div>
)


const styles = {
    root: {
        textAlign: 'center',
        marginTop: 20
    },
    text: {
        color: "grey"
    }
}


export default withStyles(styles)(Footer);

