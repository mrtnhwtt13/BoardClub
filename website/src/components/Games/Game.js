import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';


class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boardGameDetails: null,
            boardGameImagePath: "",
            boardGameName: "",
            loading: true
        }

        this.parseResponse = this.parseResponse.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/https://boardgamegeek.com/xmlapi2/thing?id=' + this.props.game.boardGameId)
            .then(response => {
                this.setState({
                    boardGameDetails: response
                });
                this.parseResponse();
            })
            .catch((err) => console.log(err))
    }

    parseResponse () {
        var parser, xmlDoc;
            
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(this.state.boardGameDetails.data, "text/xml");
            
        this.setState ({
            boardGameImagePath: xmlDoc.getElementsByTagName("thumbnail")[0].childNodes[0].nodeValue,
            boardGameName: xmlDoc.getElementsByTagName("name")[0].getAttribute('value'),
            loading: false
        })
    }

    render() {
        const { classes, game } = this.props
        const { boardGameImagePath, boardGameName, loading } = this.state
        let boardGameImageBloc = null
        let boardGameNameBloc = null

        if (loading === false) {
            boardGameImageBloc = (
                <img className={classes.image} src={boardGameImagePath} width="100" />
            )
            boardGameNameBloc = (
                <span className={classes.title}>
                    <strong>Playing : </strong>
                    {boardGameName}
                </span>
            )
        }

        return (
            <div className={classes.root}>
                <Link to={`/game/${game._id}`}>
                    <Paper className={classes.paper}>
                        <div>
                            <Grid container spacing={2} justify='center' alignItems="center" direction="row" className={classes.bgBlock}>
                                <Grid item justify='center' alignItems="center">    
                                    {boardGameImageBloc}
                                </Grid> 
                                <Grid item xs={7} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1">
                                                <div className={classes.title}>{game.title}</div>
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {boardGameNameBloc}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <span className={classes.time}>
                                                    Event on{' '}
                                                    {new Date(game.gameDate).toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}{' '}
                                                    at {game.city}
                                                </span>
                                            </Typography>
                                        </Grid>           
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">
                                            <div>
                                                {game.playersNumber}/{game.playersMax}
                                            </div>
                                        </Typography>
                                    </Grid>
                                </Grid> 
                            </Grid>
                        </div>
                    </Paper>
                </Link>
            </div>
        )
    }
}


const styles = {
    root: {
        flexGrow: 1
    },
    paper: {
        padding: 10,
        marginTop: 10
    },
    bgBlock: {
        width: '100%'    
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
        marginBottom: "0px"
    },
    time: {
        color: '#bbb',
        fontSize: 14
    },
    image: {
        borderRadius: 5,
        overflow: "hidden"
    }
}


export default withStyles(styles)(Game)
