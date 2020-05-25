import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
          anchorEl: null,
        }
      }
    
    render() {
        const { classes, isAuthenticated } = this.props


        const guestLinks = null
    
        const authLinks = isAuthenticated && (
            <div className={classes.root}>
            <AppBar position="static" elevation={0} style={{ backgroundColor: '#F5F9FC'}}>
            <Container maxWidth="lg">
            <Toolbar className={classes.space}>
                <div >
                <Grid container spacing={3}>
                    <Grid container justify="center" item xs={12} sm={4}>
                    <Button disableElevation variant="contained" size="large" className={classes.btn} style={{ backgroundColor: "#FE65DC", color: "white", width: "10rem", height: "4rem"}} to="/" >
                        Scheduled Games
                    </Button>
                    </Grid>
                    <Grid container justify="center" item xs={12} sm={4}>
                    <Button disableElevation variant="contained" size="large" className={classes.btn} style={{ backgroundColor: "#65A2FE", color: "white", width: "10rem", height: "4rem"}} component={Link} to="/create" >
                        Create a game
                    </Button>
                    </Grid>
                    <Grid container justify="center" item xs={12} sm={4}>
                    <Button disableElevation variant="contained" size="large" className={classes.btn} style={{ backgroundColor: "#FED365", color: "white", width: "10rem", height: "4rem"}} component={Link} to="/search" >
                        Search for a game
                    </Button>
                    </Grid>
                    </Grid>
                </div>
                </Toolbar>
            </Container>
        </AppBar>
            </div>
        )
    return <div>{isAuthenticated ? authLinks : guestLinks}</div>
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  })

const styles = {
    btn: {
        color: "#595959"
        },
        space: {
            justifyContent: 'center',
            minHeight: 128,
            marginTop: '10px',
            marginBottom: '10px'
        },
        root: {
            flexGrow: 1,
        },
}

export default connect(mapStateToProps)(withStyles(styles)(Header));