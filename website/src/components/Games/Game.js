import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

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
        let boardGameInfos = null;

        if (loading === false) {
            boardGameInfos = (
                <div className={classes.gameBlock}>
                    <img
                        src={boardGameDetails.data.thumbnail}
                        height="100"
                    />
                    <span className={classes.bgTitle}><strong>Playing : </strong>{boardGameDetails.data.name}</span>
                </div>
            )
        }

        return (
            <Paper className={classes.paper}>                 
                <div>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <h3 className={classes.title}>
                            {game.title}
                        </h3>
                        <h4>
                            {game.playersNumber}/{game.playersMax}  
                        </h4>        
                    </Grid>
                    <span className={classes.time}>Event on {(new Date(game.gameDate)).toLocaleString()} at {game.city}</span>
                    <br/>
                    {boardGameInfos}
                </div>
            </Paper>
        )
    }
}


const styles = {
    paper: {
        padding: 10,
        display: 'flex',
        marginTop: 10
    },
    title: {
        marginBottom: 5
    },
    time: {
        color: '#bbb',
        fontSize: 14
    },
    gameBlock: {
        width: '100%',
        marginTop: 10
    },
    bgTitle: {
        marginLeft: 10
    }
}


export default (withStyles(styles)(Game));