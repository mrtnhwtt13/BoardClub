import React, { Component } from 'react';
import Details from './Details';
import { withRouter } from 'react-router-dom'
import { getGameById } from '../../actions/gameActions';
import LoadingGame from './LoadingGame';
import ListComments from './Comments/ListComments';
import { connect } from 'react-redux';


class GameDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: null,
            loading: true,
            playersList: null,
        }
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
        
    }

    componentDidMount() {
        getGameById(this.props.match.params.gameId).then(
            (response) => {
                this.setState({ game: response, loading: false })
            },
            (error) => {
                console.log('error: ', error)
            }
        )
    }

    rerenderParentCallback() {
        getGameById(this.props.match.params.gameId).then(
            (response) => {
                this.setState({ game: response, loading: false })
            },
            (error) => {
                console.log('error: ', error)
            }
        )
    }


    render() {
        const { game, loading, players } = this.state
        if (game){
            if (this.state.playersList === null){
                this.setState({playersList: game.players})
            }
            if (this.state.playersList !== players){
                console.log(players)
                this.setState({playersList: players})
            }
        }
        return (
            <div>
                {
                    loading ?
                        <LoadingGame /> :
                        <div>
                            <div>
                                <Details game={game} rerenderParentCallback={this.rerenderParentCallback}/>
                            </div>
                            <div>
                                <ListComments gameId={game._id} />
                            </div>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    players: state.players.players
})

export default connect(mapStateToProps, {})(withRouter(GameDisplay));