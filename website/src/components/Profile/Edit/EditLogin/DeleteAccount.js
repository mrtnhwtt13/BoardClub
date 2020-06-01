import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Paper, Button } from '@material-ui/core'
import { deleteProfile, logoutUser } from '../../../../actions/authActions'
import { Link } from 'react-router-dom';


class DeleteAccount extends Component {
    constructor(props) {
        super(props)

        this.deleteAccount = this.deleteAccount.bind(this)
        this.returnToProfile = this.returnToProfile.bind(this)
    }

    deleteAccount () {
        const userData = {
            userId: this.props.match.params.userId
        }

        this.props.deleteProfile(userData)
    }

    returnToProfile () {
        this.props.history.push(`/profile/${this.props.match.params.userId}`);
    }

    render () {
        const { isAuthenticated, classes } = this.props;
        return (
            <div className={classes.root}>
                <h1 className={classes.title}>ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT ?</h1>
                <h4 className={classes.title}>This will permanently erase your account</h4>
                <div className={classes.btnBlock}>
                    <Button variant="outlined" className={classes.btnStyle} style={{ backgroundColor: "#ff0000" }} component={Link} to="/" onClick={this.deleteAccount} >
                        YES
                    </Button> 
                </div>
                <div className={classes.btnBlock}>
                    <Button variant="outlined" className={classes.btnStyle} style={{ backgroundColor: "#49ff00" }} onClick={() => { this.returnToProfile(); }} >
                        NO
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


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.isAuthenticated
})


export default connect(mapStateToProps, { deleteProfile, logoutUser })(withStyles(styles)(DeleteAccount));