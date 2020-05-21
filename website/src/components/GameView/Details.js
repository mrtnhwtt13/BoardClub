import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

class Details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boardGameDetails: null,
            loading: true,
        }
    }

    componentDidMount() {
        axios
            .get(
                'https://bgg-json.azurewebsites.net/thing/' +
                this.props.game.boardGameId,
            )
            .then((response) =>
                this.setState({
                    boardGameDetails: response,
                    loading: false,
                }),
            )
            .catch((err) => console.log(err))
    }

    render() {
        const { classes, game } = this.props
        const { boardGameDetails, loading } = this.state
        let boardGameImage = null
        let boardGameName = null

        if (loading === false) {
            boardGameImage = (
                <img className={classes.image} src={boardGameDetails.data.image} height="270" />
            )
            boardGameName = (
                <span className={classes.game}>
                    <strong>Playing : </strong>
                    {boardGameDetails.data.name}
                </span>
            )
        }

        return (
            <div className={classes.root}>
                <div>
                    <Grid container spacing={2} direction="row" className={classes.bgBlock}>
                        <Grid item>
                            {boardGameImage}
                        </Grid>
                        <Grid alignContent='center'  item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid  item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <div className={classes.title}><strong>{game.title}</strong></div>
                                        <div className={classes.players}>{game.playersNumber} spot filled out of {game.playersMax}.</div>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <div className={classes.gameName}>
                                        {boardGameName}
                                        </div>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
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
                                    <Typography variant="body2" >
                                            <div className={classes.desc}>
                                                {game.description}
                                            </div>
                                        </Typography>
                                </Grid>

                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    <div className={classes.btn}>
                                            <Button disableElevation variant="contained" style={{ backgroundColor: "#65A2FE", color: "white"}} >Join</Button>
                                    </div>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
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
    btn : {
        marginTop: 8,
    },
    desc: {
        color: '#595959',
        marginTop: 10
    },
    gameName: {
        color: '#595959',

    },
    players: {
        color: '#595959',
    },
    image: {
        borderRadius: 5,
        overflow: "hidden",
    }
}

export default withStyles(styles)(Details)