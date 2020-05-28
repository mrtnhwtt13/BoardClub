import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { getScheduledGames } from '../../actions/gameActions'
import LoadingGames from '../Games/LoadingGames'
import Game from '../Games/Game'

class ScheduledGames extends Component {

    componentDidMount(){
        this.props.getScheduledGames()
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

const styles = {
  
}

const mapStateToProps = (state) => ({
    list: state.game.list,
    loading: state.game.loading
})

export default connect(mapStateToProps, { getScheduledGames })(withStyles(styles)(ScheduledGames))