import React, { Component } from 'react';
import Details from './Details';
import { connect } from 'react-redux';
import { LoadingGames, getGameById } from '../../actions/gameActions';
import { getUserById } from '../../actions/userActions'


class GameDisplay extends Component {

    componentDidMount() {
        this.props.getGameById(this.props.match.params.gameId)
    }  

    render () {
        const { list, loading } = this.props
        console.log('GameDisplay')
        console.log(list)
        const items = list && list.map(el => <Details key={el._id} game={el} />)

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


export default connect(mapStateToProps, { getGameById })(GameDisplay);