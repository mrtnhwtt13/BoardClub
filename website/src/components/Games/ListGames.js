import React, { Component } from 'react';
import Game from './Game';
import { connect } from 'react-redux';
import { getUpcomingGames } from '../../actions/gameActions';
import LoadingGames from './LoadingGames';
import { withStyles } from '@material-ui/core';


class ListGames extends Component {

    componentDidMount() {
        this.props.getUpcomingGames()
    }  

    render () {
        const { list, loading, classes } = this.props
        const items = list && list.map(el => <Game key={el._id} game={el} />)

        return (
            <div className={classes.root}>
                <h1 className={classes.title}>UPCOMING GAMES</h1>   
                { loading ? <LoadingGames /> : items }
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
    loading: state.game.loading
})


export default connect(mapStateToProps, { getUpcomingGames })(withStyles(styles)(ListGames));