import React, { Component }from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import Card from './Card'
import { withRouter } from 'react-router-dom'

class TopGames extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {}
        }
        this.selectGame = this.selectGame.bind(this)
    }

    selectGame(gameDetails) {
        this.props.handleChange(gameDetails)
    }


    render(){
        const {user} = this.props
        if (user){
            const cards = Object.keys(user.topGames)
            .map(key=> <Card key={key} details={user.topGames[key]} handleChange={this.selectGame}></Card>)
            return(
                <div className="card">
                    {cards}
                </div>
            )
        } else {
            return(
                <p>remember to indicate your favorite games in your personal space</p>
            )
        }
    }
}

const styles = {
 
    card: {    
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
   })

export default connect(mapStateToProps)(withRouter(withStyles(styles)(TopGames)))