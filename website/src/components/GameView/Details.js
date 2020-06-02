import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { getUserById } from '../../actions/userActions'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { joinGame, leaveGame, getGameById } from '../../actions/gameActions'


class Details extends Component {
    constructor(props) {
        super(props)
        this.handleJoin = this.handleJoin.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
        this.state = {
            boardGameDetails: null,
            boardGameImagePath: "",
            boardGameName: "",
            boardGameTime: "",
            loadingBoardgameDetails: true,
            thisGameId: null,
            thisGamePlayers: null,
            playersList: null,
            playerNumber: -42,
            joinLeave: null
        }

        this.parseResponse = this.parseResponse.bind(this)
    }

    componentDidMount() {
        this.props.getUserById(this.props.game.userId)
        axios.get('http://localhost:8080/https://boardgamegeek.com/xmlapi2/thing?id=' + this.props.game.boardGameId)
            .then(response => {
                this.setState({
                    boardGameDetails: response
                });
                this.parseResponse();
            })
            .catch((err) => console.log(err))
    }

    handleJoin() {
        this.props.joinGame(this.state.thisGameId)
        this.setState({ playerNumber: this.state.playerNumber + 1, joinLeave: "leave" })

    }

    handleLeave() {
        this.props.leaveGame(this.state.thisGameId)
        this.setState({ playerNumber: this.state.playerNumber - 1, joinLeave: "join" })

    }

    handleChange() {
        this.setState({ playersList: this.props.players.players })
    }

    parseResponse() {
        var parser, xmlDoc;

        parser = new DOMParser();
        xmlDoc = parser.parseFromString(this.state.boardGameDetails.data, "text/xml");

        this.setState({
            boardGameImagePath: xmlDoc.getElementsByTagName("image")[0].childNodes[0].nodeValue,
            boardGameTime: xmlDoc.getElementsByTagName("playingtime")[0].getAttribute('value'),
            boardGameName: xmlDoc.getElementsByTagName("name")[0].getAttribute('value'),
            loadingBoardgameDetails: false
        })
    }

    render() {
        const { classes, game, user, authUser, loadingUser, players } = this.props
        const { boardGameImagePath, boardGameName, boardGameTime, playerNumber, loadingBoardgameDetails, joinLeave } = this.state
        let boardGameImageBloc = null;
        let boardGameNameBloc = null;
        let boardGameTimeBloc = null;
        let creator = null;
        let JoinLeaveBloc = null;

        if (user && loadingUser === false && loadingBoardgameDetails === false) {
            let linkbgg = 'https://boardgamegeek.com/boardgame/' + this.props.game.boardGameId

            if (game) {
                if (playerNumber === -42) {
                    this.setState({ playerNumber: game.playersNumber })
                }

                if (this.state.thisGameId === null) {
                    this.setState({ thisGameId: game._id })
                }
                if (this.state.thisGamePlayers === null) {
                    this.setState({ thisGamePlayers: game.players })
                }
                if (this.state.playersList === null) {
                    this.setState({ playersList: game.players })
                }
                if (players && this.state.playersList !== players.players) {
                    this.handleChange()
                }
                if (game && game.players && game.players.indexOf(authUser._id) === -1 && joinLeave === null) {
                    this.setState({ joinLeave: "join" })
                }
                else if (joinLeave === null) {
                    this.setState({ joinLeave: "leave" })
                }
            }

            boardGameImageBloc = (
                <img className={classes.image} src={boardGameImagePath} />
            )
            boardGameNameBloc = (
                <span className={classes.game}>
                    <strong>Playing : </strong>
                    <a title="Learn more about this game on Board Game Geek" href={linkbgg}>
                        {boardGameName}
                    </a>
                </span>
            )
            boardGameTimeBloc = (
                <div><strong>Average playtime : </strong>{boardGameTime} minutes</div>
            )
            creator = (
                <span className={classes.creator}>
                    By{' '}
                    <Link to={`/profile/${user._id}`}>
                        {user.login}
                    </Link>
                </span>
            )
            if (new Date(game.gameDate) < new Date() ) {
                JoinLeaveBloc = (
                    null
                )

            } else if ( game.userId === authUser._id ) {
                JoinLeaveBloc = (
                    <div className={classes.btn}>
                        <Link to={{ pathname: `/game/edit/${game._id}`, state: { game: game} }}><Button disableElevation variant="contained" style={{ backgroundColor: "#65A2FE", color: "white" }} >Edit</Button></Link>
                    </div>
                )
            } else {

                if (joinLeave === "join" && playerNumber !== game.playersMax) {
                    JoinLeaveBloc = (
                        <div className={classes.btn}>
                            <Button onClick={this.handleJoin} disableElevation variant="contained" style={{ backgroundColor: "#65A2FE", color: "white" }} >Join</Button>
                        </div>
                    )
                } else if (joinLeave === "leave") {
                    JoinLeaveBloc = (
                        <div className={classes.btn}>
                            <Button onClick={this.handleLeave} disableElevation variant="contained" style={{ backgroundColor: "#65A2FE", color: "white" }} >Leave</Button>
                        </div>
                    )
                }
            }

            return (
                <div className={classes.root}>
                    <div>
                        <Grid container spacing={1} direction="row" className={classes.bgBlock} justify='center'>
                            <Grid item sm={12} md={6} container justify='center' alignItems="center">
                                <div>
                                    {boardGameImageBloc}
                                </div>
                            </Grid>
                            <Grid alignContent='center' item sm={12} md={6} container>
                                <Grid item xs md={10} container direction="column" spacing={2}>
                                    <Grid item >
                                        <Typography component={'span'} gutterBottom variant="subtitle1">
                                            <div className={classes.title}><strong>{game.title}</strong></div>
                                            <div>{creator}</div>
                                        </Typography>
                                        <Typography component={'span'} variant="body2" gutterBottom>
                                            <div className={classes.gameInfo}>
                                                <div>
                                                    {boardGameNameBloc}
                                                </div>
                                                <div>
                                                    {boardGameTimeBloc}
                                                </div>
                                                <div className={classes.players}><strong>{playerNumber}</strong> spot filled out of <strong>{game.playersMax}</strong></div>
                                                <div>
                                                    <strong>Game level :</strong> {game.playersLevel}
                                                </div>
                                            </div>
                                        </Typography>
                                        <Typography component={'span'} variant="body2" color="textSecondary">
                                            <div className={classes.time}>
                                                Event on{' '}
                                                {new Date(game.gameDate).toLocaleString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}{' '}
                                                at {game.city}
                                            </div>
                                        </Typography>
                                        <Typography component={'span'} variant="body2" >
                                            <div className={classes.desc}>
                                                {game.description}
                                            </div>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography component={'span'} variant="subtitle1">
                                        {JoinLeaveBloc}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )
        }
        else {
            return (<Loading />)
        }
    }
}


const styles = {
    root: {
        flexGrow: 1,
    },
    bgBlock: {
        width: '100%',

    },
    gameDescriptionBlock: {
        verticalAlign: 'top',
        '& div': {
            whiteSpace: "normal",
            wordWrap: "break-word"
        }
    },
    title: {
        color: '#595959',
        marginTop: "0px",
        marginBottom: "0px",
        fontSize: 30,
    },
    time: {
        color: '#595959',
        fontSize: 14,
        marginTop: 10,
    },
    btn: {
        marginTop: 8,
    },
    desc: {
        color: '#595959',
        marginTop: 10
    },
    gameInfo: {
        color: '#595959',

    },
    game: {
        fontSize: 18
    },
    players: {
        color: '#595959',
    },
    image: {
        borderRadius: 5,
        overflow: "hidden",
        width: 300
    },
    '@media (max-width: 959px)': {
        image: {
            borderRadius: 5,
            overflow: "hidden",
            width: 400
        },
    },
    '@media (min-width: 1550px)': {
        image: {
            borderRadius: 5,
            overflow: "hidden",
            width: 500
        },
    },
    creator: {
        fontSize: 20
    }
}


const mapStateToProps = (state) => ({
    user: state.user.user,
    loadingUser: state.user.loading,
    authUser: state.auth.user,
    players: state.players.players
})


export default connect(mapStateToProps, { getUserById, joinGame, leaveGame, getGameById })(withStyles(styles)(Details))