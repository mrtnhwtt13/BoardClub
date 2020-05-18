import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleLogout() {
    this.setState({ anchorEl: null })
    this.props.logoutUser()
  }

  render() {
    const { classes, isAuthenticated } = this.props
    // const { anchorEl } = this.state
    // const open = Boolean(anchorEl)

    const guestLinks = null

    const authLinks = isAuthenticated && (
      <div>
        <div className={classes.root}>
          <AppBar elevation={0} position="static" style={{ backgroundColor: '#FFFFFF' }}>
            <Toolbar className={classes.space}>
              
                <div className={classes.nav}>
                  <Button className={classes.btn} to="/" >
                    Homepage
                  </Button>
                  <Button className={classes.btn} to="/" >
                    Profile
                  </Button>
                  <Button className={classes.btn} to="/" >
                    Friends
                  </Button>
                  <Button className={classes.btn} to="/#" onClick={this.handleLogout}>
                    Logout
                  </Button>
                </div>
                
            </Toolbar>
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
    marginLeft: '4rem'
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Header),
)
