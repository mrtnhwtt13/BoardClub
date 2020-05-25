import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { Button } from '@material-ui/core'


class Card extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boardGameDetails: null,
            loading: true
        }    
    }

    componentDidMount() {
        axios.get('https://bgg-json.azurewebsites.net/thing/' + this.props.boardGameId)
            .then((response) =>
                this.setState({
                    boardGameDetails: response,
                    loading: false,
                })
            )
            .catch((err) => console.log(err))
    }

    render () {
        const { classes, boardGameId } = this.props;
        const { boardGameDetails, loading } = this.state
        let boardGameImage = null
        let boardGameName = null
    
        if (loading === false) {
            boardGameImage = (
                <img className={classes.image} src={boardGameDetails.data.thumbnail} height="100" />
            )
            boardGameName = (
                <span className={classes.title}> {boardGameDetails.data.name} </span>
            )
        }
        
        return (
            <div>
                <Paper className={classes.paper}>    
                    <Button onClick={() => this.props.selectBoardGameId(boardGameId)} >           
                        <div>
                            { boardGameImage }
                        </div>
                        <div>
                            { boardGameName }
                        </div>
                    </Button>  
                </Paper>
            </div>
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
        fontSize: '2rem',
        color: '#595959',
        marginLeft: 10,
    },
    image: {
        borderRadius: 5,
        overflow: "hidden",
    }
}


export default (withStyles(styles)(Card));