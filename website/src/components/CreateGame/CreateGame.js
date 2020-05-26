import React from'react'
import { Paper, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TopGames from './TopGames'
import SearchGames from './SearchGames'
import InfoGame from './InfoGame'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class CreateGame extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            searchGame: '',
            newGameId: '',
            newGameName: '',
            loading: false
        }

        this.selectGame = this.selectGame.bind(this)
        this.changeGame = this.changeGame.bind(this)
    }
    
    selectGame (selectedGameId, selectedGameName) {
        this.setState({
            newGameId: selectedGameId,
            newGameName: selectedGameName
        })
    }

    changeGame () {
        this.setState({
            newGameId: '',
            newGameName: '',
            searchGame: '',
            loading: false
        })
    }

    render(){
        const { classes } = this.props;

        if(this.state.newGameId !== '') {
            return(
                <Paper elevation={3} style={{ padding: 15, marginTop: 30 }}>
                    <div className={classes.btn}>
                        <Button disableElevation variant="contained" size="large" className={classes.btn} style={{ backgroundColor: "#959fef", color: "white", width: "10rem", height: "2rem"}} onClick={() => { this.changeGame(); }} >
                            Change game
                        </Button>
                    </div>
                    <h1 className={classes.title}>CREATE YOUR GAME FOR</h1>
                    <h1 className={classes.title}>{this.state.newGameName.toUpperCase()}</h1>
                    <InfoGame boardGameId={this.state.newGameId} boardGameName={this.state.newGameName} />
                </Paper>
            )
        }
        else {
            return (
                <div className={classes.root}>
                    <Paper elevation={3} style={{ padding: 15, marginTop: 30 }}>
                        <h1 className={classes.title}>SELECT A BOARD GAME</h1>
                        <ExpansionPanel style={{ borderRadius: 4, marginBottom: 60, marginTop: 40 }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                // aria-controls="panel1a-content"
                                // id="panel1a-header"
                                
                            >
                                <Typography className={classes.heading}>Choose from your favorite games</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div>
                                    <TopGames selectedGame={this.selectGame} />
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>                        
                        <div>
                            <SearchGames selectedGame={this.selectGame} />
                        </div>
                    </Paper>
                </div>
            )
        }
    }
}


const styles = {
    root: {
        width: '100%',
    },
      heading: {
        fontSize: "15",
        color: "#595959"
    }, 
    title: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'center'
    },
    btn: {
        display: 'flex',
        justifyContent: 'center'
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
})


export default connect(mapStateToProps)(withRouter(withStyles(styles)(CreateGame)))