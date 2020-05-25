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
        const { user, loadingUser, classes } = this.props;
        let username = null;
        let avatar = null;
        if (user && loadingUser === false) {
            if (user.avatar === ""){
                avatar = (
                    <img className={classes.image} src="https://i.imgur.com/wPNa9Vj.jpg" height="100" />
                )
            }
            username = (
                <div>
                    {user.login}
                </div>
            )
        }
        return (
            <div>
                <Paper elevation={2} style={{ padding: 15 }}>
                    <Grid md={12} spacing={2} container justify="center" alignItems="center">
                    <Grid container xs={2} direction="column" container justify="center" alignItems="center">
                            <Grid item direction="column">

                                    {avatar}
                            </Grid>
                        </Grid>
                        <Grid container xs={6} direction="column" container justify="center">
                            <Grid item>
                                {username}
                            </Grid>
                            <Grid item>
                                {username}
                            </Grid>
                            <Grid item>
                                {username}
                            </Grid>
                        </Grid>
                        <Grid container xs={2} direction="column" container justify="center" alignItems="center">
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
    image: {
        borderRadius: 8,
        overflow: "hidden",
    },
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    loadingUser: state.user.loading
})

export default connect(mapStateToProps, { getUserById })(withStyles(styles)(Profile))