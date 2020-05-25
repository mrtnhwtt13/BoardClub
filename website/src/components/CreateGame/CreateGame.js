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
            newGame: '',
            loading: false
        }

        this.selectGame = this.selectGame.bind(this)
    }
    
    selectGame (selectedGameId) {
        this.setState({newGame: selectedGameId})
    }

    render(){
        if(this.state.newGame != '') {
            return(
                <Paper style={{ padding: 15 }}>
                    <InfoGame boardGameId={this.state.newGame} />
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