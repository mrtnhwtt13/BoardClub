import React, { Component } from 'react';
import Game from '../Games/Game';
import { connect } from 'react-redux';
import { getUpcomingGames } from '../../actions/gameActions';
import LoadingGames from './LoadingGames';


class ListGames extends Component {

    componentDidMount() {
        this.props.getUpcomingGames()
    }  

    render () {
        const { list, loading, classes } = this.props
        const items = list && list.map(el => <Game key={el._id} game={el} />)

        return (
            <div>                   
                { loading ? <LoadingGames /> : items }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    list: state.game.list,
    loading: state.game.loading
})


export default connect(mapStateToProps, { getUpcomingGames })(ListGames);