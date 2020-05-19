import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


class Game extends Component {
    constructor (props) {
        super(props);

        this.state = {
            boardGameDetails: null,
            loading: true
        }
    }

    componentDidMount() {
        axios.get('https://bgg-json.azurewebsites.net/thing/'+ this.props.game.boardGameId)
        .then(response => this.setState({
            boardGameDetails: response,
            loading: false
        })
        )
        .catch(err => console.log(err))
    } 

    render () {
        const { classes, game } = this.props;
        const { boardGameDetails, loading } = this.state;
        let boardGameImage = null;
        let boardGameName = null;

        if (loading === false) {
            boardGameImage = (
                <img
                    src={boardGameDetails.data.thumbnail}
                    height="100"
                />  
            )
            boardGameName = (
                <span className={classes.bgTitle}><strong>Playing : </strong>{boardGameDetails.data.name}</span>
            )
        }

        return (
            <div className={classes.root}>
                <Link to={`/game/${game._id}`}>
                    <Paper className={classes.paper}>                 
                        <div>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                            >
                                <Grid item>
                                    <h3 className={classes.title}>
                                        {game.title}
                                    </h3>
                                </Grid>
                                <Grid item>
                                <h4>
                                    {game.playersNumber}/{game.playersMax}  
                                </h4>       
                                </Grid> 
                            </Grid>
                            <span className={classes.time}>Event on {(new Date(game.gameDate)).toLocaleString("en-GB")} at {game.city}</span>
                            <br/>
                            <Grid
                                container
                                direction="row"
                                className={classes.bgBlock}
                            >
                                <Grid item>
                                    {boardGameImage}
                                </Grid>
                                <Grid item>
                                    {boardGameName}
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
        marginTop: 10
    },
    title: {
        color: '#595959',
        marginBottom: 5
    },
    time: {
        color: '#bbb',
        fontSize: 14
    },
    bgBlock: {
        width: '100%',
        marginTop: 10
    },
    bgTitle: {
        color: '#595959',
        marginLeft: 10
    }
}


export default (withStyles(styles)(Game));