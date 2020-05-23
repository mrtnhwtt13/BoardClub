import React, { Component } from 'react';
import Details from './Details';
import { connect } from 'react-redux';
import { getGameById } from '../../actions/gameActions';
import LoadingGame from './LoadingGame';


class GameDisplay extends Component {

    componentDidMount() {
        this.props.getGameById(this.props.match.params.gameId)
    }  

    render () {
        const { game, loading } = this.props

        return (
            <div>            
                { loading ? <LoadingGame /> : <Details game={game} /> }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    game: state.game.game,
    loading: state.game.loading
})


export default connect(mapStateToProps, { getGameById })(GameDisplay);