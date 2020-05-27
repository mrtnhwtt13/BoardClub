import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import getScheduldedGames from '../../actions/gameActions'
import LoadingGames from '../Games/LoadingGames'
import Game from '../Games/Game'

class ScheduledGames extends Component {

    componentDidMount(){
        this.props.getScheduldedGames()
    }

    render () {
        const { list, loading } = this.props
        const items = list && list.map(el => <Game key={el._id} game={el} />)
        console.log(list)
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

export default connect(mapStateToProps, { getScheduldedGames })(withStyles(ScheduledGames))