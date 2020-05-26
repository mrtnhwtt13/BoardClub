import React from'react'
import { Paper, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TopGames from './TopGames'
import SearchGames from './SearchGames'
import InfoGame from './InfoGame'


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
    }
    
    selectGame (selectedGameId, selectedGameName) {
        this.setState({
            newGameId: selectedGameId,
            newGameName: selectedGameName
        })
    }

    render(){
        if(this.state.newGameId != '') {
            return(
                <Paper style={{ padding: 15 }}>
                    <InfoGame boardGameId={this.state.newGameId} boardGameName={this.state.newGameName} />
                </Paper>
            )
        }
        else {
            return (
                <Paper style={{ padding: 15 }}>
                    <div>
                        <TopGames selectedGame={this.selectGame} />
                    </div>
                    <div>
                        <SearchGames selectedGame={this.selectGame} />
                    </div>
                </Paper>
            )
        }
    }
}


const styles = {
    btnBlock: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    btnStyle: {
        backgroundColor: "#65A2FE",
        color: "white",
        border: "white",
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
})


export default connect(mapStateToProps)(withRouter(withStyles(styles)(CreateGame)))