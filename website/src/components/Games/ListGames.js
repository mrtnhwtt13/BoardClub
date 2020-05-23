import React, { Component } from 'react';
import Game from './Game';
import { connect } from 'react-redux';
import { getGames } from '../../actions/gameActions';
import LoadingGames from './LoadingGames';


class ListGames extends Component {

    componentDidMount() {
        this.props.getGames()
    }  

    render () {
        const { list, loading } = this.props
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


export default connect(mapStateToProps, { getGames })(ListGames);