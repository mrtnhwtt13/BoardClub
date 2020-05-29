import React, { Component }from 'react'
import FavoriteCard from './FavoriteCard'
import { withRouter } from 'react-router-dom'
import Loading from './Loading';


class FavoriteGamesList extends Component {

    render(){
        const {user} = this.props

        if (user) {
            const cards = user.topGames.map(element => <FavoriteCard key={element} boardGameId={element} />)
            
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


export default (withRouter(FavoriteGamesList))