import React from'react'
import { Paper, TextField, withStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import TopGames from './TopGames'
import Games from './Games'
import InfoGame from './InfoGame' 


class CreateGame extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            searchGame: '',
            newGame: '',
            boardGameDetails: null,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.selectGame = this.selectGame.bind(this)
    }

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    selectGame(gameDetails) {
        this.setState({newGame: gameDetails.data.gameId})
    }

    render(){
        const { errors } = this.state
        if(this.state.newGame != ''){
            return(
                <Paper style={{ padding: 15 }}>
                    <InfoGame boardGameId={ this.state.newGame }></InfoGame>
                </Paper>
            )
        } else {
            return(
                <Paper  style={{ padding: 15 }}>
                    <div>
                        <TopGames handleChange={this.selectGame}></TopGames>
                    </div>
                    <div>
                        <Games></Games>
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