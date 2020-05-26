import React, { Component }from 'react'
import { connect } from 'react-redux'
import Card from './Card'
import { withRouter } from 'react-router-dom'
import Loading from './Loading';


class TopGames extends Component {
    constructor(props){
        super(props)
        
        this.selectGame = this.selectGame.bind(this)
    }

    selectGame(selectedGameId, selectedGameName) {
        this.props.selectedGame(selectedGameId, selectedGameName)
    }

    render(){
        const {user} = this.props

        if (user) {
            const cards = Object.keys(user.topGames).map(key=> <Card key={key} boardGameId={user.topGames[key]} selectBoardGameId={this.selectGame} />)
            
            return (
                <div>
                    {cards}
                </div>
            )
        }
        else {
            return < Loading />;
        }
    }
}


const mapStateToProps = (state) => ({
    user: state.auth.user
   })


export default connect(mapStateToProps)(withRouter(TopGames))