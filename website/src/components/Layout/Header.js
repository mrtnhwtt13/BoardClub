import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar'


class Header extends Component {

    
    render() {
        const { classes } = this.props
        return(
            <div>
                <Typography component="div" style={{ backgroundColor: '#F5F9FC', height: '20rem', display: 'flex' ,alignItems: 'center' }} >
            <Container maxWidth="lg">
            <Toolbar className={classes.space}>
                <div >
                    <Button disableElevation variant="contained" size="large" className={classes.btn} style={{ backgroundColor: "#FE65DC", color: "white", padding: "30px"}} to="/" >
                        Scheduled Games
                    </Button>
                    <Button disableElevation variant="contained" size="large" className={classes.btn} style={{ backgroundColor: "#65A2FE", color: "white", padding: "30px"}} to="/" >
                        Create a game
                    </Button>
                    <Button disableElevation variant="contained" size="large" className={classes.btn} style={{ backgroundColor: "#FED365", color: "white", padding: "30px"}} to="/" >
                        Search for a game
                    </Button>
                </div>
                </Toolbar>
            </Container>
                </Typography>
            </div>
        )
    }
}

const styles = {
    btn: {
        color: "#595959",
        marginLeft: '4rem',
        marginRight: '4rem' 
        },
        space: {
        justifyContent: 'center',
        },
}

export default withStyles(styles)(Header);