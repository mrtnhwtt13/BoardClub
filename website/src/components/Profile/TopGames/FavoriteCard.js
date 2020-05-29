import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { removeBoardGameFromFavorites } from '../../../actions/userActions';


class FavoriteCard extends Component {
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
           
        if (xmlDoc.getElementsByTagName("thumbnail").length === 0) {
            this.setState({
                invalidGame: true
            })
        }
        else {
            this.setState ({
                boardGameImagePath: xmlDoc.getElementsByTagName("thumbnail")[0].childNodes[0].nodeValue,
                boardGameName: xmlDoc.getElementsByTagName("name")[0].getAttribute('value'),
                loading: false
            })
        }
    }

    render () {
        const { classes, boardGameId } = this.props;
        const { boardGameImagePath, boardGameName, loading } = this.state
        let boardGameImageBloc = null;
        let boardGameNameBloc = null;
    
        if (loading === false) {
            boardGameImageBloc = (
                <img className={classes.image} src={boardGameImagePath} width="80" />
            )
            boardGameNameBloc = (
                <a className={classes.title} href={`https://boardgamegeek.com/boardgame/${boardGameId}`}>
                    {boardGameName}
                </a>
            )
        }

        return (
            <div className={classes.root}>                
                <Paper className={classes.paper}>
                    <div>
                        <Grid container spacing={2} justify='center' alignItems="center" direction="row" className={classes.bgBlock}>
                            <Grid item justify='center' alignItems="center">    
                                {boardGameImageBloc}
                            </Grid> 
                            <Grid item xs={7} sm>
                                <Typography variant="body2" gutterBottom>
                                    {boardGameNameBloc}
                                </Typography>
                            </Grid>                             
                        </Grid>
                     </div>
                </Paper>
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
    title: {
        fontSize: '1.5rem',
        color: '#595959',
        marginTop: "0px",
        marginBottom: "0px"
    },
    image: {
        borderRadius: 5,
        overflow: "hidden"
    }
}


export default connect(null, { removeBoardGameFromFavorites })(withStyles(styles)(FavoriteCard));