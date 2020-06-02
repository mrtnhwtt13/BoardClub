import React, { Component } from 'react';
import { getUserById, followUser, unfollowUser } from '../../actions/userActions'
import { getGamesFromUser } from '../../actions/gameActions'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import FavoriteGamesPanel from './TopGames/FavoriteGamesPanel'
import { withRouter } from 'react-router-dom'
import Game from '../Games/Game';
import Loading from '../Loading/Loading'


class Profile extends Component {

    constructor(props) {
        super(props)

        this.handleFollow = this.handleFollow.bind(this)
        this.handleUnfollow = this.handleUnfollow.bind(this)
        
        this.state = {
            currentId: 0
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('jwtToken')) {
            this.props.history.push('/');
        }
        this.props.getUserById(this.props.match.params.userId);
        this.props.getGamesFromUser(this.props.match.params.userId);
        const pageUserId = this.props.match.params.userId;
        this.setState({currentId: pageUserId});
    }
    

    handleFollow (){
		this.props.followUser(this.props.match.params.userId)
	}

	handleUnfollow () {
		this.props.unfollowUser(this.props.match.params.userId)
	}

    render() {
        const { user, userStatus, authUser,loadingUser, classes, listGames, loadingGames } = this.props;
        let username = null;
        let avatar = null;
        let location = null;
        let inscription = null;
        let button = null;
        let exist = false;
        const items = listGames && listGames.map(el => <Game key={el._id} game={el} />)
        
        if (user && loadingUser === false && listGames && loadingGames === false) {
            exist = true;

            if (this.state.currentId !== this.props.match.params.userId){
                this.componentDidMount()
            }


            if (user.avatar === "") {
                avatar = (
                    <img className={classes.image} src="https://i.imgur.com/wPNa9Vj.jpg" height="100" />
                )
            }
            else {
                avatar = (
                    <img className={classes.image} src={user.avatar} height="100" />
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
                        Location : {user.city} ({user.zipcode.substring(0,2)})
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
            if (user._id !== authUser._id){
                if (
                    authUser &&
                    authUser.following &&
                    authUser.following.indexOf(this.props.match.params.userId) === -1
                ) {
                    button = (<div className={classes.btnBlock}>
                        <Button 
                            style={{ backgroundColor: "#65A2FE", color: "white" }}
                            disableElevation variant="contained" 
                            className={classes.btnFollow} 
                            onClick={this.handleFollow}>
                            Add Friend
                        </Button>
                    </div>)
                } else {
                    button = (<div className={classes.btnBlock}>
                        <Button 
                            style={{ backgroundColor: "#65A2FE", color: "white" }}
                            disableElevation variant="contained" 
                            className={classes.btnFollow}
                            onClick={this.handleUnfollow}
                        >
                            Remove Friend
                        </Button>
                    </div>)
                }
            }
            else {
                button = (
                <Button disableElevation variant="contained" style={{ backgroundColor: "#65A2FE", color: "white" }} component={Link} to="/profile/edit" >Edit</Button>
                )
            }

        }
        
        if (loadingUser === true || userStatus !== this.props.match.params.userId) {
            return (<Loading/>)
        }
        else {
            return (
                <div>
                {exist ?
                    <Paper elevation={2} style={{ padding: 20, paddingTop: 40, paddingBottom: 40, marginTop: 25 }}>
                        <Grid spacing={2} container justify="center" alignItems="center">
                                <Grid container item sm={12} md={2} justify="center" alignItems="center">
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
                                        {button}
                                    </Grid>
                                </Grid>
                        </Grid>
                        <FavoriteGamesPanel userId={this.props.match.params.userId} userName={user.login} user={user} />
                        {items}
                    </Paper >
                        :
                        <div className={classes.root}>
                            <h1 className={classes.title}>OOPS, THIS USER DOESN'T EXIST</h1>
                            <div className={classes.btnBlock}>
                                <Button variant="outlined" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} component={Link} to="/" >
                                    HOME
                                </Button> 
                            </div>
                        </div>
                        }
                </div >
            )
        }
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
    },
    error : {
        'text-align': 'center',
        alignItems: 'center'
    },
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
    user: state.user.user,
    loadingUser: state.user.loading,
    authUser: state.auth.user,
    listGames: state.game.list,
    loadingGames: state.game.loading,
    userStatus: state.user.status
})

export default connect(mapStateToProps, { getUserById, followUser, unfollowUser, getGamesFromUser })(withRouter(withStyles(styles)(Profile)));