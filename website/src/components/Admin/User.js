import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';


class User extends Component {

    render () {
        const { classes, user } = this.props;

        return (
            <Paper className={classes.paper}>                
                <div>
                    <h3 className={classes.login}>
                        <Link to={`/profile/${user._id}`}>{user.login}</Link>
                    </h3>
                </div>
            </Paper>
        )
    }
}


const styles = {
    paper: {
        padding: 10,
        display: 'flex',
        marginTop: 10
    },
    avatar: {
        minWidth: 10,
        margin: '4px 10px 4px 4px'
    },
    login: {
        marginBottom: 5
    }
}


export default withStyles(styles)(User);