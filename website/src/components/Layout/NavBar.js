import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


class Navbar extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.logoutUser()
  }

  render() {
    const { classes, isAuthenticated, user } = this.props

    const guestLinks = null
    var authLinks = null

    if (isAuthenticated) {
      if (user.isAdmin === false) {
        authLinks = (      
          <div>
            <div className={classes.root}>
              <AppBar elevation={0} position="static" style={{ backgroundColor: '#FFFFFF' }}>
                <Container maxWidth="xl" >
                  <Toolbar className={classes.space}>
                    <div >
                      <Grid container spacing={3}>
                        <Grid container justify="center" item xs={6} sm={3}>
                          <Button className={classes.btn} component={Link} to="/" >
                            Homepage
                          </Button>
                        </Grid>
                        <Grid container justify="center" item xs={6} sm={3}>
                          <Button className={classes.btn} component={Link} to="/" >
                            Profile
                          </Button>
                        </Grid>
                        <Grid container justify="center" item xs={6} sm={3}>
                          <Button className={classes.btn} component={Link} to="/" >
                            Friends
                          </Button>
                        </Grid>                    
                        <Grid container justify="center" item xs={6} sm={3}>
                          <Button className={classes.btn} to="/#" onClick={this.handleLogout}>
                            Logout
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Toolbar>
                </Container>
              </AppBar>        
            </div>
          </div>
        )
      }
      else {
        authLinks = (      
          <div>
            <div className={classes.root}>
              <AppBar elevation={0} position="static" style={{ backgroundColor: '#FFFFFF' }}>
                <Container maxWidth="xl" >
                  <Toolbar className={classes.space}>
                    <div >
                      <Grid container spacing={3} style={{justifyContent: "center"}} >
                        <Grid container justify="center" item xs={4} sm={2}>
                          <Button className={classes.btn} component={Link} to="/" >
                            Homepage
                          </Button>
                        </Grid>
                        <Grid container justify="center" item xs={4} sm={2}>
                          <Button className={classes.btn} component={Link} to="/" >
                            Profile
                          </Button>
                        </Grid>
                        <Grid container justify="center" item xs={4} sm={2}>
                          <Button className={classes.btn} component={Link} to="/" >
                            Friends
                          </Button>
                        </Grid>
                        <Grid container justify="center" item xs={4} sm={2}>
                          <Button className={classes.btn} component={Link} to="/admin" >
                            Admin
                          </Button>
                        </Grid>
                        <Grid container justify="center" item xs={4} sm={2}>
                          <Button className={classes.btn} to="/#" onClick={this.handleLogout}>
                            Logout
                          </Button>
                        </Grid>
                      </Grid>
                    </div>                                      
                  </Toolbar>
                </Container>
              </AppBar>        
            </div>
          </div>
        )
      }
    }

    return <div>{isAuthenticated ? authLinks : guestLinks}</div>
  }
}


const styles = {
  root: {
    flexGrow: 1,
  },
  logo: {
    color: 'black',
    fontSize: 30,
    textTransform: 'uppercase',
  },
  space: {
    justifyContent: 'center'
  },
  nav : {
  },
  btn: {
    color: "#595959",
    marginLeft: '2rem',
    marginRight: '2rem' 
  },
};


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  user: state.auth.user
});


export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Navbar)
);