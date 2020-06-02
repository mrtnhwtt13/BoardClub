import React, { Component } from 'react';
import Game from '../Games/Game';
import { connect } from 'react-redux';
import { getUpcomingGames, getFriendsUpcomingGames, getFavoriteUpcomingGames } from '../../actions/gameActions';
import Loading from '../Loading/Loading';
import { withStyles } from '@material-ui/core/styles'


class ListGames extends Component {

    componentDidMount() {
        if (this.props.selection === "all") {
            this.props.getUpcomingGames()
        }
        else if (this.props.selection === "friends") {
            this.props.getFriendsUpcomingGames()
        }
        else if (this.props.selection === "favorite") {
            this.props.getFavoriteUpcomingGames()
        }
    }  

    render () {
        const { list, loading, classes, selection, status } = this.props
        var items = null;
        console.log(status)
        if (list && (
            (selection === "all" && status === "upcoming") ||
            (selection === "friends" && status === "friends") ||
            (selection === "favorite" && status === "favorite")
            )) {
            if (list.length === 0) {
                items = (<h3 className={classes.title}>NO UPCOMING GAMES YET...</h3>)
            }
            else {
                items = list && list.map(el => <Game key={el._id} game={el} />)
            }            
        }        

        return (
            <div>                   
                { loading ? < Loading /> : items }
            </div>
        )
    }
}


const styles = {
    title: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'center'
    }
}


const mapStateToProps = (state) => ({
    list: state.game.list,
    loading: state.game.loading,
    status: state.game.status
})


export default connect(mapStateToProps, { getUpcomingGames, getFriendsUpcomingGames, getFavoriteUpcomingGames })(withStyles(styles)(ListGames));