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
        this.props.getGameById(this.props.match.params.gameId)
    }

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
            return (
                <div>
                <div>
                <Grid container spacing={2} direction="row" className={classes.bgBlock}>
                <Grid item>    
                Image
                </Grid> 
                <Grid item xs={7} sm container>
                <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                    <div className={classes.title}>Title</div>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                    Game
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    <span className={classes.time}>
                        Time
                    </span>
                    </Typography>
                </Grid>
                
                </Grid>
                <Grid item>
                <Typography variant="subtitle1">
                    <div>
                        NaN/NaN
                    </div></Typography>
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
}


export default connect(mapStateToProps, { getGameById })(withStyles(styles)(Gamepage))