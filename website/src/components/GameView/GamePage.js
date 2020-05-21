import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { getGameById } from '../../actions/gameActions';


class Gamepage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        boardGameDetails: null,
        loadingBoardGameDetails: true,
        }

        this.getBoardGameDetails = this.getBoardGameDetails.bind(this);
    }

    componentDidMount() {
        console.log("i'm useless")
        this.props.getGameById(this.props.match.params.gameId)
    }
    // componentDidUpdate(){
    //     console.log("i'm useless too")
    //     this.props.getGameById(this.props.match.params.gameId)
    // }

    getBoardGameDetails (bgId) {
        axios.get('https://bgg-json.azurewebsites.net/thing/' + bgId)
            .then((response) =>{
                this.setState({
                    boardGameDetails: response,
                    loadingBoardGameDetails: false
                })
            })
            .catch((err) => console.log(err))		
    }     

    render(){
        const { classes, loadingGame } = this.props;
        const { boardGameDetails, loadingBoardGameDetails } = this.state;
        let boardGameImage = null
        let boardGameName = null
        
        if (loadingGame === false && boardGameDetails === null) {
            this.getBoardGameDetails(this.props.list.boardGameId);
        }

        if (loadingBoardGameDetails === true) {
            return (
                <div>
                    loading
                </div>
            )
        }
        else {
            boardGameImage = (
                <img src={boardGameDetails.data.image} height="300" />
            )
            boardGameName = (
                <span className={classes.game}>
                <strong>Playing : </strong>
                {boardGameDetails.data.name}
                </span>
            )
            return (
                <div>
                <div>
                <Grid container spacing={2} direction="row" className={classes.bgBlock}>
                <Grid item>    
                {boardGameImage}
                </Grid> 
                <Grid item xs={7} sm container>
                <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                        <div className={classes.title}>{this.props.list.title}</div>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                    {boardGameName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    <span className={classes.time}>
                    Event on{' '}
                    {new Date(this.props.list.gameDate).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    })}{' '}
                    at {this.props.list.city}
                    </span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    <span className={classes.desc}>
                    {this.props.list.description}
                    </span>
                    </Typography>
                </Grid>
                
                </Grid>
                <Typography variant="subtitle1">
                    <div>
                    {this.props.list.playersNumber}/{this.props.list.playersMax}
                    </div></Typography>
                <Grid item>
                </Grid>
                </Grid> 
                </Grid>
                </div>
            {/* </Paper> */}
                </div>
            )
                    
        }
        
    }   
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    list: state.game.list,
    loadingGame: state.game.loading
  })

const styles = {
    btn: {
        color: "#595959"
        },
        space: {
            justifyContent: 'center',
            minHeight: 128,
            marginTop: '10px',
            marginBottom: '10px'
        },
        root: {
            flexGrow: 1,
        },
        title: {
            color: '#595959',
            marginTop: "0px",
            marginBottom: "0px",
            fontSize: 30,
        },
        time: {
            color: '#bbb',
            fontSize: 14,
        },
}


export default connect(mapStateToProps, { getGameById })(withStyles(styles)(Gamepage))