import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Button } from '@material-ui/core'


class NotFound extends Component {
    render () {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <h1 className={classes.title}>404</h1>
                <h1 className={classes.title}>PAGE NOT FOUND</h1>
                <div className={classes.btnBlock}>
                    <Button variant="outlined" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} component={Link} to="/" >
                        HOME
                    </Button> 
                </div>
            </div>
        )
    }
}


const styles = {
    root: {
        width: '100%',
    }, 
    title: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'center'
    },
    btnBlock: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    btnStyle: {
        backgroundColor: "#65A2FE",
        color: "white",
        border: "white",
    }
}


export default withStyles(styles)(NotFound);