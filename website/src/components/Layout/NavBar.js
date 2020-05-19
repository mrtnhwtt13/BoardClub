import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
    this.handleLogout = this.handleLogout.bind(this)
  }


  handleLogout() {
    this.setState({ anchorEl: null })
    this.props.logoutUser()
  }

  render() {
    const { classes, isAuthenticated } = this.props


    const guestLinks = null

    const authLinks = isAuthenticated && (
      <div>
        <div className={classes.root}>
          <AppBar elevation={0} position="static" style={{ backgroundColor: '#FFFFFF' }}>
            <Container maxWidth="xl" >
              <Toolbar className={classes.space}>
                <div >
                <Grid container spacing={3}>
                <Grid container justify="center" item xs={6} sm={3}>
                  <Button className={classes.btn} to="/" >
                    Homepage
                  </Button>
                  </Grid>
                  <Grid container justify="center" item xs={6} sm={3}>

                  <Button className={classes.btn} to="/" >
                    Profile
                  </Button>
                  </Grid>
                  <Grid container justify="center" item xs={6} sm={3}>

                  <Button className={classes.btn} to="/" >
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
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Navbar),
)
