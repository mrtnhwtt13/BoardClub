import React, { Component } from 'react';
import { getUserById } from '../../actions/userActions'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'



class Profile extends Component {
    componentDidMount() {
        this.props.getUserById(this.props.match.params.userId)

    }
    render() {
        const { user, loadingUser } = this.props;
        let username = null;
        if (user && loadingUser === false) {
            username = (
                <div>
                    {user.login}
                </div>
            )
        }
        return (
            <div>
                <Paper elevation={2} style={{ padding: 15 }}>
                    <Grid md={12} spacing={3} container justify="center" alignItems="center">
                        <Grid container md={6} direction="column" container justify="center" alignItems="center">
                            <Grid item>
                                {username}
                            </Grid>
                            <Grid item>
                                {username}
                            </Grid>
                        </Grid>
                        <Grid container md={6} direction="column" container justify="center" alignItems="center">
                            <Grid item direction="column">
                                <Button disableElevation variant="contained" style={{ backgroundColor: "#65A2FE", color: "white" }}>Follow</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper >
            </div >
        )
    }
}

const styles = {

}

const mapStateToProps = (state) => ({
    user: state.user.user,
    loadingUser: state.user.loading
})

export default connect(mapStateToProps, { getUserById })(withStyles(styles)(Profile))