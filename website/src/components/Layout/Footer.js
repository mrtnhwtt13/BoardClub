import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const Footer = ({ classes }) => (
    <div className={classes.root}>
        <p>By (trouver un nom de team) / Coding Academy Lyon 2020</p>
    </div>
)


const styles = {
    root: {
        textAlign: 'center',
        marginTop: 20
    }
}


export default withStyles(styles)(Footer);

