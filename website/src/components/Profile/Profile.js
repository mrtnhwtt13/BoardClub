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
        let location = null;
        let inscription = null;


        if (user && loadingUser === false) {
            if (user.avatar === "") {
                avatar = (
                    <img className={classes.image} src="https://i.imgur.com/wPNa9Vj.jpg" height="100" />
                )
            }
            else {
                avatar = (
                    <img className={classes.image} src="https://i.imgur.com/wPNa9Vj.jpg" height="100" />
                )
            }
            if (user.city === "") {
                location = (
                    <div>
                        Location : Unknown
                    </div>
                )
            } else {
                location = (
                    <div>
                        Location : {user.city}
                    </div>
                )
            }
            username = (
                <div>
                    {user.login}
                </div>
            )
            inscription = (
                <div>
                    Member since : {' '}
                    {new Date(user.inscriptionDate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        
                    })}{' '}
                </div>
            )
            
        }
        return (
            <div>
                <Paper elevation={2} style={{ padding: 20, paddingTop: 40, paddingBottom: 40 }}>
                    <Grid spacing={2} container justify="center" alignItems="center">
                        <Grid container item sm={12} md={2}  justify="center" alignItems="center">
                            <Grid item>
                                {avatar}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6} container direction="column" justify="center" >
                            <div className={classes.userinfo}>
                                <Grid item>
                                    <div className={classes.username}>
                                        {username}
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div>
                                    {location}
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div>
                                    {inscription}
                                    </div>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid container item xs={12} sm={2} md={2} direction="column" alignItems="center">
                            <Grid item >
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
    userinfo: {
        margin: "10px",
        color: "#595959",
    },
    '@media (max-width: 600px)': {
        userinfo: {
            margin: "10px",
            color: "#595959",
            'text-align': "center"
        },
    },
    username: {
        fontSize: "25px",
        marginBottom: "8px",
        // textTransform: "uppercase",
        // textTransform: "capitalize",
    }
}


const mapStateToProps = (state) => ({
    user: state.user.user,
    loadingUser: state.user.loading
})

export default connect(mapStateToProps, { getUserById })(withStyles(styles)(Profile))