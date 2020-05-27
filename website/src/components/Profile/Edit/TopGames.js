import React, { Component }from 'react'
import { connect } from 'react-redux'
import FavoriteCard from './FavoriteCard'
import { withRouter } from 'react-router-dom'
import Loading from './Loading';


class TopGames extends Component {
    constructor(props){
        super(props)
        
        this.selectGame = this.selectGame.bind(this)
    }

    selectGame(selectedGameId) {
        this.props.selectedGame(selectedGameId)
    }

    render(){
        const {user} = this.props

        if (user) {
            const cards = Object.keys(user.topGames).map(key=> <FavoriteCard key={key} boardGameId={user.topGames[key]} selectBoardGameId={this.selectGame} />)
            
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