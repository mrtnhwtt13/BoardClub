import React, { Component }from 'react'
import { connect } from 'react-redux'
import FavoriteCard from './FavoriteCard'
import { withRouter } from 'react-router-dom'
import Loading from './Loading';


class FavoriteGames extends Component {

    render(){
        const {user} = this.props

        if (user) {
            const cards = Object.keys(user.topGames).map(key=> <FavoriteCard key={key} boardGameId={user.topGames[key]} />)
            
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


export default connect(mapStateToProps)(withRouter(FavoriteGames))