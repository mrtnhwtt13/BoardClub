import React from'react'
import { Paper, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TopGames from './TopGames'
import SearchGames from './SearchGames'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


class EditTopGames extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            searchGame: '',
            newGameId: '',
            loading: false
        }

        this.selectGame = this.selectGame.bind(this)
    }
    
    selectGame (selectedGameId) {
        this.setState({
            newGameId: selectedGameId
        })
    }

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper style={{ padding: 15 }}>
                    <ExpansionPanel style={{ borderRadius: 4, marginBottom: 60, marginTop: 40 }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            // aria-controls="panel1a-content"
                            // id="panel1a-header"                            
                        >
                            <Typography className={classes.heading}>See your favorite board games</Typography>
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


export default connect(mapStateToProps)(withRouter(withStyles(styles)(EditTopGames)))