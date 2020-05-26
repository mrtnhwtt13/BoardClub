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
            boardGameImagePath: "",
            boardGameName: "",
            loading: true
        }

        this.parseResponse = this.parseResponse.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/https://boardgamegeek.com/xmlapi2/thing?id=' + this.props.boardGameId)
            .then((response) => {
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

    render () {
        const { classes, boardGameId } = this.props;
        const { boardGameImagePath, boardGameName, loading } = this.state
        let boardGameImageBloc = null
        let boardGameNameBloc = null
    
        if (loading === false) {
            boardGameImageBloc = (
                <img className={classes.image} src={boardGameImagePath} height="100" />
            )
            boardGameNameBloc = (
                <span className={classes.title}> {boardGameName} </span>
            )
        }
        
        return (
            <div>
                <Paper className={classes.paper}>    
                    <Button onClick={() => this.props.selectBoardGameId(boardGameId)} >           
                        <div>
                            { boardGameImageBloc }
                        </div>
                        <div>
                            { boardGameNameBloc }
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