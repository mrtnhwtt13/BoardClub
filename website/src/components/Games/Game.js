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
        <img src={boardGameDetails.data.thumbnail} height="100" />
    )
    boardGameName = (
        <span className={classes.title}>
        <strong>Playing : </strong>
        {boardGameDetails.data.name}
        </span>
    )
    }

    return (
    <div className={classes.root}>
        <Link to={`/game/${game._id}`}>
        <Paper className={classes.paper}>
            <div>
            <Grid container spacing={2} direction="row" className={classes.bgBlock}>
            <Grid item>    
                {boardGameImage}
            </Grid> 
            <Grid item xs={7} sm container>
            <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                <h3 className={classes.title}>{game.title}</h3>
                </Typography>
                <Typography variant="body2" gutterBottom>
                {boardGameName}
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
                <h4>
                    {game.playersNumber}/{game.playersMax}
                </h4></Typography>
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
    flexGrow: 1,
},
paper: {
    padding: 10,
    marginTop: 10,
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
},
time: {
    color: '#bbb',
    fontSize: 14,
},
}

export default withStyles(styles)(Game)
