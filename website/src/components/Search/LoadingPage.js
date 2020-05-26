import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';


const LoadingPage = ({ classes }) => (
    <div className={classes.load}>
        <CircularProgress className={classes.loadIcon}/>
    </div>
)


const styles = {
    load: {
        textAlign: 'center',
        marginTop: 25,
        width: '100%'
    },
    loadIcon: {
        color: '#8A2BE2'
    }
}


export default withStyles(styles)(LoadingPage);