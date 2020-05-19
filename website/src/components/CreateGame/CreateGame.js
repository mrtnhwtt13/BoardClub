import React from'react'
import { Paper, TextField, withStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TopGames from './TopGames'
import Games from './Games'
import InfoGame from './InfoGame' 


class CreateGame extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            newGame: 'seven'
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    

    render(){
        const { errors } = this.state
        if(this.state.newGame != ''){
            return(
                <Paper style={{ padding: 15 }}>
                    <InfoGame></InfoGame>
                </Paper>
            )
        } else {
            return(
                <Paper  style={{ padding: 15 }}>
                    <div>
                        <TopGames></TopGames>
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
    
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
   })

export default connect(mapStateToProps)(withRouter(withStyles(styles)(CreateGame)))