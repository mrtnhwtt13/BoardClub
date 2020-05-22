import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'


class User extends Component {

    render () {
        const { classes, user } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>                
                    <div>
                        <Grid container direction="row">
                            <h3 className={classes.login}>
                                <Link to={`/profile/${user._id}`}>{user.login}</Link>
                            </h3>
                        </Grid>
                    </div>
                </Paper>
            </div>
        )
    }
}


const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: 10,
        marginTop: 3
    },
    login: {
        marginBottom: 5
    }
}


export default withStyles(styles)(User);