import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { getScheduledGames } from '../../actions/gameActions'
import Loading from '../Loading/Loading'
import Game from '../Games/Game'

class ScheduledGames extends Component {

    componentDidMount(){
        if (!localStorage.getItem('jwtToken')) {
            this.props.history.push('/');
        }
        this.props.getScheduledGames()
    }

    render () {
        const { list, loading, classes, status } = this.props
        var items = (<Loading/>)
        if (list && loading === false && status === "scheduled")
        items = list && list.map(el => <Game key={el._id} game={el} />)
        return (
            <div className={classes.root}>
                <h1 className={classes.title}>SCHEDULED GAMES</h1>       
                { items }
            </div>
        )
    }
}

const styles = {
    root: {
        width: '100%',
    }, 
    title: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'center'
    }
}

const mapStateToProps = (state) => ({
    list: state.game.list,
    loading: state.game.loading,
    authUser: state.auth.user,
    status: state.game.status
})

export default connect(mapStateToProps, { getScheduledGames })(withStyles(styles)(ScheduledGames))